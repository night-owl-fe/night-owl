/**
 * 标题 用hash记录用户的操作行为
 * 描述
 *  在不需要seo的页面，通过接口访问数据
 *  但在一些查询列表的操作中，当用户刷新页面会导致，查询条件丢失
 * 创建日期 2017/6/28 下午2:30
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

class HashHistory {
  constructor () {
    this._cbs = []
    this.hash = getHash()
    this.hashMap = getHashMap(this.hash)
  }

  push (key, value) {
    if (isObject(key)) {
      var oldHashMap = {}
      clone(oldHashMap, this.hashMap)
      clone(this.hashMap, key)
      if (isPlainEqual(this.hashMap, oldHashMap)) return this
    } else {
      if (this.hashMap[key] === value) return this
      this.hashMap[key] = value
    }
    this.hash = encode(this.hashMap)
    window.location.hash = this.hash
    this.notify()
    return this
  }

  onChange (cb) {
    this._cbs.push(cb)
    cb(this.hashMap, this.hash)
  }

  notify () {
    this._cbs.forEach((cb) => {
      cb(this.hashMap, this.hash)
    })
  }

  go (n) {
    window.history.go(n)
  }

  back () {
    window.history.back()
  }

  forward () {
    window.history.forward()
  }
}

function getHash () {
  const href = window.location.href
  const index = href.indexOf('#')
  return index === -1 ? '' : href.slice(index + 1)
}

function getHashMap (hash) {
  return decode(hash)
}

function isObject (obj) {
  return obj != null && typeof obj === 'object'
}

function clone (dist, src) {
  for (let key in src) {
    dist[key] = src[key]
  }
}

function isPlainEqual (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}