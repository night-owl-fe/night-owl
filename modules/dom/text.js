export default function text (el, text) {
  return text === undefined
    ? el.textContent
    : el.textContent = text
}
