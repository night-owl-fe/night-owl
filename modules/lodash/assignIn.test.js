const _ = require('lodash')

function Foo () {
  this.a = 1
}
function Bar () {
  this.b = 2
}
Foo.prototype.d = 3
Bar.prototype.e = 3

console.log('正常情况-----', _.assignIn({'a': 0}, new Foo, new Bar, [{b: 2}]))

let testSymbol = Symbol('Symbol')
Bar.prototype[testSymbol] = 'Symbolpro'
let testSymbol1 = Symbol('Symbol1')
let testSymbol2 = Symbol('Symbol2')
let testSymbol3 = Symbol('Symbol3')
let testSymbol4 = Symbol('Symbol4')
console.log('存在ES6语法Symbol的情况-----', _.assignIn({[testSymbol4]: 'Symbol4'}, new Bar, {[testSymbol3]: 'Symbol3'}, {
  [testSymbol1]: 'Symbol1',
  [testSymbol2]: 'Symbol2',
  c: 5
}))