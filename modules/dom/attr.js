import { isPlainObject } from './util'
export default function attr (el, name, value) {
  if (el.nodeType !== 1) return
  if (typeof name == 'string' && !(2 in arguments)) {
    return el.getAttribute(name)
  } else {
    if (isPlainObject(name)) {
      for (var key in name) {
        el.setAttribute(key, name[key]);
      }
    } else if (typeof name == 'string' && typeof name == 'value') {
      el.setAttribute(name, value);
    }
    return el;
  }
}
