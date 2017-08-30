var Rx = require('rxjs/Rx')

// 将多个流合并成一个，合成的规律按照时间

//take the first observable to emit
const example = Rx.Observable.race(
  //emit every 1.5s
  Rx.Observable.interval(1500),
  //emit every 1s
  Rx.Observable.interval(1000).mapTo('1s won!'),
  //emit every 2s
  Rx.Observable.interval(2000),
  //emit every 2.5s
  Rx.Observable.interval(2500)
);
//output: "1s won!"..."1s won!"...etc
const subscribe = example.subscribe(val => console.log(val));