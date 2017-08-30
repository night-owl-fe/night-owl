var Rx = require('rxjs/Rx')

const myPromise = val => new Promise(resolve => setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000))

/*
 所有observables完成了，输出最终的值，值是一个数组，按照加入的顺序排列
 */
const example = Rx.Observable.forkJoin(
  //emit 'Hello' immediately
  Rx.Observable.of('Hello'),
  //emit 'World' after 1 second
  Rx.Observable.of('World').delay(1000),
  //emit 0 after 1 second
  Rx.Observable.interval(1000).take(1),
  //emit 0...1 in 1 second interval
  Rx.Observable.interval(1000).take(2),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  myPromise('RESULT')
);
//output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
const subscribe = example.subscribe(val => console.log(val));

