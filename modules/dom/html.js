export default function html (el, html) {
  if (html === undefined) return el.innerHTML
  el.innerHTML = html
  return el
}
