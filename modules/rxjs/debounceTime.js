var Rx = require('rxjs/Rx')

// debounceTime
// 舍弃掉在两次输出之间小于指定时间的发出值
// 此操作符在诸如预先知道用户的输入频率的场景下很受欢迎！
Rx.Observable.interval(2000)
  .take(3)
  .debounceTime(1000)
  .subscribe(val => {
    console.log(`Debounced Input: ${val}`);
  })