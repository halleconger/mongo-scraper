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
$(".articleNote").on("click", function () {
    var articleId = $(this).data("id");
    var noteId = $(this).data("noteid")
    // var thisNoteBody = $(this).data("notebody")
    $.ajax({
        method: "GET",
        url: "/note/" + noteId
    }).then(function (data, err) {
        console.log(data)
        if (data[0]._id) {
            $("#postedNotes").html("<p>" + data[0].title + ":</p> " + data[0].body + "<hr>")
            
            // $("#postedNotes").append("<button class='btn btn-primary' data-id=" + data[0]._id + " id='delete-note'>Delete Note</button>")
        }

        $(".saveNote").data("id", articleId);
        $("#noteTextArea").html("<div><input id='titleInput' name='title' placeholder='Enter Note Title'></div>")
        $("#noteTextArea").append("<textarea id='bodyInput' name='body' placeholder='Write Note Here'></textarea>")
    })

});


// SAVE NOTE BUTTON
$(".saveNote").on("click", function () {
    var thisId = $(this).data("id");
    var title = $("#titleInput").val().trim();
    var body = $("#bodyInput").val().trim();

    if (title && body) {

        $.ajax({
            method: "POST",
            url: "/note/save/" + thisId,
            data: {
                title,
                body
            }
        }).then(function (data) {
            location.reload();
            noteModal.close();
        });
    }
});

// DELETE NOTE BUTTON

// $("#delete-note").on("click", function() {
//     var thisId = $(this).data("id");
//     var title = $("#titleInput").val().trim();
//     var body = $("#bodyInput").val().trim();

//     $.ajax({
//       type: "DELETE",
//       url: "/note/delete/" + thisId,
//       data: {
//           title,
//           body
//       }
//     }).then(function() {
//         window.location.href = "/saved"
//     })
//   });

