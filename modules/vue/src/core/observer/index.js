const {isObject, isArray} = require('../../../../util/type')

function Observer (value) {
  this.value = value
  if (isArray(value)) {
    walkArray(value)
  } else {
    walk(value)
  }
}

function walk (obj) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]])
  }
}

function walkArray (arr) {
  for (let i = 0; i < arr.length; i++) {
    observe(arr[i])
  }
}

function observe (obj) {
  if (!isObject(obj)) return

  new Observer()

  return new Proxy(obj, {
    get (target, key, receiver) {
      console.log(`getting ${key}!`);
      return Reflect.get(target, key, receiver);
    },
    set (target, key, value, receiver) {
      console.log(`setting ${key}!`);
      return Reflect.set(target, key, value, receiver);
    }
  })

}

function defineReactive () {

}

let obj = observe({
  code: 2000,
  data: [{
    id: 1
  }]
})

let arr = observe([{
  id: 1
}])

arr[0].id = 2
arr[1] = 2
