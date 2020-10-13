var buttonSelected;

function selectButton(btn){
    if(buttonSelected)
        buttonSelected.prop("disabled",false);
    buttonSelected = btn;
    buttonSelected.prop("disabled",true);
}

$(document).ready(function(){
    //Do this when DOM is loaded

    //Set event listeners/handlers for buttons
    $('#homebtn').click(function(){
        dohome();
        selectButton($('#homebtn'));
    });
    $('#weatherbtn').click(function(){
        doweather();
        selectButton($('#weatherbtn'));
    });
    $('#mapbtn').click(function(){
        domap();
        selectButton($('#mapbtn'));
    });
    $('#currencybtn').click(function(){
        docurrency();
        selectButton($('#currencybtn'));
    });
    $('#SignOutbtn').click(function(){
        toggleSignIn(dohome)}
    );

    
    initOAuth([$('#homebtn'),$('#weatherbtn'), $('#mapbtn'),$('#currencybtn'),$('#SignOutbtn')]);
    dohome();
    selectButton($('#homebtn'));
});
