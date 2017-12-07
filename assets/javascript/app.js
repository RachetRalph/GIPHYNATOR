// Initial array of GIF topics //
var topics = ["Transformers","Batman","Pranks"," Babies","Office",
" Funny"," Viral","Riddles","Gym fail","Beer","Tailgate","ASU",
"Big Bang Theory","Twerk","Spice Girls",];

// Function for displaying giphy topics in array 
function renderButtons() {
    // Deleting giphy topics prior to adding new topics
    $("#gif-View").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array
    var b = $("<button>");
    b.addClass("giffy");
    b.attr("data-name", topics[i]);
    b.text(topics[i]);

    // Adding the button to the buttons-view div
    $("#gif-View").append(b);
    }  
}

// EVENT HANDLERS //     
// This function will create a topic button
$("#add-giphy").on("click", function(event) {
    event.preventDefault(); 

    // Here we grab the text from the input box
    var giphy = $("#giphy-input").val().trim();

    topics.push(giphy);
    $("#add-giphy").val();

    // Redraw the buttons
    renderButtons();
});
// The fetchGifs will call upon the GIPHY API
function fetchGifs() {
// Topic names are extracted from button text
var topic = $(this).attr("data-name");

// Here we construct our URL
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Gc1pdRi3ysJDHOLet2956agNdAFsEOgX&q="+ 
topic +"&limit=10&offset=10&rating=PG-13&lang=en";

// AJAX call to GIPHY API
$.ajax({
url:queryURL,
method:"GET" 
})
// After data comes back from API
.done(function(response) {
// Results are stored in array object called results 
var results = response.data;
//console.log(results);
// Create and display div elements for each of the returned Gifs
$("#gif-here").empty();
for (var i =0; i < results.length; i++){
    var gifDiv = $("<div>");
    gifDiv.addClass("topicGif");
    
    var p = $("<p>").text("Rating: "+ results[i].rating);
        gifDiv.append(p);

    var gifImg = $("<img>");
    gifImg.attr("src", results[i].images.fixed_height_still.url);
    gifImg.attr("data-still", results[i].images.fixed_height_still.url);
    gifImg.attr("data-animate", results[i].images.fixed_height.url);
    gifImg.attr("data-state", "still");
    gifDiv.append(gifImg);

// New Gifs are prepended to the gif-here ID.
    $("#gif-here").prepend(gifDiv);

        }
    });
}

// Fucntion pauses gif when page is initally loaded, will resume gif on click 
function animateGif(){

    var state = $(this).find("img").attr("data-state");


    if (state === "still"){
        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        $(this).find("img").attr("data-state", "animate");
    } else {
        $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        $(this).find("img").attr("data-state", "still"); 
    }
}

// Render the initial animal buttons when the HTML has finished loading
$(document).ready(function() {
    renderButtons();
  });
  
// An event handler for the topic buttons to fetch appropriate Gifs

$(document).on("click", ".giffy", fetchGifs);

// Add an event handler for the Gifs to animate and stop
$(document).on("click", ".topicGif", animateGif);