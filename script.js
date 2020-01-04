var apiKey = "LnKRG2Lq3YrtUP9FxWVGpL57coUhpfWy";


$("#submitButton").on("click", function () {
    var startLocation = $("#startAddress").val();
    var endLocation = $("#endAddress").val();
    var mapquestUrl = "http://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + startLocation + "&to=" + endLocation;

    $.ajax({
        url: mapquestUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
})


