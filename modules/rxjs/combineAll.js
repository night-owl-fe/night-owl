var Rx = require('rxjs/Rx')

//emit every 1s, take 2
const source = Rx.Observable.interval(1000).take(2);
//map each emitted value from source to interval observable that takes 5 values
const example = source.map(val => Rx.Observable.interval(1000).map(i => `Result (${val}): ${i}`).take(5));
/*
 source先执行完毕，example执行combineAll，相当于多个流按照combineLatest进行合并
 */
const combined = example.combineAll();
/*

 output:
 ["Result (0): 0", "Result (1): 0"]
 ["Result (0): 1", "Result (1): 0"]
 ["Result (0): 1", "Result (1): 1"]
 ["Result (0): 2", "Result (1): 1"]
 ["Result (0): 2", "Result (1): 2"]
 ["Result (0): 3", "Result (1): 2"]
 ["Result (0): 3", "Result (1): 3"]
 ["Result (0): 4", "Result (1): 3"]
 ["Result (0): 4", "Result (1): 4"]
 */
const subscribe = combined.subscribe(val => console.log(val));
