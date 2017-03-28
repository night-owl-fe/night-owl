let expect = require('chai').expect
let {getInstance, mySingleton} = require('../../../modules/pattern/singleton')

describe("Pattern", function () {

  describe("singleton", function () {
    it("getInstance", function () {
      expect(getInstance()).to.equal(getInstance())
      expect(mySingleton.getInstance()).to.equal(mySingleton.getInstance())
    })
  })
})