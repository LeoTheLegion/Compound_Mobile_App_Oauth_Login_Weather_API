var GETROOT = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';

var getWeatherFromAPICall = function(query,callback){
    var GET = GETROOT + '?'+ query + '&format=json';
    console.log('Getting Weather with GET: ' + GET);

    $.ajax({
        url: GET,
        type: 'GET',
        dataType: 'json',
        success: callback ,
        error: function() { alert('Failed!'); },
        beforeSend: setHeader
      });

    function setHeader(xhr) {
    var token = window.sessionStorage.getItem("token");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    }
}

var getWeather = function(callback){
    var input = $('#location').val();

    if(isZipCode(input)){
        alert("We are not able to process Zipcodes with Yahoo :(")
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

    getWeatherFromAPICall("location=" + input,callback);
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

