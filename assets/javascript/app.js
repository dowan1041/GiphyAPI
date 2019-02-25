// Global Variables

var animals = ["dog", "cat", "drangon", "rabbit", "tiger", "lion", "wolf", "dolphin", "shark", "fish", "monkey", "dragon", "armadillo", "bird"]

function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=i9wNHxnSqAJ5ZjXgDKQOszq9pQjDXhlG&q=" + animal + "&limit=10&offset=&lang=en";

    $.ajax({ //API setting
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        $("#animal-view").empty(); //When user clicked new button, the previous images are cleared

        
        //making 10 div/images/p for individual images
        for (var j = 0; j < 10; j++) {
        var animalDiv = $("<div>");
        animalDiv.addClass("animal col-lg-4 col-md-6 col-sm-12");

        var rating = response.data[j].rating; //getting ratings of images
        console.log(rating);

        var pOne = $("<p>")
            pOne.text("Rating: " + rating);

        animalDiv.append(pOne); //child of new div

        animalDiv.appendTo($("#animal-view")); //to make animalDiv as a child of #animal-view
       
        var imgURL = response.data[j].images.fixed_width_still.url; //getting fixed images (still image)
        var clickedURL = response.data[j].images.fixed_width.url; //getting action gifs
        var image = $("<img>")
            image.addClass("gifImage");
            image.attr("src", imgURL);
            image.css('max-width','100%');  // to make images in the div
            image.attr("data-still", imgURL);  // by changing state of the image from still to animate or anmiate to still using function below
            image.attr("data-animate", clickedURL);
            image.attr("data-state", "still");

        animalDiv.append(image); //child of animal div
        }
        $("#animal-view").prepend(animalDiv);
    });
}

function renderButtons() {
    
    // $(".gifImage").empty();
    
    $("#buttons-view").empty();

    for (var i =0; i < animals.length; i++) { // making buttons
        
        var a = $("<button>");

        a.addClass("animal-btn btn btn-success");

        a.attr("data-name", animals[i]);

        a.text(animals[i]);

        $("#buttons-view").append(a);
    }
}

$("#add-animal").on("click", function(event){ //get user input and put the user input to new button
    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    animals.push(animal);

    renderButtons();
});

$(document).on("click", ".animal-btn", displayAnimalInfo);
$(document).on("click", ".gifImage", function(){ //function for animation or still image
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