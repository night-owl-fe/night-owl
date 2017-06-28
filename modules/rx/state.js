var _ = require('lodash')

class State {
  constructor (initialState) {
    this.propsMap = {}
    let state = _.cloneDeep(initialState)
    if (!_.isPlainObject(state)) {
      state = Object.create(null)
    }
    const _this = this
    return new Proxy(state, {
      get (target, property, receiver) {
        _this.addDep(property)
        return target[property]
      },

      set (target, property, value) {
        target[property] = value
        _this.notify(property)
      }
    })
  }

  addDep (key) {
    if (State.target) {
      const set = this.propsMap.hasOwnProperty(key) ? this.propsMap[key] : new Set()
      set.add(State.target)
      this.propsMap[key] = set
    }
  }

  notify (key) {
    const set = this.propsMap[key]
    if (!set) return
    for (let watcher of set.values()) {
      watcher.run()
    }
  }
}

State.target = null

module.exports = State