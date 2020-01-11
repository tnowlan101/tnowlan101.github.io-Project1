var startLocation;
var endLocation;
var numOfRestaurants;
var numOfActivities;

var mapquestApiKey = "LnKRG2Lq3YrtUP9FxWVGpL57coUhpfWy";

function createMap() {

    //Uses the Mapquest.js library to create an interactive map with a route from starting location to end location
    $(".card").empty();
    var mapContainerRow = $("<div class='row w-100 h-100 m-0' id='map'></div>");
    mapContainerRow.append(mapContainerRow);
    $(".card").append(mapContainerRow);

    L.mapquest.key = mapquestApiKey;

    L.mapquest.map('map', {
        center: [0, 0],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });

    L.mapquest.geocoding().geocode(startLocation);
    L.mapquest.directions().route({
        start: startLocation,
        end: endLocation
    });
    //map.addControl(L.mapquest.control());

    $("#directions").append($('<a href="directions.html" target="_blank">Click here for list of directions!</a>'));
}

function generateActivities() {
    var yelpApiKey = "EKNdAx27IgYINE6TiVp9FhPB0Me3YrNSH44mLYiaKUp2XIvAVjBurD74d9e_GkjQtx_l2APPcgH3ZWEEDe7QMTL8iOqXmyShjPDdqEdSWiGa49JDB-Op7pTBeQIUXnYx";

    //categories: active life, arts & entertainment, hotels&travel (tours, camp grounds), public services(land marks)
    var activeCategory = "amusementparks,aquariums,bungeejumping,canyoneering,experiences,golf,hanggliding,hiking,horsebackriding,hot_air_balloons,lakes,paragliding," +
        "parasailing,sailing,skiing,skydiving,zipline,zoos"

    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + endLocation + "&sort_by=rating&categories=" +
            activeCategory + ",arts,tours,campgrounds,landmarks&radius=25000",
        headers: {
            'Authorization': 'Bearer ' + yelpApiKey,
        },
        method: "GET"
    }).then(function (response) {

        console.log(response);

        $("#activities").append("<h3 class='pl-2'>Top Activities</h3>");

        //Populate list of activies with a media object card for each activity
        for (var i = 0; i < numOfActivities; i++) {
            var activityAddress = "";
            var activityType = "";

            //Formats API address array into a readable address
            for (var j = 0; j < response.businesses[i].location.display_address.length; j++)
                activityAddress += response.businesses[i].location.display_address[j] + ' ';

            //Formats API activity categories array into readable list
            for (var k = 0; k < response.businesses[i].categories.length; k++) {
                if (k + 1 === response.businesses[i].categories.length)
                    activityType += response.businesses[i].categories[k].title;
                else
                    activityType += response.businesses[i].categories[k].title + ', ';
            }

            //Creates and appends the media object to the activity div
            var activityMediaObject = $('<div class="row"><div class="col"><div class="media"><img src="' + response.businesses[i].image_url + '"> ' +
                '<div class="media-body"><h5 class="mt-0 businessHeader">' + response.businesses[i].name + '</h5>' +
                '<p class="businessInfo">Rating: ' + response.businesses[i].rating + '/5</p>' +
                '<p class="businessInfo">Address: ' + activityAddress + '</p>' +
                '<p class="businessInfo">Activity Type: ' + activityType + '</p>' +
                '<p class="businessInfo">Phone Number: ' + response.businesses[i].display_phone + '</p>' +
                '<p class="businessInfo">URL: <a href=' + response.businesses[i].url + ' target="_blank">See ' + response.businesses[i].name + ' on Yelp!</a></p>')
            console.log(activityMediaObject);
            $("#activities").append(activityMediaObject);
        }
    });
}


