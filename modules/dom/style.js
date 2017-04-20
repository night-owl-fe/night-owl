export default function getComputedStyle (el, prop) {
  return window.getComputedStyle(el, '').getPropertyValue(prop)
}
