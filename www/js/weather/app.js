var renderResult = function(){

    var htmlTemplate =  "<ul>" +
                            "<h2><<City>></h2>" +
                            "<h3><<Cloudness>></h3>" +
                            "<li><strong>Temperature</strong></li>" +
                                "<ul>" +
                                    "<li><strong>Current</strong> : <<Temp_C>> F</li>" +
                                    "<li><strong>Feel Like</strong> : <<Temp_feels_like>> F</li>" +
                                    "<li><strong>Low</strong> : <<Temp_L>> F</li>" +
                                    "<li><strong>High</strong> : <<Temp_H>> F</li>" +
                                "</ul>" +
                            "<li><strong>Wind</strong> : <<Wind>> mph , <<degree>> degrees</li>" +
                            "<li><strong>Humidity</strong> : <<Humidity>></li>" +
                        "</ul>" +
                        "<div id = 'map'></div>";

    getWeather(function(json) {
        console.log(json);

        var temp_f = k_to_f(json.main.temp);
        var temp_f_high = k_to_f(json.main.temp_max);
        var temp_f_low = k_to_f(json.main.temp_min);
        var temp_feels_like = k_to_f(json.main.feels_like);

        var htmlasResult = htmlTemplate;

        htmlasResult = htmlasResult.replace("<<City>>",json.name +" , "+ json.sys.country)
        htmlasResult = htmlasResult.replace("<<Temp_C>>",temp_f)
        htmlasResult = htmlasResult.replace("<<Temp_feels_like>>",temp_feels_like)
        htmlasResult = htmlasResult.replace("<<Temp_L>>",temp_f_low)
        htmlasResult = htmlasResult.replace("<<Temp_H>>",temp_f_high)
        htmlasResult = htmlasResult.replace("<<Cloudness>>",json.weather[0].description)
        htmlasResult = htmlasResult.replace("<<Wind>>",json.wind.speed)
        htmlasResult = htmlasResult.replace("<<degree>>",json.wind.deg)
        htmlasResult = htmlasResult.replace("<<Humidity>>",json.main.humidity)
        
        $('#result').html(htmlasResult);

        initMap(json.coord.lat,json.coord.lon);

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