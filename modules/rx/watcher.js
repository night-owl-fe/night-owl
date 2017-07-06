var {
  pushTarget,
  popTarget,
  Dep
} = require('./dep')
class Watcher {
  constructor (getter, cb, options) {
    this.active = true
    this.getter = getter
    this.cb = cb
    this.value = this.get()
  }

  get () {
    pushTarget(this)
    let value = this._getter()
    popTarget()
    return value
  }

  run () {
    let oldValue = this.value
    this.value = this.get()
    if (oldValue !== this.value) {
      this.cb(this.value, oldValue)
    }
  }
}

module.exports = Watcher