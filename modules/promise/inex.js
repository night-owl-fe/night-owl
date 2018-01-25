var p = new Promise(function (resolve, reject) {
  console.log(1)
  setTimeout(function () {
    resolve(2)
  }, 1000)
})

setTimeout(function () {
  p.then(function (value) {
    console.log(value)
  })
}, 2000)