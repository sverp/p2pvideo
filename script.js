

const roomIdText = document.getElementById('roomIdText')
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
var local_stream;


function stream_local(stream){
    let video = document.getElementById('localVideo');
    video.srcObject = stream;
    video.play();
}
function stream_remote(stream){
    let video = document.getElementById('remoteVideo');
    video.srcObject = stream;
    video.play();
}



function createRoom(){
    let peer = new Peer();
    peer.on('open',(id) => {
        roomIdText.innerText = `${id}`;
    })
    peer.on('call', (call) =>{ 
        console.log('11')       
        getUserMedia({video: true, audio: true}, (stream) => {
            stream_local(stream);
            call.answer(stream); 
            call.on('stream', function(remoteStream) {
                stream_remote(remoteStream);
            });
        }, function(err) {
            console.log('Failed to get local stream' ,err);
        });
    });
}


function joinRoom(){
    const idIn = document.getElementById('idIn').value;
    let peer = new Peer();
    getUserMedia({video: true, audio: true}, (stream) => {
        stream_local(stream);
        let call = peer.call(idIn, stream);
        call.on('stream', function(remoteStream) {
            console.log(remoteStream);
            stream_remote(remoteStream);
        });
    }, function(err) {
    console.log('Failed to get local stream' ,err);
    });
}


