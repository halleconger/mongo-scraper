var mongoose = require("mongoose");

// SAVE A REFERNCE TO THE SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;

// USING THE SCHEMA CONSTRUCTOR, CREATE A NEW ARTICLESCHEMA OBJECT
// THIS IS SIMILAR TO A SEQUELIZE MODEL
var ArticleSchema = new Schema ({

    title: {
        type: String,
        required: true
    },

    summary: {
        type: String,
    },

    link: {
        type: String,
        required: true
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },

    saved: {
        type: Boolean,
        default: false
    }

});

// CREATES OUR MODEL FROM THE ABOVE SCHEMA, USING MONGOOSE'S MODEL METHOD
var Article = mongoose.model("Article", ArticleSchema);

// EXPORT THE ARTICLE MODEL 
module.exports = Article;

