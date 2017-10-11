class VNode {
  constructor (tag, props = {}, children) {
    this.tag = tag
    this.children = children
    this.text = ''
    this.el = null
    if ('key' in props) {
      this.key = props.key
      delete props.key
    }
    this.props = props
    if (Array.isArray(children)) {
      children.forEach((n) => {
        n.parent = this
      })
    }
  }

  render () {
    const el = this.tag ? document.createElement(this.tag)
      : document.createTextNode(this.text)
    this.el = el
    for (let key in this.props) {
      el.setAttribute(key, this.props[key])
    }

    if (this.children) {
      this.children.forEach((children) => {
        el.appendChild(children.render())
      })
    }
    return el
  }

  toString () {
    let stack = [this]
    while (stack.length) {
      const node = stack.shift()
      print(node)
      if (node.children) {
        stack = node.children.concat(stack)
      }
    }

    function getHierarchyCount (node) {
      let count = 1
      while (node.parent) {
        count++
        node = node.parent
      }
      return count
    }

    function print (node) {
      let count = getHierarchyCount(node)
      let str = new Array(count).join('  ')
      console.log(str, node.tag || 'text: ' + node.text)
    }
  }
}

const h = (tag, props, children) => {
  let vnode = children
  if (typeof children === 'string') {
    vnode = new VNode()
    vnode.text = children
    vnode = [vnode]
  }
  return new VNode(tag, props, vnode)
}

// 1: 删除，2：新增，3：修改属性，4：修改文本,5: 替换
const diff = (oldTree, newTree) => {
  const diffs = {}
  if (newTree == null) {
    return null
  }
  walk(oldTree, newTree, 0, diffs)
  return diffs
}

function walk (oldNode, newNode, index, diffs) {
  const curLayer = diffs[index] = []
  if (oldNode.tag == null && newNode.tag == null) {
    if (oldNode.text !== newNode.text) {
      curLayer.push({
        type: 3,
        text: newNode.text
      })
    }
  } else if (oldNode.tag === newNode.tag) {

  } else {
    curLayer.push({
      type: 5,
      node: newNode
    })
  }
}

function walkChildren (oldNode, newNode, index, diffs) {

}

// module.exports = h