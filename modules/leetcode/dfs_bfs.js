class T {
  constructor (name) {
    this.name = name
    this.children = null
  }
}

const A = new T('A')
const B = new T('B')
const C = new T('C')
const D = new T('D')
const E = new T('E')
const F = new T('F')
const G = new T('G')
const H = new T('H')
const I = new T('I')
const J = new T('J')

A.children = [B, C]
B.children = [D, E]
C.children = [F, G, H]
E.children = [I]
F.children = [J]

/*
 *          A
 *        /   \
 *       B     C
 *      / \   / | \
 *     D   E F  G  H
 *        /   \
 *       I     J
 */

function DFS (root) {
  let stack = [root]
  const res = []
  while (stack.length) {
    const node = stack.shift()
    if (node.children) {
      stack = node.children.concat(stack)
    }
    res.push(node)
  }
  return res
}

console.log(DFS(A).map(n => n.name).join(''))

function BFS (root) {
  let stack = [root]
  const res = []
  while (stack.length) {
    const node = stack.shift()
    if (node.children) {
      stack = stack.concat(node.children)
    }
    res.push(node)
  }

  return res
}

console.log(BFS(A).map(n => n.name).join(''))