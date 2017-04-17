import fragment from './fragment'
import before from './before'
export default function prepend (self, el) {
  var _prepend = function (_el) {
    if (!self.firstChild) {
      self.appendChild(_el)
    } else {
      before(self.firstChild, _el)
    }
  }

  if (el instanceof Node) {
    _prepend(el)
  } else if (typeof el === 'string') {
    el = fragment(el)
    if (el) {
      if (Array.isArray(el)) {
        el.forEach(function (_el) {
          _prepend(_el)
        })
      } else {
        _prepend(el)
      }
    }
  }
  return self
}
