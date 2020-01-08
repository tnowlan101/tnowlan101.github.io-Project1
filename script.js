var apiKey = "LnKRG2Lq3YrtUP9FxWVGpL57coUhpfWy";


$("#submitButton").on("click", function () {
    var startLocation = $("#startAddress").val();
    var endLocation = $("#endAddress").val();

    $(".card").empty();
    var mapContainerRow = $("<div class='row w-100 h-100 m-0' id='map'></div>");
    mapContainerRow.append(mapContainerRow);
    $(".card").append(mapContainerRow);

    L.mapquest.key = apiKey;

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
    map.addControl(L.mapquest.control());


})



