/**
 * 标题 单例模式
 * 描述
 * 特点: 每个类只有一个实例,在获取实例才初始化
 * 区分类的静态实例和单例模式很重要：
 * 尽管单例模式可以被实现成一个静态实例，但是单例可以懒构造，在真正用到之前，单例模式不需要分配资源或者内存。
 * 创建日期 17/3/28 下午3:42
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

function FooSingleton () {

}

function BasicSingleton () {

}

let mySingleton = function () {
  let instance

  function privateMethod () {}

  let privateRandomNumber = Math.random()

  function init () {

    return {

      // 共有方法和变量
      publicMethod () {
        privateMethod()
        return 'publicMethod'
      },

      publicProperty: "I am also public",

      getRandomNumber () {
        return privateRandomNumber
      }

    }
  }

  return {
    getInstance: function () {

      if (!instance) {
        instance = init()
      }

      return instance
    }
  }
}()

module.exports = {
  getInstance (foo) {
    if (this._instance == null) {
      if (foo) {
        this._instance = new FooSingleton();
      } else {
        this._instance = new BasicSingleton();
      }
    }
    return this._instance;
  },
  mySingleton
}