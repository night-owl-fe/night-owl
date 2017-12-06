import $ from 'balajs'
import 'element-closest'
import objectAssign from 'object-assign'
import append from './append'
import remove from './remove'
import show from './show'
import hide from './hide'
import html from './html'
import css from './css'
import attr from './attr'
import * as classMethod from './class'

objectAssign($.fn, {
  append (child) {
    this.forEach(parent => {
      append(parent, child)
    })
    return this
  },

  remove () {
    this.forEach(el => {
      remove(el)
    })
    this.length = 0
    return this
  },

  find (selector) {
    return $(selector, this)
  },

  eq (index) {
    return $(this[index])
  },

  show () {
    this.forEach(el => {
      show(el)
    })
    return this
  },

  hide () {
    this.forEach(el => {
      hide(el)
    })
    return this
  },

  on (event, selector, handler) {
    const isDelegate = typeof selector === 'string' && typeof handler === 'function';
    if (!isDelegate) {
      handler = selector
    }
    this.forEach(($element) => {
      event.split(' ').forEach((event) => {
        $element.addEventListener(event, function (evt) {
          if (isDelegate) {
            if (this.contains(evt.target.closest(selector))) {
              handler.call(evt.target, evt)
            }
          } else {
            handler.call(this, evt)
          }
        })
      })
    })
    return this
  },

  off (event, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector
      selector = null
    }

    this.forEach(($element) => {
      event.split(' ').forEach((event) => {
        if (typeof selector === 'string') {
          $(selector, $element).forEach((el) => {
            el.removeEventListener(event, handler)
          })
        } else {
          $element.removeEventListener(event, handler)
        }
      })
    })
    return this
  }
})

// addClass,removeClass,hasClass,toggleClass
Object.keys(classMethod).forEach(method => {
  $.fn[method] = function (className) {
    this.forEach(el => {
      classMethod[method](el, className)
    })
    return this
  }
})

const miscOptions = {
  html, css, attr
}
Object.keys(miscOptions).forEach(method => {
  $.fn[method] = function (...args) {
    const res = this.map(el => miscOptions[method](el, ...args))
    return res[0] !== this[0]
      ? res.length === 1
        ? res[0]
        : res
      : this
  }
})

objectAssign($, {
  extend: objectAssign,
  noop: () => {},
  render: function (tpl, data) {
    const code = 'var p=[];with(this){p.push(\'' +
      tpl
        .replace(/[\r\t\n]/g, ' ')
        .split('<%').join('\t')
        .replace(/((^|%>)[^\t]*)'/g, '$1\r')
        .replace(/\t=(.*?)%>/g, '\',$1,\'')
        .split('\t').join('\');')
        .split('%>').join('p.push(\'')
        .split('\r').join('\\\'')
      + '\');}return p.join(\'\');';
    return new Function(code).apply(data);
  }
})

export default $