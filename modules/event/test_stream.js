const Stream = require('./stream')
const { Readable } = require('stream')

{
  const s = new Stream({
    read () {
      this.push('1')
    }
  })
  s.push('2')
  // s.resume()

  const r = new Readable({
    encoding: 'utf8',
    highWaterMark: 10,
    read () {
      console.log('----22')
      this.push('1')
    }
  })
  r.push('2')
}

// {
//   const s = new Stream({
//     read () {}
//   })
//
//   s.on('data', (data) => {
//     console.log(data)
//   })
//
//   s.push('s:1')
//
//   const r = new Readable({
//     encoding: 'utf8',
//     read () {}
//   })
//
//   r.on('data', (data) => {
//     console.log(data)
//   })
//
//   r.push('r:1')
//
// }

// {
//   const s = new Stream({
//     read () {
//       setTimeout(() => {
//         this.push('s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2s:2')
//       }, 1000)
//       setTimeout(() => {
//         this.push(null)
//       }, 5000)
//     }
//   })
//
//   s.on('data', (data) => {
//     console.log(data)
//   })
//
//   const r = new Readable({
//     encoding: 'utf8',
//     highWaterMark: 10,
//     read () {
//       this.push('r:4')
//       this.push(null)
//     }
//   })
//
//   // r.push('r:2')
//   // r.push('r:3')
//
//   r.on('data', (data) => {
//     console.log(data)
//   })
// }