var Rx = require('rxjs/Rx')
var count = 0

var ajax = (options) => new Promise((resolve, reject) => {
  count++
  console.log('---->>', count)
  if (count === 1) {
    setTimeout(() => {
      reject('timeout')
    }, 1000)
  } else {
    setTimeout(() => {
      options.count = count
      resolve(options)
    }, 1000)
  }
})

var options = {
  data: 'aaa'
}

var stream$ = Rx.Observable.of(options)
  .switchMap(ajax)
  .retry(1)

stream$.subscribe({
  next (val) {
    console.log('next:', val)
  },
  error (e) {
    console.log('error:', e)
  },
  complete () {
    console.log('complete')
  }
})

stream$.toPromise()
  .then((val) => {
    console.log('toPromise:', val)
  })
  .catch((e) => {
    console.log('toPromise:error:', e)
  })
