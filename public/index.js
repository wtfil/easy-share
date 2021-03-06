var React = require('react'),
    Model = require('./model'),
    DragForm = require('./drag-form'),
    peer = require('./peer-connection')();


var App = React.createClass({
    mixins: [Model.ReactModelMixin],
    render: function () {
        return  DragForm({model: this.model});
    }
});


window.addEventListener('load', function () {
    var model = new Model();

    function sendFileNames() {
        var files = model.get().files;
        if (files) {
            peer.send('ready to load', files);
        }
    }

    React.renderComponent(App({model: model}), document.querySelector('.app'));

    model.on('files', function () {
		if (location.pathname === '/') {
			history.replaceState(null, null, Math.random());
		}
        sendFileNames();
    });

    // send file
    model.on('current-file', function (name) {
        peer.send('get file', name);
    });
    // recieve file
    peer.messages.on('get file', function (name) {
        var files = model.get().files,
            file = files.filter(function (file) {
                return file.name === name;
            })[0];
        peer.sendFile(file);
    });
    peer.on('file', function (file) {
        /*model.set('state', 'load');*/
        file.on('progress', function (progress) {
            model.set('progress', progress);
        });
        /*file.on('load', function () {*/
            /*model.set('state', 'done');*/
    /*});*/
    });

    // ask and recieve remote file names
    peer.send('get file names');
    peer.messages.on('get file names', sendFileNames);
    peer.messages.on('ready to load', function (files) {
        model.set('remote', files);
    });
    
}, false);
