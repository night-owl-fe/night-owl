/**
 * 标题 发布/订阅模式或中介者
 * 描述
 * 创建日期 17/3/30 下午4:24
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

class Event {
  constructor (cxt) {
    this._events = {}
    this.cxt = cxt
  }

  /**
   * 绑定一个事件
   * @param name 只能是字符串
   * @param cb
   * @param cxt
   * @returns {Event}
   */
  on (name, cb, cxt) {
    eventsOnApi(this, name, cb, cxt, false)
    return this
  }

  once (name, cb, cxt) {
    eventsOnApi(this, name, cb, cxt, true)
    return this
  }

  /**
   * 卸载某个事件
   * @param name
   * @returns {Event}
   */
  off (name, cb, cxt) {
    var events = eventsApi(this, name, cb, cxt)
    for (var key in events) {
      var e = this._events[key]
      events[key].slice(0).forEach(function (item) {
        e.splice(e.indexOf(item), 1)
      })
    }

    return this
  }

  /**
   * 暂停某个事件,用法同off
   * @param name
   * @returns {Event}
   */
  pause (name, cb, cxt) {
    eventsPauseApi(this, name, cb, cxt, true)
    return this
  }

  /**
   * 恢复某个事件,用法同off
   * @param name
   * @returns {Event}
   */
  resume (name, cb, cxt) {
    eventsPauseApi(this, name, cb, cxt, false)
    return this
  }

  /**
   * 触发某个事件
   * @param name
   * @returns {Event}
   */
  emit (name) {
    var self = this
    if (!name || typeof name !== 'string') return this
    var len = arguments.length
    var args = [], i = 1
    while (i < len) {
      args.push(arguments[i++])
    }

    name.split(/\s/).forEach(function (ename) {
      if (ename && self._events[ename]) {
        self._events[ename].forEach(function (handle) {
          if (!handle.pause && !(handle.i === 1 && handle.once)) {
            handle.cb.apply(handle.cxt, args)
            handle.i++
          }
        })
      }
    })

    return this
  }
}

// off,pause,resume通用方法
function eventsApi (self, name, cb, cxt) {
  var events = {}

  for (var key in self._events) {
    events[key] = self._events[key]
  }

  if (name) {
    events = {}
    name.split(/\s/).forEach(function (ename) {
      if (ename && self._events[ename]) {
        events[ename] = self._events[ename]
      }
    })
  }

  var keys = Object.keys(events)
  if (keys.length === 0) return events

  if (cb && typeof cb === 'function') {
    keys.forEach(function (key) {
      events[key] = events[key].filter(function (event) {
        return event.cb == cb
      })
    })
  }

  if (cxt) {
    keys.forEach(function (key) {
      events[key] = events[key].filter(function (event) {
        return event.cxt == cxt
      })
    })
  }

  return events
}

// 暂停,恢复通用方法
function eventsPauseApi (self, name, cb, cxt, val) {
  var events = eventsApi(self, name, cb, cxt)
  for (var key in events) {
    events[key].forEach(function (item) {
      item.pause = val
    })
  }
}

// on,once通用方法
function eventsOnApi (self, name, cb, cxt, once) {
  if (!name || typeof cb != 'function' || typeof name !== 'string') return this
  name.split(/\s/).forEach(function (ename) {
    if (!ename) return
    var handlers = self._events[ename] || []
    handlers.push({
      cb: cb,
      cxt: cxt || self.cxt || self,
      pause: false,
      i: 0,
      once: once
    })
    self._events[ename] = handlers
  })
}

module.exports = Event

