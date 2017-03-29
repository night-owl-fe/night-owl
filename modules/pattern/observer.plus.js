/**
 * 标题 观察者模式
 *
 * 定义
 * One or more observers are interested in the state of a subject and register their interest with the subject by
 * attaching themselves. When something changes in our subject that the observer may be interested in, a notify message
 * is sent which calls the update method in each observer. When the observer is no longer interested in the subject's
 * state, they can simply detach themselves
 *
 * 创建日期 17/3/28
 * 下午7:04
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

class Observer {
  constructor (name) {
    this.x = 1
    this.name = name
  }

  update () {
    this.x++
    console.log(this.name, 'update', this.x)
  }
}

class Subject {
  constructor () {
    this.stack = new Set()
  }

  add (observer) {
    this.stack.add(observer)
    return this
  }

  remove (observer) {
    return this.stack.delete(observer)
  }

  clear () {
    this.stack.clear()
  }

  notify () {
    this.stack.forEach((observer) => {
      observer.update()
    })
  }
}

