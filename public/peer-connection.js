var socket = require('socket.io-client').connect(window.location.host),
    Peer = require('web-peer'),
    peer;

module.exports = function () {

    if (peer) {
        return peer;
    }

    peer = new Peer();

    peer.on('error', console.error.bind(console));
    peer.on('sync', socket.emit.bind(socket, 'sync'));
    socket.on('sync', peer.sync.bind(peer));

    return peer;

};
