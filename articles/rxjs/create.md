### create
public static create(onSubscription: function(observer: Observer): TeardownLogic): Observable

创建一个Observable，当被一个Observer订阅时，执行特殊当函数

> 创建任何你需要的Observable

create能转换一个 onSubscription 生成一个Observable，当Observable被订阅时，
这个函数将被调用，仅有一个 Observer instance 作为参数， onSubscription应该
调用Observers next，error 和 complete方法

调用next将触发一个值给observer，调用complete，结束了，不再做其他任何操作，调用
error将产生一个错误

#### Params:

<table>
   <tr>
       <th>Name</th>
       <th>Type</th>
       <th>Attribute</th>
       <th>Description</th>
   </tr>
   <tr>
      <td>onSubscription</td>
      <td>function</td>
      <td></td>
      <td>一个函数，接受一个Observer参数，能够调用这个参数的next, error, 和 complete</td>
   </tr>
</table>

#### Return：

Observable

### Example:

```javascript
var Rx = require('rxjs/Rx')

var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

observable.subscribe(
  value => console.log(value),
  err => {},
  () => console.log('this is the end')
);

// Logs
// 1
// 2
// 3
// "this is the end"



const observable = Rx.Observable.create((observer) => {
  observer.error('something went really wrong...');
});

observable.subscribe(
  value => console.log(value), // will never be called
  err => console.log(err),
  () => console.log('complete') // will never be called
);

// Logs
// "something went really wrong..."

```