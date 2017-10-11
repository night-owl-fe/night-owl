var { HTMLParser } = require('./simplehtmlparser')
var parseHtml = require('./html-parser')
const tagMap = {
  block: 'template'
}
var rawHtml = require('./html');

var results = "";
parseHtml(rawHtml, {
  start: function (tag, attrs, unary) {
    tag = processTag(tag)
    results += "<" + tag;
    results += processAttrs(attrs)

    results += (unary ? "/" : "") + ">";
  },
  end: function (tag) {
    tag = processTag(tag)
    results += "</" + tag + ">";
  },
  chars: function (text) {
    results += text;
  },
  comment: function (text) {
    results += "<!--" + text + "-->";
  }
})

function processTag (tag) {
  return tagMap[tag] ? tagMap[tag] : tag
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
        res += ` v-if="${removeCurlyBraces(attr.value)}"`
        break
      case 'wx:else':
        res += ` v-else`
        break
      case 'wx:elif':
        res += ` v-else-if="${removeCurlyBraces(attr.value)}"`
        break
      case 'hidden':
        res += ` v-show="${removeCurlyBraces(attr.value)}"`
        break
      default:
        if (attr.value) {
          res += ` ${attr.name}="${attr.value}"`
        } else {
          res += ` ${attr.name}`
        }
    }
  }

  if (forAttr) {
    var item = forItemAttr ? forItemAttr.value : 'item'
    var index = forIndexAttr ? forIndexAttr.value : 'index'
    res += ` v-for="(${item}, ${index}) in ${removeCurlyBraces(forAttr.value)}"`
    if (forKeyAttr) {
      var keyVal = forKeyAttr.value === '*this' ? item : item + '.' + forKeyAttr.value
      res += ` :key="${keyVal}"`
    }
  }

  return res
}

function removeCurlyBraces (str) {
  return str.replace(/[{}]/g, '')
}

console.log(results)
