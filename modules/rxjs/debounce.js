var Rx = require('rxjs/Rx')

Rx.Observable
  .of('WAIT', 'ONE', 'SECOND', 'Last will display')
  .debounce(() => Rx.Observable.timer(1000))
  .subscribe(val => {
    console.log(`Debounced Input: ${val}`);
  })

// 尽管没有 debounceTime 使用广泛，但当 debounce 的频率是变量时, debounce 是很重要的！
Rx.Observable
  .interval(1000)
  .debounce(val => Rx.Observable.timer(val * 200))
  .subscribe(val => {
    console.log(`Example Two: ${val}`);
  })