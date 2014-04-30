var app = require('koa')(),
    builder = require('koa-browserify');

app.use(builder('.'));

app.listen(3000);
