// Global Variables

var animals = ["dog", "cat", "rabbit", "tiger", "lion", "wolf", "dolphin", "shark", "fish", "monkey"]

function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=i9wNHxnSqAJ5ZjXgDKQOszq9pQjDXhlG&q=" + animal + "&limit=10&offset=&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        $("#animal-view").empty();

        var animalDiv = $("<div>");
        animalDiv.addClass("animal");

        for (var j = 0; j < 10; j++) {
        var rating = response.data[j].rating;
        console.log(rating);

        var pOne = $("<p>")
            pOne.text("Rating: " + rating);

        animalDiv.append(pOne);
       
        var imgURL = response.data[j].images.fixed_width_still.url;
        var clickedURL = response.data[j].images.fixed_width.url;
        var image = $("<img>")
            image.addClass("gifImage");
            image.attr("src", imgURL);
            image.attr("data-still", imgURL);
            image.attr("data-animate", clickedURL);
            image.attr("data-state", "still");

        animalDiv.append(image);
        }
        $("#animal-view").prepend(animalDiv);
    });
}

function renderButtons() {
    
    // $(".gifImage").empty();
    
    $("#buttons-view").empty();

    for (var i =0; i < animals.length; i++) {
        
        var a = $("<button>");

        a.addClass("animal-btn");

        a.attr("data-name", animals[i]);

        a.text(animals[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-animal").on("click", function(event){
    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    animals.push(animal);

    renderButtons();
});

$(document).on("click", ".animal-btn", displayAnimalInfo);
$(document).on("click", ".gifImage", function(){
    var state = $(this).attr("data-state");
    if( state == "still") {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still')
    }
});
renderButtons();