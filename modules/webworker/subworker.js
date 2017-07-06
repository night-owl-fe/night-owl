// self代表子进程
self.addEventListener('message', function (e) {
  const res = e.data
  self.postMessage({
    type: res.type,
    payload: {
      active: true
    }
  })

  if (res.type === 'close') {
    // 关闭子进程自身
    self.close()
  }
}, false)