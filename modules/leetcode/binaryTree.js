class BT {
  constructor (name, left, right) {
    this.name = name
    this.left = left
    this.right = right
  }
}

const A = new BT('A')
const B = new BT('B')
const C = new BT('C')
const D = new BT('D')
const E = new BT('E')
const F = new BT('F')
const G = new BT('G')
const H = new BT('H')
const I = new BT('I')

/*
 *          A
 *        /   \
 *       B     C
 *      / \   / \
 *     D   F G   I
 *        /   \
 *       E     H
 */

A.left = B
A.right = C
B.left = D
B.right = F
F.left = E
C.left = G
C.right = I
G.right = H

// 先序遍历，根 -> 左 -> 右 ：A(BDFE)(CGHI)
// 中序遍历，左 -> 根 -> 右 ：(DBEF)A(GHCI)
// 后序遍历，左 -> 右 -> 根 ：(DEFB)(HGIC)A

let res = []
function preorder (root) {
  if (root) {
    res.push(root.name)
    preorder(root.left)
    preorder(root.right)
  }
}

preorder(A)
console.log(res.join(''))
res = []

function inorder (root) {
  if (root) {
    inorder(root.left)
    res.push(root.name)
    inorder(root.right)
  }
}

inorder(A)
console.log(res.join(''))
res = []

function postorder (root) {
  if (root) {
    postorder(root.left)
    postorder(root.right)
    res.push(root.name)
  }
}

postorder(A)
console.log(res.join(''))
res = []

function preorderByStack (root) {
  let node = root
  const stack = [node]
  while (stack.length) {
    res.push(node.name)
    if (node.right) {
      stack.push(node.right)
    }
    if (node.left) {
      stack.push(node.left)
    }
    node = stack.pop()
  }
}

preorderByStack(A)
console.log(res.join(''))
res = []
