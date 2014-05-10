var socket = require('socket.io-client').connect(window.location.host),
    Peer = require('web-peer'),
    peer = new Peer();

peer.on('error', console.error.bind(console));
peer.on('sync', socket.emit.bind(socket, 'sync'));
socket.on('sync', peer.sync.bind(peer));

window.addEventListener('load', function () {
	var input = document.querySelector('input'),
		progress = document.querySelector('progress'),
		file;

	input.addEventListener('change', function () {
		file = input.files[0];
		if (location.pathname === '/') {
			history.replaceState(null, null, Math.random());
		}
	}, false);
	
	peer.send('get file');
	peer.on('data', function (message) {
		if (message = 'get file' && file) {
			peer.sendFile(file);
		}
	});

	peer.on('file', function (file) {
		file.on('progress', function (val) {
			progress.value = val;
		});
		console.log(file);
	});
	
	// peer.on('data', console.log.bind(console));
}, false);