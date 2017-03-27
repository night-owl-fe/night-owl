var obj = {
  n: 'n'
}
Object.freeze(obj)
obj.n = 'm'
console.log(obj)