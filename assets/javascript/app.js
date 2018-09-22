$(document).ready(function() {

    var shows = ["Parks and Recreation", "Veep", "Rick and Morty", "30 Rock", "The Good Place", "It's Always Sunny in Philadelphia", "Chappelle's Show",
    "Curb Your Enthusiasm", "Archer", "The Office"];

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < shows.length; i++) {

            var a = $("<button>");

            a.addClass("show");

            a.attr("data-name", shows[i]);

            a.text(shows[i]);

            $("#buttons-view").append(a);
        }

    }

    $("#add-show").on("click", function(event) {

        event.preventDefault();

        var show = $("#show-input").val().trim();

        shows.push(show);
        console.log(shows);

        renderButtons();

    });

    renderButtons();

    $(document).on("click", ".show", function() {

        var show = $(this).html();
        console.log(show);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=EEs0A3Q2Lqa8CY0rlEo6UlsTBWGM4yMD&limit=10";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {

            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== 'r' && results[i].rating !== 'pg-13') {
                    var gifView = results[i].images.fixed_height.url;

                    var still = results[i].images.fixed_height_still.url;

                    var showImage = $('<img>').attr("src", still).attr('data-animate', gifView).attr('data-still', still);
                    showImage.attr('data-state', 'still');

                    $('#shows-view').prepend(showImage);
                    showImage.on('click', animateGif);

                    var rating = results[i].rating;
                    var displayRated= $('<p>').text("Rating: " + rating);
                    $('#shows-view').prepend(displayRated);

                }

            }

        });

    });

    function animateGif() {

        var state = $(this).attr('data-state');
        console.log(state);

        if (state === 'still') {

            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');

        } else {

            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    };

});
