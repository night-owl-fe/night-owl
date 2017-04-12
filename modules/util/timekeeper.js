/**
 * 标题 js计时器
 * 描述 精确计算
 * 创建日期 2017/4/12 下午12:29
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

let {animate, cancelAnimation} = require('./animate')

function execAfterTime (fn, time) {
  let startTime = Date.now()
  let run = function () {
    if (Date.now() - startTime >= time) {
      fn()
    } else {
      animate(run)
    }
  }
  run()
}

/**
 * 每隔多长时间执行一次，直到执行count
 * @param fn 执行函数
 * @param time 时间间隔
 * @param count 执行次数
 */
function execEveryTime (fn, time, count) {
  let startTime = Date.now()
  let i = 0
  let run = function () {
    if (Date.now() - startTime >= time) {
      startTime = Date.now()
      fn()
      if (++i < count) {
        animate(run)
      }
    } else {
      animate(run)
    }
  }
  run()
}

execAfterTime(() => {
  console.log('--->')
}, 10000)

let i = 0
execEveryTime(() => {
  console.log('--->', ++i)
}, 1000, 10)
