const Event = require('./index')
class Stream extends Event {
  constructor (options = {}) {
    super()
    this._state = {
      highWaterMark: options.highWaterMark || 16,
      flowing: null,
      reading: false,
      ended: false,
      endEmitted: false,
      resumeScheduled: false,
      needReadable: false,
      emittedReadable: false,
      readableListening: false,
      readingMore: false,
      buffer: []
    }

    this.readable = true

    if (typeof options.read === 'function')
      this._read = options.read

    if (typeof options.destroy === 'function')
      this._destroy = options.destroy
  }

  push (chunk) {
    const state = this._state
    state.reading = false
    if (chunk === null) {
      onEofChunk(this, state)
    } else {
      if (state.flowing && state.buffer.length === 0 && !state.sync) {
        this.emit('data', chunk)
        this.read(0)
      } else {
        state.buffer.push(chunk)
        if (state.needReadable) {
          emitReadable(this)
        }
      }

      maybeReadMore(this, state)
    }

    return needMoreData(state)
  }

  read (n) {
    const state = this._state
    n = parseInt(n, 10)
    const nOrig = n
    const length = state.buffer.length

    if (n !== 0)
      state.emittedReadable = false

    // n=0不会读取数据（数据也不会减少），但needReadable状态却是可读的，这个已经超过HWM或者已经结束
    // 上面条件加在一起是说不需要读取数据，直接返回
    if (n === 0 &&
      state.needReadable &&
      (length >= state.highWaterMark || state.ended)) {
      // 流结束了，却缓存为空，触发end事件，否则触发readable事件
      if (length === 0 && state.ended)
        endReadable(this)
      else
        emitReadable(this)
      return null
    }

    n = howMuchToRead(n, state)

    // <=1=>这种情况可能是已经结束了，还继续读取数据,且数据也已经清空了，就直接返回null
    if (n === 0 && state.ended) {
      if (state.buffer.length === 0)
        endReadable(this)
      return null
    }

    let doRead = state.needReadable

    // 缓存空
    if (length === 0 || length - n < state.highWaterMark) {
      doRead = true
    }

    // 如果已经结束，或正在读取
    if (state.ended || state.reading) {
      doRead = false
    }

    if (doRead) {
      // 读取数据或者说调用_read方法
      state.reading = true
      // 同步或异步读取数据，也就是说在_read方法中，是直接调用push，还是异步的push
      state.sync = true
      if (length === 0) {
        state.needReadable = true
      }
      // 猜测：在_read不能同时存在同步和异步调用push
      this._read(state.highWaterMark)
      state.sync = false
      // 如果同步读取，reading将为false,表示读取数据结束，这时可能会直接调用push，需要重新计算
      if (!state.reading) {
        n = howMuchToRead(nOrig, state)
      }
    }

    let ret
    if (n > 0) {
      ret = fromList(n, state.buffer)
    } else {
      ret = null
    }

    if (ret === null) {
      state.needReadable = true
      n = 0
    }

    if (state.buffer.length === 0) {
      if (!state.ended) {
        // 数据空了，需要填充数据
        state.needReadable = true
      } else if (nOrig !== n) {
        // 在结束状态读取（最后一次读取,否则在<=1=>中就已经返回了）
        endReadable(this)
      }
    }

    if (ret !== null) {
      this.emit('data', ret)
    }

    return ret
  }

  pipe (dist) {

  }

  on (name, fn) {
    super.on(name, fn)
    const state = this._state
    if (name === 'data') {
      if (state.flowing !== false) {
        this.resume()
      }
    } else if (name === 'readable') {
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true
        state.emittedReadable = false
        if (!state.reading) {
          nextTick(() => {this.read(0)})
        } else if (state.buffer.length) {
          emitReadable(this)
        }
      }
    }
  }

  pause () {
    const state = this._state
    if (false !== state.flowing) {
      state.flowing = false
      this.emit('pause')
    }
    return this
  }

  resume () {
    const state = this._state
    if (!state.flowing) {
      state.flowing = true
      resume(this, state)
    }
    return this
  }

  _read () {
    throw new Error('不能直接使用，必须重写')
  }
}

function resume (stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true
    nextTick(_resume, stream, state)
  }
}

function _resume (stream, state) {
  if (!state.reading) {
    stream.read(0)
  }
  state.resumeScheduled = false
  stream.emit('resume')
  flow(stream)
  if (state.flowing && !state.reading) {
    stream.read(0)
  }
}

function nextTick (fn, ...args) {
  process.nextTick(fn, ...args)
}

// 计算可读数据量
// n <= 0 ==> 读取 0
// buffer空且已经结束了 ==> 读取 0
// n = NaN ==> 读取全部
// n <= state.length ==> 读取 n
// n > state.length ==> 读取 0，并使 Readable 从数据源读取数据
// n > state.highWaterMark ==> 重新计算 highWaterMark，大小是大于 n 的最小 2^x
function howMuchToRead (n, state) {
  const length = state.buffer.length
  if (isNaN(n)) {
    if (state.flowing) return 1
    else return length
  }
  if (n <= 0 || (length === 0 && state.ended)) return 0
  if (n > state.highWaterMark)
    state.highWaterMark = computeNewHighWaterMark(n)
  if (n <= length) return n
  // 读取的数量太多，不够
  if (!state.ended) {
    state.needReadable = true
    return 0
  }
  return length
}

// Don't raise the hwm > 8MB
const MAX_HWM = 0x800000;
function computeNewHighWaterMark (n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

function fromList (n, buffer) {
  if (buffer.length === 0)
    return null

  if (!n || n >= buffer.length)
    return buffer.splice(0, buffer.length)

  return buffer.splice(0, n)
}

function onEofChunk (stream, state) {
  if (state.ended) return
  state.ended = true
  emitReadable(stream)
}

function emitReadable (stream) {
  const state = stream._state
  state.needReadable = false
  if (!state.emittedReadable) {
    state.emittedReadable = true
    if (state.sync)
      nextTick(_emitReadable, stream)
    else
      _emitReadable(stream)
  }
}

function _emitReadable (stream) {
  stream.emit('readable')
  flow(stream)
}

function endReadable (stream) {
  const state = stream._state

  if (!state.endEmitted) {
    state.ended = true
    nextTick(endReadableNT, state, stream)
  }
}

function endReadableNT (state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.buffer.length === 0) {
    state.endEmitted = true
    // 流已经失效
    stream.readable = false
    stream.emit('end')
  }
}

function maybeReadMore (stream, state) {
  if (!state.readingMore) {
    state.readingMore = true
    nextTick(_maybeReadMore, stream, state)
  }
}

function _maybeReadMore (stream, state) {
  var len = state.buffer.length
  while (!state.reading && !state.flowing && !state.ended &&
  len < state.highWaterMark) {
    stream.read(0)
    if (len === state.buffer.length)
    // didn't get any data, stop spinning.
      break
    else
      len = state.buffer.length
  }
  state.readingMore = false
}

function needMoreData (state) {
  return !state.ended &&
    (state.needReadable ||
    state.buffer.length < state.highWaterMark ||
    state.buffer.length === 0)
}

// 清空缓存
function flow (stream) {
  const state = stream._state
  while (state.flowing && stream.read() !== null);
}

module.exports = Stream
