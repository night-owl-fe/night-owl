function noop () {}

let uid = 0
module.exports = function jsonp (url, options = {}) {
  if (typeof url === 'string') {
    options.url = url
  } else {
    options = url || {}
  }

  // callbackName: 请求的回调函数的名字
  let {
        url,
        name = 'callback',
        callbackName = '__wuage' + uid++,
        timeout = 60000
      } = options

  let script = document.createElement('script')
  let responseData
  let abortTimeout
  window[callbackName] = function () {
    responseData = arguments
  }

  let complete = function () {
    clearTimeout(abortTimeout)
    window[callbackName] = noop
    if (script.parentNode) script.parentNode.removeChild(script)
  }

  return new Promise((resolve, reject) => {
    // 加载完毕
    script.onload = function () {
      complete()
      resolve(responseData[0])
    }

    // 加载失败
    script.onerror = function (e) {
      complete()
      reject(e)
    }

    url = (~url.indexOf('?') ? '&' : '?') + name + '=' + callbackName
    url = url.replace('?&', '?')
    script.src = url
    document.head.appendChild(script)

    abortTimeout = setTimeout(function () {
      reject(new Error('timeout'))
    }, timeout)
  })
}