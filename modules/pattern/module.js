/**
 * 标题 模块化模式
 * 描述
 * 创建日期 17/3/28 下午3:42
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

// 通过对象字面值组织代码是一种简单有效的方式
let myModule = {
  config: {
    name: 'myModule'
  },

  init () {
    this.initDomEvent()
  },

  initDomEvent () {
  },

  setConfig (config) {
    this.config = config
  }
}

// 这是对对象字面值的改进, 对象字面值会暴漏出所有属性
// 在ES6之前只有函数作用域, 通过立即执行函数来实现局部变量
let myModule2 = function (mym) {
  let counter = 0

  return {
    mym: mym,

    incrementCounter () {
      return counter++
    },

    getCounter () {
      return counter
    }
  }
}(myModule)

module.exports = myModule2