function generateRestaurants() {
    var yelpApiKey = "EKNdAx27IgYINE6TiVp9FhPB0Me3YrNSH44mLYiaKUp2XIvAVjBurD74d9e_GkjQtx_l2APPcgH3ZWEEDe7QMTL8iOqXmyShjPDdqEdSWiGa49JDB-Op7pTBeQIUXnYx";


    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + endLocation + "&sort_by=rating&categories=restaurants&radius=25000",
        headers: {
            'Authorization': 'Bearer ' + yelpApiKey,
        },
        method: "GET"
    }).then(function (response) {

        console.log(response)

        $("#restaurants").append("<h3 class='pl-2'>Top Restaurants</h3>");

        //Populate list of restaurants with a media object card for each restaurant
        for (var i = 0; i < numOfRestaurants; i++) {
            var restaurantAddress = "";
            var foodType = "";

            //Formats API address array into a readable address
            for (var j = 0; j < response.businesses[i].location.display_address.length; j++)
                restaurantAddress += response.businesses[i].location.display_address[j] + ' ';

            //Formats API restaurant categories array into readable list
            for (var k = 0; k < response.businesses[i].categories.length; k++) {
                if (k + 1 === response.businesses[i].categories.length)
                    foodType += response.businesses[i].categories[k].title;
                else
                    foodType += response.businesses[i].categories[k].title + ', ';
            }

            //Creates and appends the media object to the restaurant div
            var restaurantMediaObject = $('<div class="row"><div class="col"><div class="media"><img src="' + response.businesses[i].image_url + '"> ' +
                '<div class="media-body"><h5 class="mt-0 businessHeader">' + response.businesses[i].name + '</h5>' +
                '<p class="businessInfo">Rating: ' + response.businesses[i].rating + '/5</p>' +
                '<p class="businessInfo">Address: ' + restaurantAddress + '</p>' +
                '<p class="businessInfo">Food Type: ' + foodType + '</p>' +
                '<p class="businessInfo">Phone Number: ' + response.businesses[i].display_phone + '</p>' +
                '<p class="businessInfo">URL: <a href=' + response.businesses[i].url + ' target="_blank">See ' + response.businesses[i].name + ' on Yelp!</a></p>')
            $("#restaurants").append(restaurantMediaObject);
        }
    });
}

function generateForecast() {

    var weatherKey = "&units=imperial&APPID=3f57d1d0ccb27e3179f39171730967ec";
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + endLocation + weatherKey;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        $('#forecastHead').append($('<h3> 5-Day Forecast for ' + endLocation + ' </h3>'))

        // This for loop gets the 5-day forecast data after the API call
        for (i = 5; i <= response.list.length; i += 8) {
            console.log(i)

            var unformattedNewDay = response.list[i].dt_txt.split(" ")[0];
            var dateArray = unformattedNewDay.split("-")
            var newDay = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];

            var iconForecast = response.list[i].weather[0].icon;
            var iconImgURL = "http://openweathermap.org/img/w/" + iconForecast + ".png";
            var tempForecast = Math.round(response.list[i].main.temp);
            var humidityForecast = response.list[i].main.humidity;

            $("#forecast")
                .append($("<div>").addClass("col-sm-2 days")
                    .append($("<p class='forecastData'>").html(newDay))
                    .append($("<img id='forecastImg' src=" + iconImgURL + ">"))
                    .append($("<p class='forecastData'>").html("Temp: " + tempForecast + " °F"))
                    .append($("<p class='forecastData'>").html("Humidity: " + humidityForecast + "%")))

        }

    });

}

$("#submitButton").on("click", function () {

    startLocation = $("#startAddress").val();
    endLocation = $("#endAddress").val();
    numOfRestaurants = $("#numRestaurants").val();
    numOfActivities = $("#numActivities").val();

    localStorage.setItem("startLocation", startLocation);
    localStorage.setItem("endLocation", endLocation);

    $("#restaurants").empty();
    $("#activities").empty();
    $("#forecastHead").empty();
    $("#forecast").empty();
    $("body").css({ 'background-image': 'url("")', 'background-color': 'rgb(250, 247, 247)' });
    $(".card").css({ 'height': '400px' });

    createMap();
    generateRestaurants();
    generateActivities();
    generateForecast();

})
