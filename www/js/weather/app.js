var renderResult = function(){

    var htmlTemplate =  "<ul>" +
                            "<h2><<City>></h2>" +
                            "<h3><<Cloudness>></h3>" +
                            "<li><strong>Temperature</strong> : <<Temp>> F</li>" +
                            "<li><strong>Wind</strong> : <<Wind>> mph , <<degree>> degrees</li>" +
                            "<li><strong>Humidity</strong> : <<Humidity>></li>" +
                        "</ul>" +
                        "<div id = 'map'></div>";

    getWeather(function(json) {
        console.log(json);

        var htmlasResult = htmlTemplate;

        htmlasResult = htmlasResult.replace("<<City>>",json.location.city +" , "+ json.location.country)
        htmlasResult = htmlasResult.replace("<<Temp>>",json.current_observation.condition.temperature)
        htmlasResult = htmlasResult.replace("<<Cloudness>>",json.current_observation.condition.text)
        htmlasResult = htmlasResult.replace("<<Wind>>",json.current_observation.wind.speed)
        htmlasResult = htmlasResult.replace("<<degree>>",json.current_observation.wind.direction)
        htmlasResult = htmlasResult.replace("<<Humidity>>",json.current_observation.atmosphere.humidity)
        
        $('#result').html(htmlasResult);

        initMap(json.location.lat,json.location.long);

    });
}

var searchWithGPS = function(){
    navigator.geolocation.getCurrentPosition(
    function(position) {
        $('#location').val(position.coords.latitude + ',' + position.coords.longitude);
        renderResult();
    },
    function() {
        alert('Error getting location');
    });
}

var k_to_f = function(k){
    return Math.round((k - 273.15)*(9/5)+35);
}

// PASS jquery OBJ for params
var init = function(gps,search,location,worldCityPath){
    worldCityPath = worldCityPath;
    getWorldCities(function(json) {
        console.log(json);
        var options = [];
        json.forEach(e => {
            options.push(e.name + "," +e.subcountry);
        });
        console.log(location);
        location.autocomplete({
            source: options
         });
    });
    
    gps.click(searchWithGPS);
    search.click(renderResult);
    location.keyup(function(event){
        if(event.keyCode == 13){
            renderResult();
        }
    });
}