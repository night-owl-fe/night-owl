var Rx = require('rxjs/Rx')

var stream1$ = Rx.Observable.of(1, 2, 3)
var stream2$ = Rx.Observable.of(4, 5, 6)

stream1$.concat(stream2$)
  .subscribe((e) => {
    console.log(e)
  })

console.log('============================')

stream1$ = Rx.Observable.of(1, 2, 3).delay(3000)
stream2$ = Rx.Observable.of(4, 5, 6)

stream1$.concat(stream2$)
  .subscribe((e) => {
    console.log(e)
  })