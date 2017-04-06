/**
 * 标题
 * 描述
 * 创建日期 17/4/5 下午10:27
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

class Workflow extends Function {
  constructor (...args) {
    super(...args)
  }

  before (fn) {
    const _this = this
    return function () {
      fn.call(_this)
      _this()
    }
  }

  after (fn) {
    const _this = this
    return function () {
      _this()
      fn.call(_this)
    }
  }
}

Function.prototype.before = function (fn) {
  return (ctx) => {
    let res = fn.call(null, ctx)
    if (res) {
      this.call(null, res)
    }
    return res
  }
}

Function.prototype.after = function (fn) {
  return (ctx) => {
    let res = this.call(null, ctx)
    if (res) {
      res = fn.call(null, res)
    }
    return res
  }
}

function foo1 (res) {
  console.log('--->foo1', res.name)
  res.name = 'foo1'
  return res
}

function foo2 (res) {
  console.log('--->foo2', res.name)
  res.name = 'foo2'
  return res
}

function foo3 (res) {
  console.log('--->foo3', res.name)
  res.name = 'foo3'
  return {name: 'qqqq'}
}

function foo4 (res) {
  console.log('--->foo4', res.name)
  res.name = 'foo4'
  return {name: 'gogo'}
}

function han (res) {
  console.log('--->han ', res.name)
  res.name = 'han'
  return res
}

let res = han.before(foo2).before(foo1).after(foo3).after(foo4)({name: 'main'})
console.log(res)
// han.before(foo2).after(foo3).before(foo1).after(foo4)()

