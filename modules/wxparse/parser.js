const parseWxml = require('./wxml-parser')

const curlyBracesTag = /^(.*){{([^}]*)}}(.*)$/
const wx2vueTagMap = {
  block: 'template'
}

function parser (wxml, options = {}) {
  let results = ""
  parseWxml(wxml, {
    start: function (tag, attrs, unary) {
      tag = processTag(tag)
      results += '<wx-' + tag
      results += processAttrs(attrs)
      results += unary ? '/>' : '>'
    },
    end: function (tag) {
      tag = processTag(tag)
      results += '</wx-' + tag + '>'
    },
    chars: function (text) {
      results += text
    },
    comment: function (text) {
      results += "<!--" + text + "-->"
    }
  })

  return results
}

function processTag (tag) {
  return wx2vueTagMap[tag] ? wx2vueTagMap[tag] : tag
}

function processAttrs (attrs) {
  var forAttr, forItemAttr, forIndexAttr, forKeyAttr, res = ''
  for (var attr of attrs) {
    switch (attr.name) {
      case 'wx:for':
        forAttr = attr
        break
      case 'wx:for-item':
        forItemAttr = attr
        break
      case 'wx:for-index':
        forIndexAttr = attr
        break
      case 'wx:key':
        forKeyAttr = attr
        break
      case 'wx:if':
        res += ` v-if="${removeCurlyBraces(attr.escapedValue)}"`
        break
      case 'wx:else':
        res += ` v-else`
        break
      case 'wx:elif':
        res += ` v-else-if="${removeCurlyBraces(attr.escapedValue)}"`
        break
      case 'hidden':
        res += ` v-show="${removeCurlyBraces(attr.escapedValue)}"`
        break
      case 'class':
        if (attr.escapedValue) {
          let val = processClassAttr(attr.escapedValue)
          res += val === attr.escapedValue ? ` ${attr.name}="${val}"` : ` :${attr.name}="[${val}]"`
        }
        break
      default:
        if (attr.escapedValue) {
          let val = replaceCurlyBraces(attr.escapedValue)
          res += val === attr.escapedValue ? ` ${attr.name}="${val}"` : ` :${attr.name}="${val}"`
        } else {
          res += ` ${attr.name}`
        }
    }
  }

  if (forAttr) {
    var item = forItemAttr ? forItemAttr.escapedValue : 'item'
    var index = forIndexAttr ? forIndexAttr.escapedValue : 'index'
    res += ` v-for="(${item}, ${index}) in ${removeCurlyBraces(forAttr.escapedValue)}"`
    if (forKeyAttr) {
      var keyVal = forKeyAttr.escapedValue === '*this' ? item : item + '.' + forKeyAttr.escapedValue
      res += ` :key="${keyVal}"`
    }
  }

  return res
}

function removeCurlyBraces (str) {
  return str.replace(/[{}]/g, '')
}

function replaceCurlyBraces (str) {
  if (!str) return ''
  const res = curlyBracesTag.exec(str)
  if (!res || !res[2]) return str
  let atrr = '(' + res[2].trim() + ')'
  if (res[1]) {
    atrr = "'" + res[1].trim() + "' + " + atrr
  }
  if (res[3]) {
    atrr = atrr + " + '" + res[3].trim() + "'"
  }

  return atrr
}

function processClassAttr (str) {
  if (!str) return ''
  const res = curlyBracesTag.exec(str)
  if (!res || !res[2]) return str

  let arr = []
  if (res[1]) {
    arr = res[1].trim().split(/\s+/).map(clazz => "'" + clazz + "'")
  }

  arr.push(res[2])

  if (res[3]) {
    arr = arr.concat(res[1].trim().split(/\s+/).map(clazz => "'" + clazz + "'"))
  }

  return arr
}

module.exports = parser