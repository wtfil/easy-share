var app = require('koa')(),
    http = require('http'),
    stat = require('koa-static'),
    cjs = require('koa-browserify'),
    io = require('socket.io'),
    server;

app.use(cjs('./public'));
app.use(stat('./public'));

server = http.Server(app.callback());
io = io.listen(server);

server.listen(3000);
