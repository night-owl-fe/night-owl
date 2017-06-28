var Watcher = require('./watcher')
var State = require('./state')

const state = new State({
  name: 'wanglei',
  age: 18
})

const watcher = new Watcher(() => {
  return state.name + ": " + state.age
}, (val) => {
  console.log('----->>', val)
})

state.name = 'wanglei2'
state.name = 'wanglei2'