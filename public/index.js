var socket = require('socket.io-client').connect(window.location.host),
    Peer = require('web-peer');


console.log(socket, Peer);
