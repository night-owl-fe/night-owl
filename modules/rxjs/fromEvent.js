var Rx = require('rxjs/Rx')

Rx.Observable
  .fromEvent(document, 'click')
  .map(e => e.timeStamp)
  .subscribe((timeStamp) => {
    console.log(timeStamp)
  })
