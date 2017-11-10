const _ = require('lodash')

function Foo () { this.a = 1 }
function Bar () { this.b = 2}
Foo.prototype.d = 3
Bar.prototype.e = 3
const obj = {}
const res = _.assign(obj, new Foo, new Bar)

console.log(obj)
console.log(res === obj)