var State = require('./state')
class Watcher {
  constructor (fn, callback, options) {
    this._getter = fn
    this._callback = callback
  }

  get value () {
    State.target = this
    return this._getter()
  }

  run () {
    this._callback(this.value)
  }
}

module.exports = Watcher