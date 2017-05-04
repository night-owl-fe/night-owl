function bind (ctx, handler, ...args) {
  return function (...args2) {
    handler.call(ctx, ...args, ...args2)
  }
}

module.exports = bind
