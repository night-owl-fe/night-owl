var Koa = require('koa')

var app = new Koa()
var calls = [] // [ 1, 2, 3, 4, '|', 5, 6, 7, 8 ]
app.use((ctx, next) => {
  calls = [1]
  next().then(() => {
    calls.push(8);
    console.log(calls)
  });
  calls.push('|')
});

app.use(function * (next) {
  calls.push(2);
  yield next;
  calls.push(7);
});

app.use(async function (ctx, next) {
  calls.push(3);
  await next();
  calls.push(6);
});

app.use((ctx, next) => {
  calls.push(4);
  return next().then(() => {
    calls.push(5);
  });
});

const server = app.listen(3000);