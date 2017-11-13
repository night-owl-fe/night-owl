const _ = require('lodash')

function Foo () { this.a = 1 }
function Bar () { this.b = 2}
Foo.prototype.d = 3
Bar.prototype.e = 3
const obj = {}
const res = _.assign(obj, new Foo, new Bar)

// console.log(obj)
// console.log(res === obj)

console.log('array', _.assign({a: 1}, [{b: 2}], {a: 2, d: 3}))
console.log('string---', _.assign({a: 1}, 'text', {a: 2, d: 3}))
console.log('number---', _.assign({a: 1}, 123, {a: 2, d: 3}))
console.log('null', _.assign(null, {a: 2, d: 3}))
