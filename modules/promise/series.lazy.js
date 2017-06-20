/**
 * 标题 promise 顺序懒执行
 * 描述
 * 创建日期 2017/6/20 下午2:54
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

function series (tasks) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(tasks)) {
      var result = []
      var i = 0
      var length = tasks.length
      if (length === 0) {
        return resolve(result)
      }

      function run () {
        var task = tasks[i]
        Promise.resolve(task()).then((res) => {
          result[i] = res
          i++
          if (i < length) {
            run()
          } else {
            resolve(result)
          }
        }).catch(reject)
      }

      run()
    } else {
      reject(new Error('Series Methods must be provided an Array'))
    }
  })
}

var arr = [() => {
  return new Promise((resolve, reject) => {
    console.log('1')
    resolve('---->>>>>>>>1')
  })
}, () => {
  return new Promise((resolve, reject) => {
    console.log('2')
    resolve('---->>>>>>>>2')
  })
}, () => {
  return new Promise((resolve, reject) => {
    console.log('3')
    reject('---->>>>>>>>3')
  })
}]

series(arr).then((res) => {
  console.log('OK---->', res)
}).catch((e) => {
  console.log('err---->|', e)
})
