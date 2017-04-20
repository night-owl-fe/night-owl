import closest from './closest'
let cache = {}
let uid = 1

// 绑定事件
export function on (el, event, callback, one, capture) {
  add(el, event, null, callback, one, capture)
}

// 卸载事件
export function off (el, event, callback) {
  remove(el, event, null, callback)
}

export function one (el, event, callback, capture) {
  add(el, event, null, callback, true, capture)
}

export function delegate (el, event, selector, callback, one, capture) {
  add(el, event, selector, callback, one, capture)
}

export function undelegate (el, event, selector, callback) {
  remove(el, event, selector, callback)
}

function add (el, event, selector, callback, one, capture) {
  let _uid = el._uid = el._uid || uid++
  let set = (cache[_uid] || (cache[_uid] = {}))
  let handlers = set[event] ? set[event] : []

  let handler = {
    callback: callback,
    selector: selector
  }
  handler.proxy = function (e) {
    if (selector) {
      let parent = closest(e.target, selector, el)
      if (parent) {
        callback.call(parent, e)
        if (one) {
          off(el, event, callback)
        }
      }
    } else {
      callback.call(parent, e)
      if (one) {
        off(el, event, callback)
      }
    }
  }

  handlers.push(handler)
  el.addEventListener(event, handler.proxy, !!capture)
}

function remove (el, event, selector, callback) {
  let set
  if (el._uid && (set = cache[el._uid])) {
    let keys = []
    if (event) {
      if (set[event]) {
        keys.push(event)
      }
    } else {
      keys = Object.keys(set)
    }

    keys.forEach(function (key) {
      let handlers = set[key]

      for (let i = handlers.length - 1; i >= 0; i--) {
        let handler = handlers[i]
        if (selector) {
          if (selector !== handler.selector) {
            continue
          }
        }

        if (callback) {
          if (callback !== handler.callback) {
            continue
          }
        }

        handlers.splice(i, 1)
        el.removeEventListener(event, handler.proxy)
      }
    })
  } else if (callback && callback.name) {
    el.removeEventListener(event, callback)
  }
}