/**
 * 分页规则参考github搜索分页
 * @param pageNo 当前页数，从1开始
 * @param pageTotal 总页数
 */
function pagination (pageNo, pageTotal) {
  // 只有一页数据，不展示分页
  if (pageTotal <= 1) return null
  var res = []
  // 总页数少于8页
  if (pageTotal <= 8) {
    fill(1, pageTotal, pageNo, res)
    return res
  }

  // 当前页号是1或2或3
  if (pageNo < 4) {
    fill(1, 5, pageNo, res)
    res.push({
      value: '...',
      type: 'ellipsis'
    })
    fill(pageTotal - 1, pageTotal, pageNo, res)
    return res
  }

  // 当前页号是最后三页
  if (pageNo > pageTotal - 3) {
    fill(1, 2, pageNo, res)
    res.push({
      value: '...',
      type: 'ellipsis'
    })
    fill(pageTotal - 4, pageTotal, pageNo, res)
    return res
  }

  // 其他
  var start = pageNo - 2
  var end = pageNo + 2
  if (start - 1 <= 3) {
    start = 1
  }
  if (end + 2 >= pageTotal - 1) {
    end = pageTotal
  }
  if (start !== 1) {
    fill(1, 2, pageNo, res)
    res.push({
      value: '...',
      type: 'ellipsis'
    })
  }
  fill(start, end, pageNo, res)
  if (end !== pageTotal) {
    res.push({
      value: '...',
      type: 'ellipsis'
    })
    fill(pageTotal - 1, pageTotal, pageNo, res)
  }
  return res
}

function fill (start, end, pageNo, res) {
  for (var i = start; i <= end; i++) {
    res.push({
      value: i,
      checked: i === pageNo,
      type: 'number'
    })
  }
}

console.log(pagination(1, 1) === null)
console.log(pagination(1, 3).length === 3)
console.log(pagination(4, 6).length === 6, pagination(4, 6)[3].checked)
console.log(pagination(1, 9).length === 8, pagination(1, 9)[5].type === 'ellipsis')

console.log(pagination(5, 9).map((item) => item.value).join('') === '123456789')
console.log(pagination(6, 9).map((item) => item.value).join('') === '123456789')
console.log(pagination(7, 9).map((item) => item.value).join('') === '12...56789')
console.log(pagination(8, 9).map((item) => item.value).join('') === '12...56789')
console.log(pagination(9, 9).map((item) => item.value).join('') === '12...56789')
console.log(pagination(1, 15).map((item) => item.value).join('') === '12345...1415')
console.log(pagination(5, 15).map((item) => item.value).join('') === '1234567...1415')
console.log(pagination(7, 15).map((item) => item.value).join('') === '12...56789...1415')
console.log(pagination(11, 15).map((item) => item.value).join('') === '12...9101112131415')
console.log(pagination(13, 15).map((item) => item.value).join('') === '12...1112131415')
console.log(pagination(15, 15).map((item) => item.value).join('') === '12...1112131415')
console.log(pagination(1, 100).map((item) => item.value).join('') === '12345...99100')
console.log(pagination(5, 100).map((item) => item.value).join('') === '1234567...99100')
console.log(pagination(7, 100).map((item) => item.value).join('') === '12...56789...99100')
console.log(pagination(99, 100).map((item) => item.value).join('') === '12...96979899100')
