const _ = require('lodash')

function Foo () { this.a = 1 }
function Bar () { this.b = 2}
Foo.prototype.d = 3
Bar.prototype.e = 3


console.log('正常情况-----', _.assign({}, new Foo, new Bar))
console.log('存在数组的情况----', _.assign({a: 1}, [{b: 2}], {a: 2, d: 3}))
console.log('存在数组的情况----', _.assign([{a: 1}], [{b: 2}], {a: 2, d: 3}))
console.log('存在字符串的情况----', _.assign({a: 1}, 'text', {a: 2, d: 3}))
console.log('存在数字的情况---', _.assign({a: 1}, 123, {a: 2, d: 3}))
console.log('存在null的情况', _.assign(null, {a: 2, d: 3}))


let testSymbol = Symbol('Symbol')
Bar.prototype[testSymbol] = 'SymbolPro'
let testSymbol1 = Symbol('Symbol1')
let testSymbol2 = Symbol('Symbol2')
let testSymbol3 = Symbol('Symbol3')
let testSymbol4 = Symbol('Symbol4')
console.log('存在ES6语法Symbol的情况-----', _.assign({[testSymbol4]: 'Symbol4'}, new Bar, {[testSymbol3]: 'Symbol3'}, {[testSymbol1]: 'Symbol1', [testSymbol2]: 'Symbol2', c: 5}))