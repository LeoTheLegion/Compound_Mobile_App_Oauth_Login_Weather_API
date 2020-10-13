var dohome = function(){
    $('#content').html("<h1>Welcome to my FAU APP</h1><h3>Michael Mena - mmena2017@fau.edu - Z23446115</h3>");

    if (!firebase.auth().currentUser){
        $('#content').append('<p>Please Sign in</p>')
        $('#content').append('<button id="login">Sign in with Yahoo</button>')
        $('#login').click(function(){
            toggleSignIn(dohome)}
        );
    }
    else{
        $('#content').append('<p>You are signed in! </p>')
    }
    
}