import css from './css'
export default function hide (el) {
  return css(el, "display", "none");
}