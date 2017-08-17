var Rx = require('rxjs/Rx')

//After given duration, emit numbers in sequence every specified duration.
Rx.Observable
  .timer(1000)
  .subscribe((val) => {
    console.log(val)
  })

Rx.Observable
  .timer(1000, 1000)
  .take(5)
  .subscribe((val) => {
    console.log(val)
  })
