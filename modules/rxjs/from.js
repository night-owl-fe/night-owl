var Rx = require('rxjs/Rx')

// Turn an array, promise, or iterable into an observable.
var stream$ = Rx.Observable.from([1, 2, 3, 4, 5])

stream$.subscribe((val) => {
  console.log(val)
})

var promise$ = Rx.Observable.from(Promise.resolve('wag'))

promise$.subscribe((val) => {
  console.log(val)
})

var iterable$ = Rx.Observable.from(new Set([1, 2, 3]))

iterable$.subscribe((val) => {
  console.log('iterable$', val)
})

var string$ = Rx.Observable.from('123')

string$.subscribe((val) => {
  console.log('string$', val)
})
