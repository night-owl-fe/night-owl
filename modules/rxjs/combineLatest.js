var Rx = require('rxjs/Rx')

var stream1$ = Rx.Observable
  .create((observer) => {
    observer.next(1)
    observer.next(2)
  })

var stream2$ = Rx.Observable
  .create((observer) => {
    observer.next(1)
    observer.next(2)
  })

stream1$.combineLatest(stream2$)
  .subscribe((e) => {
    console.log(e)
  })

console.log('============================')

var stream1$ = Rx.Observable
  .create((observer) => {
    observer.next(1)
    setTimeout(() => {
      observer.next(2)
    }, 1000)
  })

var stream2$ = Rx.Observable
  .create((observer) => {
    observer.next(1)
    setTimeout(() => {
      observer.next(2)
    }, 2000)
  })

stream1$.combineLatest(stream2$, (a, b) => a + b)
  .subscribe((e) => {
    console.log(e)
  })