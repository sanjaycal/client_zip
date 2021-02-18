



function signInWithEmailPassword() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // [START auth_signin_password]
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    // [END auth_signin_password]
  }
  
function signUpWithEmailPassword() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        user.updateProfile ({ displayName : username} ).then(function() {
          // Profile updated successfully!
          // "Jane Q. User"
          var displayName = user.displayName;
          // "https://example.com/jane-q-user/profile.jpg"
        }, function(error) {
          // An error happened.
        });;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    // [END auth_signup_password]
  }