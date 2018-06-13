// SCRAPE ARTICLES BUTTON
$(".scrape").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(data) {
        console.log(data);
        window.location.href = "/"
    });
});

// SAVE ARTICLE BUTTON
$(".saveArticle").on("click", function() {
    var thisId = $(this).data("id");

    $.ajax({
        method: "POST",
        url: "/articles/save/" + thisId
    }).then(function(data){
        window.location.href = "/"
    });
});

// DELETE ARTICLE BUTTON
$(".deleteArticle").on("click", function() {
    var thisId = $(this).data("id");

    $.ajax({
        method: "POST",
        url: "/articles/delete/" + thisId
    }).then(function(data) {
        window.location.href = "/saved"
    });
});

// SAVE NOTE BUTTON

// DELETE NOTE BUTTON
