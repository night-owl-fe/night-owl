export default function removeAttr (el, name) {
  if (el.nodeType === 1) {
    el.removeAttribute(name)
  }
}