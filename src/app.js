
const $ = require('jquery');
const uid = require('uid');
const Peer = require('peerjs');
const openStream = require('./openStream');
const playVideo = require('./playVideo');
const getIceObject = require('./getIceObject');

getIceObject(iceConfig => {
    const connectionObj = {
        host: 'enow-stream.herokuapp.com',
        port: 443,
        secure: true,
        key: 'peerjs',
        config: iceConfig
    };

    const peerData = new Peer(getPeer(), connectionObj);

    $('#btnCall').click(() => {
        const friendId = $('#txtFriendId').val();
        openStream(stream => {
            playVideo(stream, 'localStream');
            const call = peer.call(friendId, stream);
            call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
        });
    });

    peerData.on('call', call => {
        openStream(stream => {
            console.log('00000')
            playVideo(stream, 'localStream');
            call.answer(stream);
            call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
        });
    });

});

function getPeer() {
    const id = uid(10);
    console.log(id, 'id ne');
    $('#peer-id').append(id);
    return id;
}




