var startLocation;
var endLocation;
var numOfRestaurants;
var numOfActivities;

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



    });
}

$("#submitButton").on("click", function () {

    startLocation = $("#startAddress").val();
    endLocation = $("#endAddress").val();
    numOfRestaurants = $("#numRestaurants").val();
    numOfActivities = $("#numActivities").val();

    console.log(numOfActivities + ' ' + numOfRestaurants)
    createMap();
    generateRestaurants();

})



