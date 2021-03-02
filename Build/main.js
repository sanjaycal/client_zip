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
let uid = null;
let db = firebase.database();
let username = null;
let ref = db.ref("main");
let contrast_ratio = 1.05/1.5 - 0.05;
let imageTypes = ["jpg","png","gif","svg"]
let pfp = "";
var storageRef = firebase.storage().ref();



let font = "Ariel";
let room = null;
if (document.getElementById("roomCode")!=null){
document.getElementById("roomCode").value="main";
setRoom();}


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    let userdb = db.ref(user.uid);
    uid = user.uid
    userdb.on("child_added",function(snapshot){
        pfp = snapshot.val().pfp;
        username = snapshot.val().username;
        if (username != null){
            document.getElementById("usernameShow").innerHTML = username;
            }else{
                document.getElementById("usernameShow").innerHTML = "now you refresh the page";
            }
            document.getElementById("pfpShow").src = pfp;
    })
    if (location.href != "https://clientdotzip.web.app/main.html"){
    location.href = "https://clientdotzip.web.app/main.html";}
    
    // ...
  } else {
    username = null;
    document.getElementById("usernameShow").innerHTML = username;
  }
});




function setFont(){
    if (!(document.getElementById("font").value.includes("<"))){
        font = document.getElementById("font").value;
    }
}
function setRoom(){
    rm = document.getElementById("roomCode").value
    if (!(rm.includes("<"))){
        room = document.getElementById("roomCode").value;
        ref = db.ref("main").orderByChild("time")
        console.log()
        if(rm.substring(0,4)=="user"){
            if(rm.substring(5).localeCompare(username)==1){
                ref=db.ref(rm.substring(5)+username)
                room = "djsalkfjaslkdfjdslkacfkldshnvklcdnv jkfdh;nvlk;jdfdsvjvhcxjvhafjhndfvjkcfhdxxjkvbhdajkbvcxjkzvbhearcxjbhzjkcbhsajkheruifheuify458u856tyeruigoqettgfceuistgr4etgsiru"
            }else if(rm.substring(5).localeCompare(username)==-1){
                ref=db.ref(username+rm.substring(5))
                room = "djsalkfjaslkdfjdslkacfkldshnvklcdnv jkfdh;nvlk;jdfdsvjvhcxjvhafjhndfvjkcfhdxxjkvbhdajkbvcxjkzvbhearcxjbhzjkcbhsajkheruifheuify458u856tyeruigoqettgfceuistgr4etgsiru"
            }
        }
    }
    var elms = document.querySelectorAll("[id='h1']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].remove();}

    var elms = document.querySelectorAll("[id='h5']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].remove();}

    var elms = document.querySelectorAll("[id='img']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].remove();}

    var elms = document.querySelectorAll("[id='Profilepc']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].remove();}

    var elms = document.querySelectorAll("[id='mbr']");
    for(var i = 0; i < elms.length; i++) {
        elms[i].remove();}

    Cr()

}


function submit(){
    text = document.getElementById("inputText").value;
    var d = new Date();
    var n = d.getTime();
    if (document.getElementById("Fileinput").files[0]!= undefined){
    file = document.getElementById("Fileinput").files[0]}
    if (username != null && document.getElementById("inputText").value.length < 2000 && !(document.getElementById("inputText").value.includes("<"))) {
        dbref("main/"+n).set({text:text, font:font, room:room, uid:uid, isImage:false});
        document.getElementById("inputText").value = "";
    }if(document.getElementById("Fileinput").files[0]!= undefined){if(file.name!="" && imageTypes.includes((file.name).slice(-3))){
        urli = "";
        for (i = 0; i < 128; i++) {
            urli+= Math.floor(Math.random()*64).toString(32);
        }
        newFile = storageRef.child(urli)
        newFile.put(file).then((snapshot) => {
            newFile.getDownloadURL().then((url) => {
                db.ref("main/"+n).set({text:url, font:font, room:room, uid:uid, isImage:true});
                document.getElementById("inputText").value = "";
              })
          });





        
    }}
}


function Cr(){
    ref.off("child_added");
    ref.on("child_added",function(snapshot){
        if (snapshot.val().room == room){
            
            let senderdb = db.ref(snapshot.val().uid);
            data = senderdb.toJSON();
            fetch(data+".json")
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // Work with JSON data here
                let newMessage = document.getElementById("message").content.cloneNode(true);
                newMessage.children[0].src = data[Object.keys(data)[0]].pfp;
                newMessage.children[1].innerHTML = data[Object.keys(data)[0]].username.sanitize();
                newMessage.children[1].style.marginBottom = 0;
                newMessage.children[2].style.marginTop = 0;
                if(snapshot.val().isImage){
                    newMessage.children[4].src = snapshot.val().text;
                }else if (imageTypes.includes((snapshot.val().text).slice(-3))){
                    newMessage.children[4].src = snapshot.val().text;
                }else{
                    newMessage.children[3].innerHTML = snapshot.val().text.sanitize();
                }
                newMessage.children[2].style.fontFamily = snapshot.val().font;
                senderdb.off("child_added");
                document.body.insertBefore(newMessage,document.body.children[11]);
            });
            if (uid!=snapshot.val().uid){
            var audio = new Audio('message.mp3');
            audio.play();}
        }
    });



}


var wage = document.getElementById("inputText");
if (wage!= null){
    wage.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            validate(e);
        }
    });
}
function validate(e) {
    submit();
}

function updateUsernamePfp(){
    let userdb = db.ref(uid);
    username = document.getElementById("username").value
    if (document.getElementById("profilePicture")!=""){
        userdb.push({pfp:document.getElementById("profilePicture").value , username:username});
    }else{
        userdb.push({pfp:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1200px-The_Earth_seen_from_Apollo_17.jpg",username:document.getElementById("username")});
    }
}

function addImage(){
    document.getElementById("Fileinput").click();
}

String.prototype.sanitize = function(){
    let tagsToReplace = {
        "&":"&amp",
        "<":"&lt",
        ">":"&gt"
    };
    return this.replace(/[&<>]/g, function(tag){
        return tagsToReplace[tag] || tag;
    });


}