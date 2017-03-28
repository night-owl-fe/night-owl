let expect = require('chai').expect
let Man = require('../../../modules/pattern/constructor')

describe("Pattern", function () {

  describe("constructor", function () {
    it("new Man", function () {
      let m = new Man(25, 'lilei')
      expect(m.say()).to.equal('My name is lilei')
    })
  })
})