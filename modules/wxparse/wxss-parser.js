function wxssParser (wxss) {
  return wxss.replace(/(\d+)rpx/gm, function (all, text) {
    return parseInt(text) / 100 + 'rem'
  })
}

module.exports = wxssParser