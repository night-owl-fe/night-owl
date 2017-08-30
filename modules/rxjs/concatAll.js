var Rx = require('rxjs/Rx')

//== 将多个高阶Observable按照concat顺序执行

//emit a value every 2 seconds
const source = Rx.Observable.interval(2000).take(3);
const example = source
//for demonstration, add 10 to and return as observable
  .map(val => Rx.Observable.interval(1000).take(5))
  //merge values from inner observable
  .concatAll();
//output: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
const subscribe = example.subscribe(val => console.log('Example with Basic Observable:', val));

// 第一个从3000开始执行
setTimeout(() => {
  console.log('--->>run')
}, 2500)