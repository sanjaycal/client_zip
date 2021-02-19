



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
    var photourl = document.getElementById("profilePicture").value;
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        user.updateProfile ({ displayName : username, photoURL: photourl} ).then(function() {
          // Profile updated successfully!
          // "Jane Q. User"
          var displayName = user.displayName;
          let userdb = db.ref(user.uid);
          if (photourl!=""){
          pfp = userdb.push({pfp:photourl});}
          else{pfp = userdb.push({pfp:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg"});}
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