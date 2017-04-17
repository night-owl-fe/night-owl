import fragment from './fragment'
import before from './before'
export default function after (self, el) {

  var _after = function (_el) {
    if (self.nextSibling) {
      before(self.nextSibling, _el)
    } else {
      self.parentNode.appendChild(_el)
    }
  }
  if (el instanceof Node) {
    _after(el)
  } else if (typeof el === 'string') {
    el = fragment(el)
    if (el) {
      if (Array.isArray(el)) {
        el.forEach(function (_el) {
          _after(_el)
        })
      } else {
        _after(el)
      }
    }
  }

  return self
}