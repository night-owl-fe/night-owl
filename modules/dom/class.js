// 检测是否支持classList
var isSupportClassList = !!document.body.classList

export function hasClass (el, name) {
  if (!name) return false
  if (isSupportClassList) {
    return el.classList.contains(name)
  } else {
    return el.className.indexOf(name) > -1
  }
}

export function addClass (el, name) {
  if (!name) return false
  if (isSupportClassList) {
    el.classList.add(name)
  } else {
    if (!('className' in el)) return el
    if (!hasClass(el, name)) {
      el.className = el.className + ' ' + name
    }
  }
  return el
}

export function removeClass (el, name) {
  if (!name) return false
  if (isSupportClassList) {
    el.classList.remove(name)
  } else {
    if (!('className' in el)) return el
    if (hasClass(el, name)) {
      el.className = el.className.replace(name, '')
    }
  }
  return el
}

export function toggleClass (el, name) {
  if (!name) return false
  if (isSupportClassList) {
    el.classList.toggle(name)
  } else {
    if (!('className' in el)) return el
    hasClass(el, name) ? removeClass(el, name) : addClass(el, name)
  }
  return el
}