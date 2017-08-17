var Rx = require('rxjs/Rx')

Rx.Observable
  .empty()
  .subscribe({
    next() {
      console.log('Next')
    },
    complete () {
      console.log('Complete')
    }
  })
