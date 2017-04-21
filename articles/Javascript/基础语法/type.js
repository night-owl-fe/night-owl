/**
 * 判断一个数据的类型，可以通过typeof判断其基本类型,对于大多引用类型，无法判断
 * 最直接的方法是通过Object.prototype.toString.call(obj)判断其返回值
 *
 *
 */

const objectProto = Object.prototype
const toString = (obj) => objectProto.toString.call(obj)