var Rx = require('rxjs/Rx')

//Emit numbers in sequence based on provided timeframe.
Rx.Observable
  .interval(1000)
  .take(5)
  .subscribe((val) => {
    console.log(val)
  })