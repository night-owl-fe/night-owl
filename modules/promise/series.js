/**
 * 标题 promise 顺序执行
 * 描述
 * 创建日期 2017/6/20 下午2:54
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

function series (tasks) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(tasks)) {
      var result = []
      if (tasks.length === 0) {
        return resolve(result)
      }

      resolve(tasks.reduce(function (promise, task) {
        if (isPromise(task)) {
          return promise.then(() => task).then((a) => {
            result.push(a)
            return result
          })
        } else {
          result.push(task)
          return Promise.resolve(result)
        }
      }, Promise.resolve()))

    } else {
      reject(new Error('Series Methods must be provided an Array'))
    }
  })
}

function isFunction (val) {
  return typeof val === 'function'
}

function isPromise (val) {
  return val instanceof Promise
}

var arr = [new Promise((resolve, reject) => {
  console.log('1')
  reject('---->>>>>>>>1')
}), new Promise((resolve, reject) => {
  console.log('2')
  resolve('---->>>>>>>>2')
}), Promise.resolve(4)]

series(arr).then((res) => {
  console.log('OK---->', res)
}).catch((e) => {
  console.log('err---->|', e)
})

Promise.all(arr).then((res) => {
  console.log('OK====', res)
}).catch((e) => {
  console.log('err====|', e)
})
