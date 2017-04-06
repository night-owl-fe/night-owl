let isObject = (obj) => obj !== null && typeof obj === 'object'

let isLikeArray = (obj) => isObject(obj) && typeof obj.length === 'number'

let isArray = (obj) => Array.isArray(obj)

let isString = (obj) => typeof obj === 'string'

let isFunction = (obj) => typeof obj === 'function'

module.exports = {
  isObject,
  isLikeArray,
  isString,
  isArray,
  isFunction
}