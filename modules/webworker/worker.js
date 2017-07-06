// 参考资料 http://javascript.ruanyifeng.com/htmlapi/webworker.html
// 参考资料 http://www.alloyteam.com/2015/11/deep-in-web-worker/
const Worker = window.Worker

function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

const hasWorker = Worker != null && isNative(Ctor)

if (!hasWorker) {
  console.log('浏览器不支持Worker')
}

const worker = new Worker('./subworker.js')

// 监听子进程的消息
worker.addEventListener('message', function (e) {
  console.log(e.data)
}, false)

// 通知子进程
worker.postMessage({
  type: 'init',
  payload: {}
})

// 监听子进程的错误
worker.addEventListener('error', function(event) {
  console.log(event);
  // 关闭子进程
  worker.terminate();
});