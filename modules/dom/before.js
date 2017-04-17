import fragment from './fragment'

export default function before (self, el) {
  if (el instanceof Node) {
    self.parentNode.insertBefore(el, self)
  } else if (typeof el === 'string') {
    el = fragment(el)

    if (el) {
      if (Object.isArray(el)) {
        el.forEach(function (_el) {
          self.parentNode.insertBefore(_el, self)
        })
      } else {
        self.parentNode.insertBefore(el, self)
      }
    }
  }
  return self
}