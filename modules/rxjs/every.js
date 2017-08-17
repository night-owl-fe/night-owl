var Rx = require('rxjs/Rx')

// If all values pass predicate before completion emit true, else false.
Rx.Observable
  .from([1, 2, 3, 4, 5])
  .every((val) => val < 10)
  .subscribe((val) => {
    console.log(val)
  })
