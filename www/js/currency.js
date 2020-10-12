var docurrency = function(){
    $('#content').html( '<input id = "sourcePrice" placeholder="Please enter value">'+
                        '<select id = "source"></select>'+
                        '<select id = "destination"></select>'+
                        '<div id = "convertedValue"></div>'+
                        '<button id="convert">Convert</button>'
    )

    $('#source').append('<option value="USD">USD</option>')
    $('#destination').append('<option value="USD">USD</option>')

    getExchangeRate($("#source").val(),function(json){
        console.log(json);
        $.each(json.rates,function(key,value){
            $('#source').append('<option value="'+ key +'">'+ key +'</option>');
            $('#destination').append('<option value="'+ key +'">'+ key +'</option>');
        });
    })

    $('#convert').click(function(){
        Convert();
    });

    $('#source').click(function(){
        Convert();
    });

    $('#destination').click(function(){
        Convert();
    });

    Convert();
}

function Convert(){
    var sourcePrice = $("#sourcePrice").val();
    if(isNaN(sourcePrice)){
        alert("Please put a real number..")
        return;
    }
    getExchangeRate($("#source").val(),function(json){
        var convertValue = json.rates[$('#destination').val()] * $("#sourcePrice").val();
        $("#convertedValue").text(convertValue.toFixed(2));
    })
}

function getExchangeRate(source,callback){
    var GET  = "https://api.exchangeratesapi.io/latest?base="+source;
    $.getJSON(GET, callback);
}


function buildcurrency(json){
    var list = $("#list");
    $.each(json.rates,function(key,value){
        list.append("<li>" + key + "," +value + "</li>");
    });
}

