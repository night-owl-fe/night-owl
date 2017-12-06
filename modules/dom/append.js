import { fragment } from './fragment'
export default function append (self, el) {
  if (el instanceof HTMLElement) {
    self.appendChild(el);
  } else if (typeof el === 'string') {
    el = fragment(el);
    if (el) {
      if (Array.isArray(el)) {
        el.forEach(function (_el) {
          self.appendChild(_el);
        });
      } else {
        self.appendChild(el);
      }
    }
  }
  return self
}
