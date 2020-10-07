var worldCityPath = 'storage/weather/world-cities_json.json'

var getWorldCities = function(callback){
    $.getJSON(worldCityPath, callback);
}