export default function getPropertyValue (el, prop) {
  return window.getComputedStyle(el, '').getPropertyValue(prop)
}
