// SCRAPE ARTICLES BUTTON
$(".scrape").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function (data) {
        console.log(data);
        window.location.href = "/"
    });
});

// SAVE ARTICLE BUTTON
$(".saveArticle").on("click", function () {
    var thisId = $(this).data("id");

    $.ajax({
        method: "POST",
        url: "/articles/save/" + thisId
    }).then(function (data) {
        window.location.href = "/"
    });
});

// DELETE ARTICLE BUTTON
$(".deleteArticle").on("click", function () {
    var thisId = $(this).data("id");

    $.ajax({
        method: "POST",
        url: "/articles/delete/" + thisId
    }).then(function (data) {
        window.location.href = "/saved"
    });
});

// OPEN NOTE MODAL
// NOT WORKING - SUPPOSED TO SHOW MODAL WHERE USER CAN ENTER TITLE AND NOTE
$(".articleNote").on("click", function () {
    var thisId = $(this).data("id");

    $.ajax({
        method: "POST",
        url: "/articles/save/" + thisId
    }).then(function (data) {
        if (data.note) {
            $("#postedNotes").append("<p>" + data.note.title + ":</p> " + data.note.body)
            $("#postedNotes").append("<button class='btn btn-primary' data-id=" + data.note._id + " id='delete-note'>Delete Note</button>")
        }

        $("noteTextArea").append("<div><input id='titleInput' name='title' placeholder='Enter Note Title'></div>")
        $("noteTextArea").append("<textarea id='bodyInput' name='body' placeholder='Write Note Here'></textarea>")
    });
});


// SAVE NOTE BUTTON
// NOT WORKING - THIS SHOULD SAVE THE NOTE
$(".saveNote").on("click", function () {
    var thisId = $(this).data("id");

    $.ajax({
        method: "POST",
        url: "/note/save/" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    }).then(function (data) {
        $("#noteTextArea").empty();
    });
});

