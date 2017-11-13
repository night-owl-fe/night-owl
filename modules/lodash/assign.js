/**
 * _.assign(object, [sources]),类似Object.assign.
 * 将sources自己的可枚举的属性复制到object, 包括symbol
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
 * => res = obj = {a:1,b:2}
 */

function assign (object, ...sources) {
  if (!object) object = {}
  sources.forEach((item) => {
    if (!item) return
    if (Object.getOwnPropertySymbols(item).length > 0) {
      Object.getOwnPropertySymbols(item).forEach((sItem)=>{
        object[sItem] = item[sItem]
      })
    }
    for (let key in item) {
      if (item.hasOwnProperty(key)) {
        object[key] = item[key]
      }
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
let b = Symbol('bb')
Bar.prototype[b] = 3
const obj = {}
// const res = assign(obj, new Foo, new Bar)
// console.log('array----', assign({a: 1}, [{b: 2}], {a: 2, d: 3}))
// console.log('string---', assign({a: 1}, 'text', {a: 2, d: 3}))
// console.log('number---', assign({a: 1}, 123, {a: 2, d: 3}))
// console.log('null', assign({}, null, {a: 1, d: 3}))
let s = Symbol('ss')
let a = Symbol('aa')
let d = Symbol('dd')
console.log('Symbol----', assign({t: 1}, new Bar, {[s]: 2}, {[a]: 2, [d]: 3, c: 5})) //getOwnPropertySymbols
