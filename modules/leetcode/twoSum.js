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
};

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
};

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
};

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
  this.val = val;
  this.left = this.right = null;
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