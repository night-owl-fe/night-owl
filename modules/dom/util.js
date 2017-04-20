export function isObject (obj) {
  var type = typeof obj
  return type === 'function' || type === 'object' && !!obj
};

export function isWindow (obj) {
  return obj != null && obj == obj.window
}

// 是否是简单的对象，简单说就是obj = {}或new Object()类似这样的声明方式
export function isPlainObject (obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

export function isDocument (obj) {
  return obj != null && obj.nodeType == obj.DOCUMENT_NODE
}

// my-name ==> myName
export function camelize (str) {
  return str.replace(/-+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : ''
  })
}

// myName ==> my-name
export function dasherize (str) {
  return str.replace(/::/g, '/')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .replace(/_/g, '-')
            .toLowerCase()
}

// 一些可以不需要单位的css属性，其中line-height的数值表示当前字体的大小的倍数
export let cssNumber = {
  'column-count': 1,
  'columns': 1,
  'font-weight': 1,
  'line-height': 1,
  'opacity': 1,
  'z-index': 1,
  'zoom': 1
};

// 为一些元素添加PX单位
export function maybeAddPx (name, value) {
  return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
}