var Rx = require('rxjs/Rx')

// 将多个流合并成一个，合成的规律按照时间

var stream1$ = Rx.Observable.interval(1000).mapTo('A').take(5)
var stream2$ = Rx.Observable.interval(2000).mapTo('B').take(5)
var stream3$ = Rx.Observable.interval(3000).mapTo('C').take(5)

Rx.Observable
  .merge(stream1$, stream2$, stream3$)
  .subscribe((e) => {
    console.log(e)
  })