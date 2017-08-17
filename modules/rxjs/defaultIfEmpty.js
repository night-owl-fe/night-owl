var Rx = require('rxjs/Rx')

Rx.Observable
  .of()
  .defaultIfEmpty('rxjs1')
  .subscribe({
    next(e) {
      console.log('Next', e)
    },
    complete () {
      console.log('Complete')
    }
  })

Rx.Observable
  .empty()
  .defaultIfEmpty('rxjs2')
  .subscribe({
    next(e) {
      console.log('Next', e)
    },
    complete () {
      console.log('Complete')
    }
  })