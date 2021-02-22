



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
        let userdb = db.ref(user.uid);
          if (photourl!=""){
          userdb.push({pfp:photourl,username:username});}
          else{userdb.push({pfp:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg",username:username});}
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    // [END auth_signup_password]
  }



