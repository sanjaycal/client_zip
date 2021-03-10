

peer = new Peer("admin-client-zip")

var conn = peer.connect("admin-client-zip")


conn.on('open', function() {
    // Receive messages
    conn.on('data', function(data) {
      console.log('Received', data);
    });
  
    // Send messages
    conn.send('Hello!');
  });


//var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//peer.on('call', function(call) {
//  getUserMedia({video: false, audio: true}, function(stream) {
//    call.answer(stream); // Answer the call with an A/V stream.
//    call.on('stream', function(remoteStream) {
//      document.getElementById("audio").srcObject = remoteStream
//    });
//  }, function(err) {
//    console.log('Failed to get local stream' ,err);
//  });
//});