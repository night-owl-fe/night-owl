/**
 * 给定一个path，获取对象对应的值, 如果没有返回undefined
 * @param obj Object
 * @param path String
 * @returns {*}
 * @example
 * eg1
 * let obj = { a: { b: { c: 'c' } } }
 * valueOf(obj, 'a.b.c') // c
 * valueOf(obj, 'a.b.c.d') // undefined
 * valueOf(obj, 'a.c') // undefined
 */
export function valueOf (obj, path) {
  if (!obj || !path) return obj

  if (path.indexOf('.') === -1) {
    return obj[path]
  }

  const segments = path.split('.')
  for (let i = 0; i < segments.length; i++) {
    if (!obj) return
    obj = obj[segments[i]]
  }
  return obj
}
