### bindCallback
public static bindCallback(func: function, selector: function, scheduler: Scheduler): function(...params: *): Observable

将以回调函数为API的函数转换为Observable。

> func(x, callback) --> bindCallback(func) --> g(x) --> Observable

bindCallback并不是一个operator， 因为他的输入和输出是不可以被观察的，他的输入是一个带有参数的函数，而且
这些参数的最后一个必须是回调函数，当执行完毕时供func调用。

bindCallback的返回值也是一个函数，这个函数和func有一样的参数，除了没有最后的回调函数。调用这个函数返回一个Observable
当func被调用时，传递一个参数，那Observable就触发一个值，如果多个，就触发一个参数组成的数组

有一点非常重要，输入函数是懒执行的，也就是说，只有当最终返回的Observable被订阅时，才被调用。这就意味着，当发送
ajax请求时，每次被订阅都发送新的请求，而不是之前的。

参数selector：
可以传递给bindObservable一个selector函数，这个函数对回调函数的返回值进行处理，他的返回值将取代回调函数的返回值供Observable的
观察者使用。selector函数像一个预处理器，在默认情况下（用户的selector为null），当回调函数有一个值时，就直接返回这个值，当有多个值是，将其
处理成一个数组返回

参数scheduler：
用来控制回调函数何时被调用，默认是同步的，通过使用Scheduler.async来实现异步调用,在某种意义上,最好总是使用异步，
来避免可怕的Zalgo

Note：
func的回调函数如果执行多次，也只会取第一次调用的值，接着就执行完成函数了。后面如果还有调用也是无效的，不会产生数据流。
如果func需要一个上下文context（函数中需要this），简单通过bindObservable.call(context)就可以了
如果func的回调函数是一个"node style"，就是第一个参数是error，请使用bindNodeCallback

#### Params:

<table>
   <tr>
       <th>Name</th>
       <th>Type</th>
       <th>Attribute</th>
       <th>Description</th>
   </tr>
   <tr>
      <td>func</td>
      <td>function</td>
      <td></td>
      <td>最后一个参数必须是回调函数</td>
   </tr>
   <tr>
     <td>selector</td>
     <td>function</td>
     <td>可选</td>
     <td>对回调函数的参数进行处理，映射出一个值给输出流</td>
   </tr>
   <tr>
     <td>scheduler</td>
     <td>[Scheduler](http://reactivex.io/rxjs/class/es6/Scheduler.js~Scheduler.html)</td>
     <td>可选</td>
     <td>回调函数的调度器</td>
   </tr>
</table>

#### Return：
function(...params: *): Observable 
返回值是一个函数，这个函数的返回值是Observable，这个函数的参数传递给原函数

### Example:

```javascript
var Rx = require('rxjs/Rx')

// Convert ajax to an Observable API
// Suppose we have jQuery.getJSON('/my/url', callback)
var jQuery = {
  name: 'jQuery',
  getJSON (url, cb) {
    console.log('-->')
    setTimeout(() => {
      cb(this.name + ' : ' + url)
    }, 1000)
  }
}

var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
var result = getJSONAsObservable.call(jQuery, '/my/url');
result.subscribe(x => console.log(x), e => console.error(e));
var result2 = getJSONAsObservable.call(jQuery, '/my/url2');
result2.subscribe(x => console.log(x), e => console.error(e));

// Receive array of arguments passed to callback
function someFunction (a, b, c, cb) {
  cb(a, b, c, 'd')
}

var boundSomeFunction = Rx.Observable.bindCallback(someFunction);

var stream$ = boundSomeFunction(5, 'some string', { someProperty: 'someValue' })

stream$.subscribe(values => {
  console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
});

// Use bindCallback with selector function
var boundSomeFunction = Rx.Observable.bindCallback(someFunction, (a, b, c, d) => a + b + c + d);
var stream$ = boundSomeFunction('a', 'b', 'c')
stream$.subscribe(value => {
  console.log(value) // 'abcd'
});

// Compare behaviour with and without async Scheduler

function iCallMyCallbackSynchronously (cb) {
  console.log('[async]', 'cb')
  cb();
  // 这次执行无效
  cb();
}

const boundSyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously);
const boundAsyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously, null, Rx.Scheduler.async);

boundSyncFn().subscribe(() => console.log('[async]', 'I was sync!'));
boundAsyncFn().subscribe(() => console.log('[async]', 'I was async!'));
console.log('[async]', 'This happened...');

// Logs:
// I was sync!
// This happened...
// I was async!

```