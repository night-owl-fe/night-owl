var Rx = require('rxjs/Rx')

// 使用可选的比较函数，按顺序比较两个 Observables 的所有值，然后返回单个布尔值的 Observable， 以表示两个序列是否相等
Rx.Observable
  .from([1, 2, 3, 4, 5])
  .sequenceEqual(Rx.Observable
    .of(1, 2, 3, 4, 5, 6))
  .subscribe((val) => {
    console.log(val)
  })

Rx.Observable
  .from([1, 2, 3, 4, 5])
  .sequenceEqual(Rx.Observable
    .of(1, 2, 3, 4, 5))
  .subscribe((val) => {
    console.log(val)
  })
