// 观察者模式：观察者模式和发布订阅模式一个区别就是：一般来说发布订阅模式是集中调度，状态统一维护，一个类就搞定了
// 订阅者一般是函数；观察者模式一般有两个对象，每个对象都有自己的状态，状态可以有任意一方维护
// 如在observer.js中状态是由Observable来维护，下面是Observer维护

// observer和Observable并无关联只是提供一个绑定过程
class Observable {
  subscribe (observer) {
    observer.add(this._subscribe(observer))
    return observer
  }

  // 用于继承重写
  _subscribe (observer) {
    // 对observer操作
    return function () {
      // 释放资源
    }
  }

  // 去掉unsubscribe，这个状态交给Observer来维护
  // unsubscribe (observer ?: Observer) {}
}

let uid = 1
class Observer {
  constructor () {
    this._uid = uid++
    this._set = new _Set()
    this.observers = []
  }

  update (value) {

  }

  unsubscribe () {
    this._unsubscribe()
    const observers = this.observers
    const length = observers.length
    for (let i = 0; i < length; i++) {
      observers[i].unsubscribe()
    }
    this._set.clear()
  }

  add (observer) {
    const uid = observer._uid
    if (uid && !this._set.has(uid)) {
      this.observers.push(observer)
    }
  }

  remove (observer) {
    const uid = observer._uid
    if (uid && this._set.has(uid)) {
      const observers = this.observers
      observers.splice(observers.indexOf(observer), 1)
      this._set.delete(uid)
    }
  }

  // 用于继承重写
  _unsubscribe () {}
}

class _Set {
  constructor () {
    this.set = Object.create(null)
  }

  add (key) {
    this.set[key] = true
  }

  delete (key) {
    if (this.has(key)) {
      delete this.set[key]
    }
  }

  has (key) {
    return this.set[key] === true
  }

  clear () {
    this.set = Object.create(null)
  }
}

const observable = new Observable()
const observer = new Observer()

observable.subscribe(observer)
