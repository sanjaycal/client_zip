
//import Peer from "https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"

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

const audio = document.querySelector('audio');

selfPeer = new Peer()

var conn = selfPeer.connect("admin-client-zip")


conn.on('open', function() {
    // Receive messages
    conn.on('data', function(data) {
      console.log('Received', data);
    });
  
    // Send messages
    conn.send('Hello!');
  });

//var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//getUserMedia({video: false, audio: true}, function(stream) {
//  var call = selfPeer.call('admin-client-zip', stream);
//  call.on('stream', function(remoteStream) {
//    // Show stream in some video/canvas element.
//  });
//}, function(err) {
//  console.log('Failed to get local stream' ,err);
//});



let hashcode = ""
let nhashcode = ""
firebase.initializeApp(firebaseConfig);
let uid = null;
let db = firebase.database();
let username = null;
let ref = db.ref("main");
let contrast_ratio = 1.05/1.5 - 0.05;
let imageTypes = ["jpg","png","gif","svg"]
let pfp = "";
let storageRef = firebase.storage().ref();
let users = {}



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
        hashref = db.ref("hash/"+room)
        hashref.push(Math.floor(Math.random()*200000000000).toString(16))
        ref = db.ref("main/"+room)
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
    forceUpdate();

}


function submit(){
    text = document.getElementById("inputText").value;
    var d = new Date();
    var n = d.getTime();
    file = document.getElementById("Fileinput").files[0]
    console.log(file)
    storageRef = firebase.storage().ref().child(Math.floor(Math.random()*200000000000000000).toString(16))
    if(file!=undefined){
        storageRef.put(file).then((snapshot) => {
            storageRef.getDownloadURL().then((url) => {
            console.log(url)
            ref.push({text:url, room:room, uid:uid, isImage:true});
        })})
    }else{
        if (text.length<2000){
        ref.push({text:text, room:room, uid:uid, isImage:false});}
    }
    
    document.getElementById("inputText").value = "";
    hashref = db.ref("hash/"+room)
    hashref.push(Math.floor(Math.random()*200000000000).toString(16))
    update();

    
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





function update(){
    if (document.getElementById("Fileinput").files[0]!=undefined){
        document.getElementById("inputText").value = document.getElementById("Fileinput").files[0].name 
    }
    hashref = db.ref("hash/"+room)
    nhashcode = JSON.parse(Get(hashref.toJSON()+".json"))
    nhashcode = nhashcode[(Object.keys(nhashcode))[Object.keys(nhashcode).length - 1]]
    console.log(nhashcode)
    if(hashcode!=nhashcode){
    
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

    Messages = ref.toJSON()
    fetch(Messages+".json")
    .then((response) => {
        return response.json()
    })
    .then((AllMessages) => {
        if (AllMessages == undefined || AllMessages == null){
            sleep(200).then((data) =>{ref.push({text:"start", room:room, uid:uid, isImage:false});})

        }
        orderedMessages = Object.keys(AllMessages).sort().reduce(
            (obj, key) => { 
              obj[key] = AllMessages[key]; 
              return obj;
            }, 
            {}
          );
        for (message in orderedMessages){
            if (orderedMessages[message].room == room){


                let newMessage = document.getElementById("message").content.cloneNode(true);
                let senderdb = db.ref(orderedMessages[message].uid);
                data = senderdb.toJSON();
                if (users[data]== undefined){
                a = JSON.parse(Get(data+".json"))
                users[data] = a
                data = a
            }else{
                    data=users[data]
                }
                newMessage.children[0].src = data[Object.keys(data)[0]].pfp
                newMessage.children[1].innerHTML = data[Object.keys(data)[0]].username.sanitize();
                newMessage.children[1].style.marginBottom = 0;
                newMessage.children[2].style.marginTop = 0;
                    if(orderedMessages[message].isImage){
                        console.log(orderedMessages[message].text)
                        newMessage.children[4].src = orderedMessages[message].text;
                    }else if (imageTypes.includes((orderedMessages[message].text).slice(-3))){
                        newMessage.children[4].src = orderedMessages[message].text;
                    }else{
                        newMessage.children[3].innerHTML = orderedMessages[message].text.sanitize();
                    }
                    document.body.insertBefore(newMessage,document.body.children[11]);
                
                
            

            }

        }
    });
    hashcode = nhashcode;
}

}


function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);  
    return Httpreq.responseText;    
}



async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



var t=setInterval(update,1000);



function forceUpdate(){
    
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

    Messages = ref.toJSON()
    fetch(Messages+".json")
    .then((response) => {
        return response.json()
    })
    .then((AllMessages) => {
        if (AllMessages == undefined || AllMessages == null){
            ref.push({text:"start", room:room, uid:uid, isImage:false});

        }
        orderedMessages = Object.keys(AllMessages).sort().reduce(
            (obj, key) => { 
              obj[key] = AllMessages[key]; 
              return obj;
            }, 
            {}
          );
        for (message in orderedMessages){
            if (orderedMessages[message].room == room){


                let newMessage = document.getElementById("message").content.cloneNode(true);
                let senderdb = db.ref(orderedMessages[message].uid);
                data = senderdb.toJSON();
                if (users[data]== undefined){
                a = JSON.parse(Get(data+".json"))
                users[data] = a
                data = a
            }else{
                    data=users[data]
                }
                newMessage.children[0].src = data[Object.keys(data)[0]].pfp
                newMessage.children[1].innerHTML = data[Object.keys(data)[0]].username.sanitize();
                newMessage.children[1].style.marginBottom = 0;
                newMessage.children[2].style.marginTop = 0;
                    if(orderedMessages[message].isImage){
                        newMessage.children[4].src = orderedMessages[message].text;
                    }else if (imageTypes.includes((orderedMessages[message].text).slice(-3))){
                        newMessage.children[4].src = orderedMessages[message].text;
                    }else{
                        newMessage.children[3].innerHTML = orderedMessages[message].text.sanitize();
                    }
                    document.body.insertBefore(newMessage,document.body.children[11]);
                
                if (uid!=orderedMessages[message].uid){
                var audio = new Audio('message.mp3');
                audio.play();}
            

            }

        }
    });

}
