let cache = {}
let uid = 1

// 绑定事件
export function on (el, event, selector, callback, capture) {
  let _uid = el._uid = el._uid || uid++
  let set = (cache[_uid] || (cache[_uid] = {}))
  let handlers = set[event] ? set[event] : []
  handlers.push(callback)
  el.addEventListener(event, callback, !!capture)
}

// 卸载事件
export function off (el, event, callback) {
  if (typeof callback === 'function' && callback.name) {
    el.removeEventListener(event, callback);
  } else if (el._uid && cache[el._uid]) {
    let set = cache[el._uid]
    let keys = []
    if (event) {
      if (set[event]) {
        keys.push(event)
      }
    } else {
      keys = Object.keys(set)
    }

    keys.forEach(function (key) {
      set[key].forEach(function (cb) {
        el.removeEventListener(event, cb)
      })
      delete set[key]
    })
  }
}

export function one () {

}

export function trigger () {

}

export function delegate () {

}

export function undelegate () {

}