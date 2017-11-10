/**
 * _.assign(object, [sources]),类似Object.assign.
 * 将sources自己的可枚举的属性复制到object
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

}