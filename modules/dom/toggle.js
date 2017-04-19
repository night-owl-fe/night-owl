import show from './show'
import hide from './hide'
import css from './css'
export default function toggle (el, setting) {
  (setting === undefined ? css(el, 'display') === 'none' : setting) ? show(el) : hide(el)
}