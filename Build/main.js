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
let contrast_ratio = 1.05/1.5 - 0.05


let r = Math.floor(Math.random()*256*contrast_ratio).toString(16)
if (r.length ==1){
    r = "0"+r   
}
let g = Math.floor(Math.random()*256*contrast_ratio).toString(16)
if (g.length ==1){
    g = "0"+g
}
let b = Math.floor(Math.random()*256*contrast_ratio).toString(16)
if (b.length ==1){
    b = "0"+b
}
let randomColor = r.concat(g.concat(b));
let font = "Ariel";
let room = null;



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    username = user.displayName;
    if (username != null){
    document.getElementById("usernameShow").innerHTML = username;
    }else{
        document.getElementById("usernameShow").innerHTML = "now you refresh the page";
    }
    document.getElementById("usernameShow").style.color = "#" + randomColor;
    // ...
  } else {
    username = null;
    document.getElementById("usernameShow").innerHTML = username;
    document.getElementById("usernameShow").style.color = "#" + randomColor;
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
    console.log(document.body.children)
    var elms = document.querySelectorAll("[id='h1']");
    for(var i = 0; i < elms.length; i++) {
  elms[i].remove();}
  var elms = document.querySelectorAll("[id='h5']");
  for(var i = 0; i < elms.length; i++) {
elms[i].remove();}
    Cr()

}
function submit(){
    if (username != null && document.getElementById("inputText").value.length > 2 && !(document.getElementById("inputText").value.includes("<"))) {
        ref.push({username:username, text:document.getElementById("inputText").value, color:randomColor, font:font, room:room});
        document.getElementById("inputText").value = "";
    }
}
function Cr(){
ref.off("child_added");


    ref.on("child_added",function(snapshot){
        if (snapshot.val().room == room){
    let newMessage = document.getElementById("message").content.cloneNode(true);
    newMessage.children[0].style.color = "#" + snapshot.val().color;
    newMessage.children[0].style.marginBottom = 0;
    newMessage.children[1].style.marginTop = 0;
    newMessage.children[0].innerHTML = snapshot.val().username;
    newMessage.children[1].innerHTML = snapshot.val().text;
    newMessage.children[1].style.fontFamily = snapshot.val().font;
    document.body.insertBefore(newMessage,document.body.children[16]);}
});



}


var wage = document.getElementById("inputText");
wage.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        validate(e);
    }
});

function validate(e) {
    submit();
}
