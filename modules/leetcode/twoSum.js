// 数组没有排序
var twoSum = function (nums, target) {
  var set = new Set(nums)
  for (var i = 0, size = nums.length; i < size; i++) {
    var val = nums[i]
    var other = target - val
    if (set.has(other)) {
      var index = nums.indexOf(other, i + 1)
      if (index > -1) {
        return [
          i,
          index
        ]
      }
    }
  }
  return []
}

// 网上提交
var twoSum = function (nums, target) {
  const map = {}

  for (let i = 0; i < nums.length; i++) {
    const findNum = target - nums[i]

    if (map[findNum] !== undefined) {
      return [map[findNum], i]
    }

    map[nums[i]] = i
  }

  return []
}

// console.log(twoSum([3, 2, 4], 6))

// 数组已经排序
var twoSum2 = function (nums, target) {
  var j = nums.length - 1
  var i = 0
  while (i < j) {
    var res = nums[i] + nums[j]
    if (res === target) {
      return [i + 1, j + 1]
    } else if (res > target) {
      j--
    } else {
      i++
    }
  }
  return []
}

// console.log(twoSum2([2, 3, 4], 6))

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function bst (root, k) {
  if (root == null) {
    return false
  }
  var set = new Set()
  var arr = [root]
  while (arr.length) {
    var tmp = arr.pop()
    if (set.has(k - tmp.val)) return true
    set.add(tmp.val)
    if (tmp.left) arr.push(tmp.left)
    if (tmp.right) arr.push(tmp.right)
  }

  return false
}

function checkVal (root, val) {
  if (root == null) {
    return false
  }
  var tmp = root
  while (tmp) {
    if (tmp.val === val) {
      return true
    } else if (val < tmp.val) {
      tmp = tmp.left
    } else {
      tmp = tmp.right
    }
  }

  return false
}

function TreeNode (val) {
  this.val = val
  this.left = this.right = null
}

var t2 = new TreeNode(2)
var t3 = new TreeNode(3)
var t4 = new TreeNode(4)
var t5 = new TreeNode(5)
var t6 = new TreeNode(6)
var t7 = new TreeNode(7)

t5.left = t3
t5.right = t6
t3.left = t2
t3.right = t4
t6.right = t7

console.log(findTarget(t5, 5))

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let x = 0
  const l3 = l1
  let tmp1 = l1
  let tmp2 = l2
  while (l1 && l2) {
    l1.val = l1.val + l2.val + x
    if (l1.val > 9) {
      l1.val = l1.val % 10
      x = 1
    } else {
      x = 0
    }
    tmp1 = l1
    tmp2 = l2
    l1 = l1.next
    l2 = l2.next
  }
  // 将剩余的串联起来
  if (!tmp1.next && tmp2.next) {
    tmp1.next = tmp2.next
  }
  // 进位
  if (x) {
    if (tmp1.next) {
      tmp1 = tmp1.next
      while (tmp1) {
        tmp1.val = tmp1.val + x
        if (tmp1.val > 9) {
          tmp1.val = tmp1.val % 10
          x = 1
        } else {
          x = 0
        }
        if (!tmp1.next && x) {
          tmp1.next = {
            val: 1
          }
          break
        }
        tmp1 = tmp1.next
      }
    } else {
      tmp1.next = {
        val: 1
      }
    }
  }
  return l3
}

function ListNode (val) {
  this.val = val
  this.next = null
}

var addTwoNumbers = function (l1, l2) {
  if (l1 === null) return l2
  if (l2 === null) return l1

  // new a ListNode here, with head.next as header, pos as a pointer points to current position
  var head = new ListNode(0)
  var pos = head
  var temp = 0
  while (l2 !== null || l1 !== null || temp > 0) {

    //(l2!==null || l1!==null || temp>0) indicates that next digit is not null, so new a Node and move to it
    pos.next = new ListNode(0)
    pos = pos.next

    if (l1 !== null) {
      temp += l1.val
      l1 = l1.next
    }
    if (l2 !== null) {
      temp += l2.val
      l2 = l2.next
    }

    pos.val = temp % 10
    temp = parseInt(temp / 10)
  }
  return head.next
}

// 0 9
let l1 = {
  val: 1
}

let l2 = {
  val: 9,
  next: {
    val: 8
  }
}

// 0 1
let l3 = {
  val: 5
}

let l4 = {
  val: 5
}

// 0 0 1
let l5 = {
  val: 1
}

let l6 = {
  val: 9,
  next: {
    val: 9
  }
}
console.log(addTwoNumbers(l3, l4))