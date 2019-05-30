var gifs = ["cat", "dog", "dragon", "llama", "horse", "eagle", "dolphin"]
function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=XunqdKpDetXcXRtKaRegvS6aNzouMpLh&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < 10; i++) {
            var dataImage = $("<img>");
            dataImage.attr("src", results[i].images.fixed_height_still.url);
            dataImage.attr("data-still", results[i].images.fixed_height_still.url);
            dataImage.attr("data-animate", results[i].images.fixed_height.url);
            dataImage.addClass("gif");
            dataImage.attr("data-state", "still");


            var newItemdiv = $('<div class="newItem">');
            var gifRating = results[i].rating;
            var divRating = $("<p>").text("Rating: " + gifRating);
            
            newItemdiv.append(divRating);
            newItemdiv.append(dataImage);

            $(".gif-view").prepend(newItemdiv);
    }});
};
$(".gif-view").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }


    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

function renderButtons() {
    $("#buttons-view").empty();
    for (var i =0; i <gifs.length; i++) {
        var a = $("<button>");
        a.addClass("gif-btn")
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifs.push(gif);
    renderButtons();
    $(".gif-view").empty();

})
$(document).on("click", ".gif-btn", displayGif);
renderButtons();
$(".gif-view").empty();