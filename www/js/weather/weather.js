var APIKEY = "05d6b4bb7a9ea7a316223f7e9bedb3cf";
var GETROOT = 'https://api.openweathermap.org/data/2.5/weather';

var getWeatherFromAPICall = function(query,callback){
    var GET = GETROOT + '?'+ query + "&appid=" + APIKEY;
    console.log('Getting Weather with query: ' + query);
    $.getJSON(GET, callback);
}

var getWeather = function(callback){
    var input = $('#location').val();

    if(isZipCode(input)){
        getWeatherFromAPICall("q=" + input + ",us",callback);
        return;
    }

    if(isLatLong(input)){
        input = input.replace(" ","");//clean coords
        var s = input.split(",");

        var lat = s[0];
        var long = s[1];

        getWeatherFromAPICall("lat=" +lat +"&lon=" + long,callback);
        return;
    }

    getWeatherFromAPICall("q=" + input,callback);
}

var isZipCode = function(input){
    return ((input.length == 5) && !isNaN(input));
}

var isLatLong = function(input){
    input = input.replace(" ","");//clean coords

    var a = input.split(",");
    if(a.length == 2){
        if(!isNaN(a[0])){
            if(!isNaN(a[1])){
                return true;
            }
        }
    }

    return false;
}

