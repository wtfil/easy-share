var app = require('koa')(),
    http = require('http'),
    stat = require('koa-static'),
    cjs = require('koa-browserify'),
    router = require('koa-router'),
    io = require('socket.io'),
    server;

app.use(cjs('./public'));
app.use(stat('./public'));

app.use(router(app));
app.get('/', function *() {
	this.type = 'text/html';
	this.body = require('fs').createReadStream('./public/index.html');
});
app.get('/:fileId', function *() {
	this.type = 'text/html';
	this.body = require('fs').createReadStream('./public/index.html');
});


server = http.Server(app.callback());
io = io.listen(server);

io.on('connection', function (socket) {
	socket.on('sync', function (data) {
		socket.broadcast.emit('sync', data);
	});
});

server.listen(Number(process.env.PORT || 3000));
