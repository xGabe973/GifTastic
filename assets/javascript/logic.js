var gifs = ["cat", "dog", "dragon", "llama", "horse", "eagle", "dolphin"]
function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=XunqdKpDetXcXRtKaRegvS6aNzouMpLh&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var i = 0; i < 10; i++) {
            var rating = "<div class='ratings'> Rating: " + (response.data[i].rating) + "</div>"
           var image= rating + '<img src = " ' + response.data[i].images.original_still.url +
           '"data-still=" ' + response.data[i].images.original_still.url + '" data-animate=" ' +
           response.data[i].images.original.url + '" data-state="still" class="movImage" style= "width:250px; height: 250 px">'; 
           $(".gif-view").append(image);
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