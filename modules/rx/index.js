var Watcher = require('./watcher')
var State = require('./state')

const state = new State({
  name: 'wanglei',
  age: 18,
  man: {
    country: 'China'
  }
})

const watcher = new Watcher(() => {
  return state.name + ": " + state.age + ": " + state.man.country
}, (val) => {
  console.log('----->>', val)
})

state.man.country = 'America'
// state.name = 'wanglei2'
// state.name = 'wanglei2'
state.age = 19
