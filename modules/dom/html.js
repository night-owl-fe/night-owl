export default function html (el, html) {
  return html === undefined
    ? el.innerHTML
    : el.innerHTML = html
}
