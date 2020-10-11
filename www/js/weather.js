var doweather = function() {
    $('#content').html(
    '<section id="fetch">'+
        '<div class = "ui-widget">'+
            '<input id = "location" placeholder="Please enter City, State, or Lat/Long">'+
            '<img id="gps" src="img/weather/gps_target.png">'+
            '<br>'+
            '<br>'+
            '<button id="search">Find me the weather</button>'+
        '</div>'+
        '</section>'+
    '<div id = "result">'+
    '</div>');

    init($("#gps"),$("#search"),$("#location"),
    'storage/weather/world-cities_json.json'
    );
}


