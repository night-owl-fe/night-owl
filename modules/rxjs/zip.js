var Rx = require('rxjs/Rx')

const sourceOne = Rx.Observable.of('Hello');
const sourceTwo = Rx.Observable.of('World!');
const sourceThree = Rx.Observable.of('Goodbye');
const sourceFour = Rx.Observable.of('World!');
// 一直等到所有 observables 都发出一个值，才将所有值作为数组发出
const example = Rx.Observable
  .zip(
    sourceOne,
    sourceTwo.delay(1000),
    sourceThree.delay(2000),
    sourceFour.delay(3000)
  );
// 输出: ["Hello", "World!", "Goodbye", "World!"]
const subscribe = example.subscribe(val => console.log(val));