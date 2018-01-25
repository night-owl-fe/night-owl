const noop = () => {}
class Promise {
  constructor (executor) {
    this.executor = executor
    this.state = 'pending'
    this.value = undefined
    this.error = undefined
    this.resolvedCallback = noop
    this.rejectedCallback = noop
    this.catchCallback = noop
    this._tryExecutor()
  }

  resolve (value) {
    if (this.state === 'pending') {
      this.state = 'resolved'
      this.value = value
      setTimeout(() => {
        this.resolvedCallback()
      })
    }
  }

  reject (err) {
    if (this.state === 'pending') {
      this.state = 'rejected'
      this.error = err
      setTimeout(() => {
        if (this.rejectedCallback === noop) {
          this.catchCallback(err)
        } else {
          this.rejectedCallback()
        }
      })
    }
  }

  then (onResolved, onRejected) {
    return create(this, onResolved, onRejected)
  }

  catch (onRejected) {
    return create(this, null, onRejected, true)
  }

  _tryExecutor () {
    try {
      this.executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      setTimeout(() => {
        this.reject(err)
      })
    }
  }
}

function create (promise, onResolved, onRejected, caught) {
  return new Promise(function (resolve, reject) {
    const _resolvedCallback = () => {
      try {
        if (isFunction(onResolved)) {
          resolvePromise(onResolved(promise.value), resolve, reject)
        }
      } catch (err) {
        reject(err)
      }
    }

    const _rejectedCallback = (err) => {
      try {
        if (isFunction(onRejected)) {
          rejectPromise(onRejected(err), resolve, reject)
        } else {
          reject(err)
        }
      } catch (err) {
        reject(err)
      }
    }

    if (promise.state === 'resolved') {
      return _resolvedCallback()
    } else if (promise.state === 'rejected') {
      return _rejectedCallback(promise.error)
    }

    if (caught) {
      promise.catchCallback = _rejectedCallback
    } else {
      promise.resolvedCallback = _resolvedCallback

      promise.rejectedCallback = _rejectedCallback
    }
  })
}

function isFunction (val) {
  return typeof val === 'function'
}

function isPromise (val) {
  return val instanceof Promise
}

function resolvePromise (res, resolve, reject, data) {
  if (isPromise(res)) {
    res.then(resolve, reject)
  } else {
    resolve(data || res)
  }
}

function rejectPromise (res, resolve, reject) {
  if (isPromise(res)) {
    res.then(resolve, reject)
  } else {
    resolve(res)
  }
}

// new Promise(function (resolve, reject) {
//   console.log(1)
//   setTimeout(function () {
//     resolve(2)
//   }, 1000)
// }).then(function (value) {
//   console.log(value)
//   return 3
// }).then(function (value) {
//   console.log(value)
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve(4)
//     }, 1000)
//   })
// }).then(function (value) {
//   console.log(value)
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       reject(5)
//     }, 1000)
//   })
// }).catch(function (err) {
//   console.log(err)
// })

var p = new Promise(function (resolve, reject) {
  console.log(1)
  setTimeout(function () {
    resolve(2)
  }, 1000)
})

setTimeout(function () {
  p.then(function (value) {
    console.log('====', value)
  })
}, 2000)