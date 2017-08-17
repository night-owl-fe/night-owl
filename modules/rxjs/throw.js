var Rx = require('rxjs/Rx')

// Emit error on subscription.
Rx.Observable
  .throw('Error')
  .subscribe({
    error (e) {
      console.log(e)
    }
  })
