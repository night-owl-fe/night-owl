import prop from './prop'
import defaultDisplay from './defaultDisplay'
export default function show (el) {
  el.style.display === "none" && (el.style.display = '')
  if (prop("display") === "none") {
    el.style.display = defaultDisplay(el.nodeName);
  }
}