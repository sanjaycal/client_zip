const firebaseConfig = {
    apiKey: "AIzaSyBVqEwxWAnjJkyT9R2YOdFZTyROBfcvhGY",
    authDomain: "fir-test-f2419.firebaseapp.com",
    projectId: "fir-test-f2419",
    storageBucket: "fir-test-f2419.appspot.com",
    messagingSenderId: "634113949782",
    appId: "1:634113949782:web:71118d71b1ac860a747bf7",
    measurementId: "G-0XGXS3Z2GS",
    databaseURL: "https://fir-test-f2419-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.database();
let username = null;
let ref = db.ref("test");
let randomColor = Math.floor(Math.random()*16777215).toString(16);
console.log("#"+randomColor);
let font = "Ariel";
let room = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    username = user.displayName;
    document.getElementById("usernameShow").innerHTML = username;
    document.getElementById("usernameShow").style.color = "#" + randomColor;
    // ...
  } else {
    // User is signed out
    // ...
  }
});




function setFont(){
    if (!(document.getElementById("font").value.includes("<"))){
        font = document.getElementById("font").value;
    }
}
function setRoom(){
    if (!(document.getElementById("roomCode").value.includes("<"))){
        room = document.getElementById("roomCode").value;
    }
}
function submit(){
    if (username != null && document.getElementById("inputText").value.length > 2 && !(document.getElementById("inputText").value.includes("<"))) {
        ref.push({username:username, text:document.getElementById("inputText").value, color:randomColor, font:font, room:room});
        document.getElementById("inputText").value = "";
    }
}

ref.on("child_added",function(snapshot){
    //if (snapshot.val().room == room){
    let newMessage = document.getElementById("message").content.cloneNode(true);
    newMessage.children[0].style.color = "#" + snapshot.val().color;
    newMessage.children[0].style.marginBottom = 0;
    newMessage.children[1].style.marginTop = 0;
    newMessage.children[0].innerHTML = snapshot.val().username;
    newMessage.children[1].innerHTML = snapshot.val().text;
    newMessage.children[1].style.fontFamily = snapshot.val().font;
    document.body.insertBefore(newMessage,document.body.children[17]);//}
});

var wage = document.getElementById("inputText");
wage.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        validate(e);
    }
});

function validate(e) {
    submit();
}
