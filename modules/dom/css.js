import prop from './prop'
import {
  camelize,
  dasherize,
  maybeAddPx
} from './util'

/**
 * 获取color：css(el,'color')
 * 获取color和font-size：css(el,['color','font-size'])
 * 删除color：css(el,'color', false)
 * 设置color：css(el,'color', 'red')
 * 设置color和font-size：css(el, {"color":"yellow","font-size":"200%"})
 * @param el
 * @param property
 * @param value
 * @returns {*}
 */
export default function css (el, property, value) {
  // 读取css属性，默认先从style读取，没有才从prop读取
  if (arguments.length < 3) {
    if (typeof property === 'string') {
      return el.style[camelize(property)] || prop(property)
    } else if (Array.isArray(property)) {
      var props = {}
      property.forEach(function (prop) {
        props[prop] = (el.style[camelize(prop)] || el.prop(prop))
      })
      return props
    }
  }

  var css = ''
  if (typeof property == 'string') {
    css = removeOrAddCssText(el, property, value)
  } else {
    for (key in property) {
      css += removeOrAddCssText(el, key, property[key])
    }
  }

  if (css) {
    el.style.cssText += ';' + css;
  }
  return el;
}

function removeOrAddCssText (el, property, value) {
  if (!value && value !== 0) {
    el.style.removeProperty(dasherize(property))
    return ''
  } else {
    return dasherize(property) + ":" + maybeAddPx(property, value)
  }
}