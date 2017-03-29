const {def} = require('../../util/lang')
const arrayProto = Array.prototype
const arrayKeys = Object.getOwnPropertyNames(arrayProto)
const arrayAgent = Object.create(arrayProto)
const arrayMutators = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

arrayMutators.forEach(function (method) {
  const original = arrayProto[method]
  def(arrayAgent, method, function mutator (...args) {
    let result = original.apply(this, args)
    console.log('----->拦截数组操作')
    return result
  })
})

module.exports = {
  arrayProto,
  arrayKeys,
  arrayAgent
}

const arr = []

arr.__proto__ = arrayAgent

arr.push(1)

console.log(arr.length)