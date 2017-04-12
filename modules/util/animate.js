var lastTime = 0

var animate = function (callback) {
  var currTime = new Date().getTime()
  var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
  var id = setTimeout(function () {
    callback(currTime + timeToCall)
  }, timeToCall)
  lastTime = currTime + timeToCall
  return id
}

var cancelAnimation = function (id) {
  clearTimeout(id)
}

module.exports = {
  animate,
  cancelAnimation
}
