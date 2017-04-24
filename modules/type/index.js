const objectProto = Object.prototype
const toString = (obj) => objectProto.toString.call(obj)

export function isNull (obj) {
  return obj === null
}

export function isUndefined (obj) {
  return obj === undefined
}

export function isString (obj) {
  const type = typeof obj
  return type === 'string' || obj instanceof String
}

export function isNumber (obj) {
  const type = typeof obj
  return type === 'number' || obj instanceof Number
}

export function isBoolean (obj) {
  return obj === true || obj === false || obj instanceof Boolean
}

export function isSymbol (obj) {
  const type = typeof obj
  return type === 'symbol' || obj instanceof Symbol
}