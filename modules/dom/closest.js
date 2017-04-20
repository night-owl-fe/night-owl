import { isDocument } from './util'

export default function closest (el, selector, context) {
  if (!selector || el === selector) return el
  context = context || document
  let parents
  if (typeof selector === 'string') {
    parents = [].slice.call(context.querySelectorAll(selector))
  }
  if (!parents || !parents.length) return
  let parent = el.parentNode
  let target
  while (parent && !isDocument(parent)) {
    if (parents.indexOf(parent) === -1) {
      parent = el.parentNode
    } else {
      target = parent
      parent = null
    }
  }
  return target
}