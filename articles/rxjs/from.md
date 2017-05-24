### from
public static from(ish: ObservableInput<T>, scheduler: Scheduler): Observable<T>

将an Array, an array-like object, a Promise, an iterable object, or an Observable-like object 转换成 Observable

> 转换各种对象和数据类型成为 Observable

#### Params:

<table>
   <tr>
       <th>Name</th>
       <th>Type</th>
       <th>Attribute</th>
       <th>Description</th>
   </tr>
   <tr>
      <td>ish</td>
      <td>ObservableInput<T></td>
      <td></td>
      <td>a Promise, an Observable-like, an Array, an iterable or an array-like object</td>
   </tr>
   <tr>
     <td>scheduler</td>
     <td>Scheduler<T></td>
     <td>可选</td>
     <td>控制器</td>
   </tr>
</table>

#### Return：

Observable

### Example:

```javascript
var Rx = require('rxjs/Rx')

// Converts an array to an Observable
var array = [10, 20, 30];
var result = Rx.Observable.from(array);
result.subscribe(x => console.log(x));

// Results in the following:
// 10 20 30

// Convert an infinite iterable (from a generator) to an Observable
function* generateDoubles(seed) {
  var i = seed;
  while (true) {
    yield i;
    i = 2 * i; // double it
  }
}

var iterator = generateDoubles(3);
var result = Rx.Observable.from(iterator).take(10);
result.subscribe(x => console.log(x));

// Results in the following:
// 3 6 12 24 48 96 192 384 768 1536

```