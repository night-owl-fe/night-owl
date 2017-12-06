/**
 * _.assignIn(object, [sources]).
 * 将sources自己的可枚举的属性以及继承的属性复制到object, 包括symbol
 *
 * @example1
 * assign({a:1},{b:2},{a:2,d:3})
 * => {a:2,b:2,d:3}
 *
 * @example2
 * function Foo () { this.a = 1 }
 * function Bar () { this.b = 2}
 * Foo.prototype.d = 3
 * Bar.prototype.e = 3
 * const obj = {}
 * const res = assign(obj, new Foo, new Bar)
 * => res = obj = {a:1,b:2, d:3, d:3}
 */

function assignIn (object, ...sources) {
  if (!object) object = {}
  sources.forEach((item) => {
    console.log(item, '---', Reflect.ownKeys(item))

    if (!item) return
    if (Object.getOwnPropertySymbols(item).length > 0) {
      Object.getOwnPropertySymbols(item).forEach((sItem) => {
        console.log(sItem)
        object[sItem] = item[sItem]
      })
    }
    for (let key in item) {
      // console.log(key)
      object[key] = item[key]
    }
  })
  return object
}

function Foo () {
  this.a = 1
}
function Bar () {
  this.b = 2
}
Foo.prototype.d = 3
Bar.prototype.e = 3

// console.log('正常情况-----', assignIn({}, new Foo, new Bar))

let testSymbol = Symbol('Symbol')
Bar.prototype[testSymbol] = 'Symbolpro'
let testSymbol1 = Symbol('Symbol1')
let testSymbol2 = Symbol('Symbol2')
let testSymbol3 = Symbol('Symbol3')
let testSymbol4 = Symbol('Symbol4')
console.log('存在ES6语法Symbol的情况-----', assignIn({[testSymbol4]: 'Symbol4'}, new Bar, {[testSymbol3]: 'Symbol3'}, {
  [testSymbol1]: 'Symbol1',
  [testSymbol2]: 'Symbol2',
  c: 5
}))
