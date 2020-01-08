var startLocation;
var endLocation;
var numOfRestaurants;
var numOfActivities;

//Create autofill search bars for Start and End destinations using Algolia Places
var startAddress = places({
    appId: 'pl7E3UZTOWW0',
    apiKey: '6a40a5221c1febca1b1d96bd6ef8e1c4',
    container: document.querySelector('#startAddress')
});

var endAddress = places({
    appId: 'pl7E3UZTOWW0',
    apiKey: '6a40a5221c1febca1b1d96bd6ef8e1c4',
    container: document.querySelector('#endAddress')
});

function createMap() {

    var mapquestApiKey = "LnKRG2Lq3YrtUP9FxWVGpL57coUhpfWy";

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
}

function generateActivies() {
    var yelpApiKey = "EKNdAx27IgYINE6TiVp9FhPB0Me3YrNSH44mLYiaKUp2XIvAVjBurD74d9e_GkjQtx_l2APPcgH3ZWEEDe7QMTL8iOqXmyShjPDdqEdSWiGa49JDB-Op7pTBeQIUXnYx";

    //categories: active life, arts & entertainment, hotels&travel (tours, camp grounds), public services(land marks)
    //     $.ajax({
    //         url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + endLocation + "&sort_by=rating&categories=<CATEGORIES>&radius=25000",
    //         headers: {
    //             'Authorization': 'Bearer ' + yelpApiKey,
    //         },
    //         method: "GET"
    //     }).then(function (response) {

    //     });
    // }

    function generateRestaurants() {
        var yelpApiKey = "EKNdAx27IgYINE6TiVp9FhPB0Me3YrNSH44mLYiaKUp2XIvAVjBurD74d9e_GkjQtx_l2APPcgH3ZWEEDe7QMTL8iOqXmyShjPDdqEdSWiGa49JDB-Op7pTBeQIUXnYx";

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + endLocation + "&sort_by=rating&categories=food&radius=25000",
            headers: {
                'Authorization': 'Bearer ' + yelpApiKey,
            },
            method: "GET"
        }).then(function (response) {
            console.log(response)

            for (var i = 0; i < numOfRestaurants; i++) {
                var restaurantAddress = "";
                var foodType = "";

                console.log(response.businesses[i].location.display_address)
                for (var j = 0; j < response.businesses[i].location.display_address.length; j++)
                    restaurantAddress += response.businesses[i].location.display_address[j] + ' ';

                for (var k = 0; k < response.businesses[i].categories.length; k++)
                    foodType += response.businesses[i].categories[k].title + ' ';


                var restaurantMediaObject = $('<div class="row"><div class="col"><div class="media"><img src="' + response.businesses[i].image_url + '"> ' +
                    '<div class="media-body"><h5 class="mt-0 businessHeader">' + response.businesses[i].name + '</h5>' +
                    '<p class="businessInfo">Rating: ' + response.businesses[i].rating + '</p>' +
                    '<p class="businessInfo">Address: ' + restaurantAddress + '</p>' +
                    '<p class="businessInfo">Food Type: ' + foodType + '</p>' +
                    '<p class="businessInfo">Phone Number: ' + response.businesses[i].display_phone + '</p>' +
                    '<p class="businessInfo">URL: <a href=' + response.businesses[i].url + '>See ' + response.businesses[i].name + ' on Yelp!</a></p>')
                $("#restaurants").append(restaurantMediaObject);
            }
        });
    }

    $("#submitButton").on("click", function () {

        startLocation = $("#startAddress").val();
        endLocation = $("#endAddress").val();
        numOfRestaurants = $("#numRestaurants").val();
        numOfActivities = $("#numActivities").val();

        $("#restaurants").empty();
        $("#activities").empty();

        //createMap();
        generateRestaurants();

    })



