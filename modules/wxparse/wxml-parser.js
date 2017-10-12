const startTag = /^<([-A-Za-z]+)((?:\s+[-A-Za-z0-9_:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/
const endTag = /^<\/([-A-Za-z]+)[^>]*>/
const attrTag = /([-A-Za-z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g
function parseWxml (html, { start, end, chars, comment } = {}) {
  const stack = []
  let index, isChars, match, text, last = html
  while (html) {
    // 是否是普通字符串
    isChars = true
    if (html.startsWith('<!--')) { // comment
      index = html.indexOf('-->')
      if (index >= 0) {
        if (comment) {
          comment(html.substring(4, index))
        }
        html = html.substring(index + 3)
        isChars = false
      }
    } else if (html.startsWith('</')) { // end tag
      match = html.match(endTag)
      if (match) {
        html = html.substring(match[0].length)
        parseEndTag(...match)
        isChars = false
      }
    } else if (html[0] === '<') { // start tag
      match = html.match(startTag)
      if (match) {
        html = html.substring(match[0].length)
        parseStartTag(...match)
        isChars = false
      }
    }
    // 上面都不匹配，当做普通字符串处理
    if (isChars) {
      // 查找最近的 < tag
      index = html.indexOf("<")

      if (index < 0) {
        text = html
        html = ''
      } else {
        text = html.substring(0, index)
        html = html.substring(index)
      }

      if (chars) {
        chars(text)
      }
    }

    if (last === html) {
      throw "Parse Error: " + html
    }
    last = html
  }

  function parseStartTag (tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase()
    if (!unary) {
      stack.push(tagName)
    }

    if (start) {
      attrs = []
      rest.replace(attrTag, function (match, name) {
        var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : ''

        attrs.push({
          name: name,
          value: value,
          escapedValue: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
        })
      })

      start(tagName, attrs, !!unary)
    }
  }

  function parseEndTag (tag, tagName) {
    let pos = -1
    if (tagName) {
      tagName = tagName.toLowerCase()
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos] === tagName) {
          break
        }
      }
    }

    if (pos >= 0) {
      if (end) {
        for (let i = stack.length - 1; i >= pos; i--) {
          end(stack[i])
        }
      }
    }

    stack.length = pos > 0 ? pos : 0
  }
}

module.exports = parseWxml