/// <reference path="libs/jquery-1.6.2.min.js" />
/*
=============== Flex Slider 1.4 ===============
Only when the Window is ready can we load the slider
*/
$(window).load(function () {
    $('.flexslider').flexslider({
        animation: "slide",
        controlsContainer: ".flexslider-container"
    });
});


/*
=============== DOM Ready ===============
Only when the DOM is ready do the following...
*/
$(document).ready(function () {

    //When DOM first loaded call /SearchEstates URL via the template Alias to get MAX & MIN values in JSON form
    UpdateSearchOptions("/SearchEstates");
    
    //When the location dropdown has changed...
    $("#location").change(function () {
        var value = "";
        $("select option:selected").each(function () {
            value += $(this).val()
        });

        if (value == -1) {
            UpdateSearchOptions("/SearchEstates");
        }
        else {
            UpdateSearchOptions("/SearchEstates?nodeId=" + value);
        }
    });
});


/*
=============== Update Search Options ===============
A function that updates the price, bedrooms & bathrooms 
using JSON depending on the properties found in that location
*/
function UpdateSearchOptions(url) {

    //Get JSON from the URL passed in...
    $.getJSON(url, function (data) {

        //Hide the default form inputs as we will use jQuery sliders...
        $("#price").hide();
        $("#noRooms").hide();
        $("#noBathrooms").hide();

        //Generate <span>'s to display the slider values
        $("#priceSlider").before("<span id='priceSliderVal'>");
        $("#roomSlider").before("<span id='roomSliderVal'>");
        $("#bathroomSlider").before("<span id='bathroomSliderVal'>");

        //Set the default values to the labels generated
        $("#priceSliderVal").text("£" + data.minPrice + " - £" + data.maxPrice);
        $("#roomSliderVal").text(data.minBedrooms);
        $("#bathroomSliderVal").text(data.minBathrooms);

        //Set the default values to the now hidden form fields
        $("#price").val("£" + data.minPrice + " - £" + data.maxPrice);
        $("#noRooms").val(data.minBedrooms);
        $("#noBathrooms").val(data.minBathrooms);

        //Setup the price slider with min & max values from our JSON result
        $("#priceSlider").slider({
            range: true,
            min: data.minPrice,
            max: data.maxPrice,
            step: 10000,
            values: [data.minPrice, data.maxPrice],
            slide: function (event, ui) {
                //When we move the slider update the value in the input box & <span>
                $("#price").val("£" + ui.values[0] + " - £" + ui.values[1]);
                $("#priceSliderVal").text("£" + ui.values[0] + " - £" + ui.values[1]);
            }
        });
        
        //Setup the room slider with min & max values from our JSON result
        $("#roomSlider").slider({
            min: data.minBedrooms,
            max: data.maxBedrooms,
            value: data.minBedrooms,
            slide: function (event, ui) {
                //When we move the slider update the value in the input box & <span>
                $("#noRooms").val(ui.value);
                $("#roomSliderVal").text(ui.value);
            }
        });
        
        //Setup the bathroom slider with min & max values from our JSON result
        $("#bathroomSlider").slider({
            min: data.minBathrooms,
            max: data.maxBathrooms,
            value: data.minBathrooms,
            slide: function (event, ui) {
                //When we move the slider update the value in the input box & <span>
                $("#noBathrooms").val(ui.value);
                $("#bathroomSliderVal").text(ui.value);
            }
        });

    });
}


/*
=============== Google Maps ===============
LoadGoogleMap - Pass in lat, lon & zoom level as parameters
*/
function loadGoogleMap(lat,long,zoomLevel) {
    //Property Location
    var propertyLocation = new google.maps.LatLng(lat, long);

    var myOptions = {
        zoom: zoomLevel,                            //Zoom level
        center: propertyLocation,                   //Where to center the map (with lat lng)
        mapTypeId: google.maps.MapTypeId.SATELLITE  //Maptype (ROADMAP, SATELLITE, HYBRID, TERRAIN)
    }

    //Create the google map with our options
    var map = new google.maps.Map(document.getElementById("estateMap"), myOptions);

    //Add a marker to the map
    var propertyMarker = new google.maps.Marker({
        position: propertyLocation,
        map: map
    });            
}