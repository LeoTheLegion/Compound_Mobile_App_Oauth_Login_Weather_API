$(document).ready(function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    $('#homebtn').click(dohome);
    $('#weatherbtn').click(doweather);
    $('#mapbtn').click(domap);
    $('#currencybtn').click(docurrency);

    $('#login').click(toggleSignIn);
    initOAuth([$('#homebtn'),$('#weatherbtn'), $('#mapbtn'),$('#currencybtn')]);
    dohome();
});
