var Rx = require('rxjs/Rx')

// Emit variable amount of values in a sequence.
Rx.Observable
  .of(1, 2, 3, 4, 5)
  .subscribe(val => console.log(val))

Rx.Observable
  .of({ name: 'wag' }, [1, 2, 3], () => 'hello', 1, null, undefined, NaN, 'string')
  .subscribe(val => console.log(val))
