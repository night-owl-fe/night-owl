var _ = require('lodash')
var Dep = require('./dep')

class State {
  constructor (initialState) {
    this.propsMap = {}
    let state = _.cloneDeep(initialState)
    if (!_.isObject(state)) {
      state = Object.create(null)
    }
    this.data = state
    const _this = this

    return new Proxy(state, {
      get (target, property) {
        var res = target[property]
        return res
      },

      set (target, property, value) {
        target[property] = value
        _this.notify(property)
      }
    })
  }
}

State.target = null

module.exports = State