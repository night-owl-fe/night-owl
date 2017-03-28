function Man (age, name) {
  this.age = age
  this.name = name
}

Man.prototype.say = function () {
  return 'My name is ' + this.name
}

module.exports = Man
