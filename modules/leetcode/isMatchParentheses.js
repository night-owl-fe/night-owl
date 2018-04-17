function isMatchParentheses (str) {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    let x = str[i]
    if (count < 0) {
      return count
    } else if (x === '(') {
      count++
    } else if (x === ')') {
      count--
    }
  }
  return count
}

function isMatchParentheses2 (str) {
  return str
    .split('')
    .reduce(
      (count, x) =>
        count < 0
          ? count
          : x === '(' ? count + 1 : x === ')' ? count - 1 : count,
      0
    )
}

function isValid (s) {
  let a = []
  let index = 0
  const o = {'(': ')', '[': ']', '{': '}'}
  for (let i = 0; i < s.length; i++) {
    let x = s[i]
    if (o[x]) {
      a[index++] = x
    } else if (o[a[index - 1]] === x) {
      index--
    } else {
      return false
    }
  }
  return index === 0
}

function isValid (s) {
  let a = []
  const o = {'(': ')', '[': ']', '{': '}'}
  for (let i = 0; i < s.length; i++) {
    let x = s[i]
    if (o[x]) {
      a.push(x)
    } else if (o[a[a.length - 1]] === x) {
      a.pop()
    } else {
      return false
    }
  }
  return a.length === 0
}
console.log(isValid('()[]{}'))