var { Observable } = require('rxjs')

Observable
  .of(2, 3, 4, 5, 6, 2, 3)
  .skipWhile(val => val < 5)
  .subscribe((val) => {
    console.log(val)
  })
