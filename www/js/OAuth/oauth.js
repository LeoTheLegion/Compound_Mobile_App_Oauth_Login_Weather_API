var buttons_oauth = [];//cashed btns for later

function initOAuth(buttons) {
   //Make sure user is not signed in on page load.
  firebase.auth().signOut();
  buttons_oauth = buttons;
  //Set listeners for Auth State Changed
  firebase.auth().onAuthStateChanged(function (user,buttons) {
    //if there is a user enable app functionality
    if (user) {
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      document.getElementById('login').textContent = 'Sign out';
      setButtonsActiveTo(true);
      //else keep the app disabled or re-disabled it
    } else {
      document.getElementById('login').textContent = 'Sign in with Yahoo';
      setButtonsActiveTo(false);
    }
  });
}

function setButtonsActiveTo(flag){
  for ( var i = 0, l = buttons_oauth.length; i < l; i++ ) {
    buttons_oauth[i].prop("disabled",!flag);
  }
}

function toggleSignIn() {
  //If the current user object does not exist
  if (!firebase.auth().currentUser) {
    //Set the auth provider to yahoo
    var provider = new firebase.auth.OAuthProvider('yahoo.com');
    //And sign in with a popup
    firebase.auth().signInWithPopup(provider)
      .then(function (result) { //On Success save the token to session storage and output it to console
        var token = result.credential.accessToken;
        window.sessionStorage.setItem("token",token);
        console.log(result);
      })
      .catch(function (error) { //On failure alert user or report error to console
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
        } else {
          console.error(error);
        }
      });
  } else {
    firebase.auth().signOut();
  }

}
