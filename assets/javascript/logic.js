var gifs = ["cat", "dog", "dragon", "llama", "horse", "eagle", "dolphin"]
function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=XunqdKpDetXcXRtKaRegvS6aNzouMpLh&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var i = 0; i < 10; i++) {
            gifURL = response.data[i].images.original.url;
           var image= $("<img>").attr("src", gifURL);
           $(".gif-view").append(image);
    }});
};
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
})
$(document).on("click", ".gif-btn", displayGif);
renderButtons();