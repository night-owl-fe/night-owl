var Rx = require('rxjs/Rx')

// Create an observable with given subscription function
Rx.Observable
  .create((observer) => {
    observer.next(1)
    observer.next(2)
  })
  .subscribe(val => {
    console.log(val)
  })
