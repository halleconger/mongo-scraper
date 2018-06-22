// REQUIRE PACKAGES/DEPENDENCIES
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios")
var request = require("request");

// REQUIRE ALL MODELS
var db = require("./models");

var PORT = process.env.PORT || 3000;

// INITIALIZE EXPRESS
var app = express();

// USE MORGAN LOGGER FOR LOGGING REQUESTS
app.use(logger("dev"));

// USE EXPRESS.STATIC TO SERVE THE PUBLIC FOLDER AS A STATIC DIRECTORY
app.use(express.static("public"));

// USE BODY-PARSER FOR HANDLING FORM SUBMISSIONS
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// CONNECT TO MONGO DB
// IF DEPLOYED, USE THE DEPLOYED DATABASE.
// OTHERWISE USE THE LOCAL MONGOHEADLINES DATABASE
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

// SET MONGOOSE TO LEVERAGE BUILT IN JAVASCRIPT ES6 PROMISES
// CONNECT TO MONGO DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// ROUTES 

// GET REQUEST ROUTE TO RENDER HOME.HANDLEBARS
app.get("/", function (req, res) {
    db.Article.find({ "saved": false }, function (err, data) {
        var hbsObject = {
            article: data
        };
        res.render("home", hbsObject)
    });
});

// GET REQUEST ROUTE TO RENDER SAVED.HANDLEBARS
app.get("/saved", function (req, res) {
    db.Article.find({ "saved": true })
    .populate("note")
    .then(function (dbArticle) {
        var hbsObject = {
            article: dbArticle
        }
        console.log(dbArticle);
        res.render("saved", hbsObject);
        });
});

// A GET REQUEST ROUTE TO SCRAPE NYT WEBSITE
app.get("/scrape", function (req, res) {
    axios.get("https://www.nytimes.com/section/business").then(function (response) {
        var $ = cheerio.load(response.data);

        $("div.story-body").each(function (i, element) {

            var result = {};

            result.title = $(element)
                .children("h2.headline")
                .children("a")
                .text();
            result.summary = $(element)
                .children("p.summary")
                .text();
            result.link = $(element)
                .children("h2.headline")
                .children("a")
                .attr("href");

            if (result.title && result.summary && result.link) {

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.redirect("/");
                    });
            }

        });

        res.redirect("/")
    });
});

// A GET REQUEST ROUTE FOR GETTING ALL ARTICLES FROM THE DB
app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        })
});

// A GET REQUEST ROUTE FOR GETTING A SPECIFIC ARTICLE BY THE ID
// POPULATE IT WITH IT'S NOTE
app.get("/articles/:id", function (req, res) {
    db.Article.find({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(error)
        })
});

// A POST ROUTE TO SAVE AN ARTICLE
app.post("/articles/save/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.send(docs);
            }
        });
});

// A POST ROUTE TO DELETE AN ARTICLE
app.post("/articles/delete/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.send(docs);
            }
        });
});

// POST ROUTE TO CREATE/SAVE/UPDATE A NEW NOTE ASSOCIATED WITH AN ARTICLE
app.post("/note/save/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        });
});

// GET ROUTE TO GET NOTE
app.get("/note/:id", function(req, res) {
    db.Note.find({ _id: req.params.id })
    .then(function(dbNote) {
        console.log(dbNote)
        res.json(dbNote)
    }).catch(function (err) {
        res.json(err);
    })
})

// DELETE ROUTE TO DELETE NOTE
// app.delete("/note/delete", function(req, res) {
//     ab.Note.delete({ _id: req.params.id })
//     .then(function(err, docs) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(docs);
//         }
//     })
// })

// STARTS THE SEVER TO BEGIN LISTENING 
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});