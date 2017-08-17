var Rx = require('rxjs/Rx')

// Emit numbers in provided range in sequence.
Rx.Observable
  .range(1, 5)
  .subscribe(val => console.log(val))
