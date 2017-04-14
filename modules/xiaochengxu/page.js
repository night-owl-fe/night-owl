let lifecycleHooks = [
  'onLoad',
  'onReady',
  'onShow',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage'
]
// 给Page添加mixins
// mixins具体规则
// data和propsData必须是函数，返回一个普通对象, 两个对象键名冲突时，取后者对象的键值对
// 生命周期有关的会按照自身，混合对象依次调用
// 其他选项 两个对象键名冲突时，取后者对象的键值对
Page.createInstance = function (options) {
  options.data = options.data || {}
  if (Array.isArray(options.mixins)) {
    let mixins = options.mixins
    for (let i = 0, len = mixins.length; i < len; i++) {
      mergeOptions(options, mixins[i])
    }
    delete options.mixins
  }

  for (let i = 0; i < lifecycleHooks.length; i++) {
    let hook = lifecycleHooks[i]
    let handlers = options[hook]
    if (Array.isArray(handlers)) {
      options[hook] = function (...args) {
        for (let j = 0; j < handlers.length; j++) {
          handlers[j].apply(this, args)
        }
      }
    }
  }
  return Page(options)
}

/**
 * 合并Option
 * @param dist 待扩展的option
 * @param src 原option
 */
function mergeOptions (dist, src) {
  let keys = Object.keys(src)
  let key
  for (let i = 0, len = keys.length; i < len; i++) {
    key = keys[i]
    if (key === 'data') {
      extend(dist.data, src[key]())
    } else if (key === 'propsData') {
      extend(dist, src[key]())
    } else if (lifecycleHooks.indexOf(key) > -1) {
      if (dist[key]) {
        if (Array.isArray(dist[key])) {
          dist[key] = dist[key].concat(src[key])
        } else {
          dist[key] = [dist[key], src[key]]
        }
      } else {
        dist[key] = [src[key]]
      }
    } else if (isFunction(src[key])) {
      dist[key] = src[key]
    }
  }
}

function extend (dist, src) {
  let keys = Object.keys(src)
  let key
  for (let i = 0, len = keys.length; i < len; i++) {
    key = keys[i]
    dist[key] = src[key]
  }
}

function isFunction (obj) {
  return typeof obj === 'function'
}
