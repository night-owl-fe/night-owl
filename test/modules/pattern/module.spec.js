let expect = require('chai').expect
let myModule = require('../../../modules/pattern/module')

describe("Pattern", function () {

  describe("module", function () {
    it("object&iife", function () {
      myModule.incrementCounter()
      expect(myModule.getCounter()).to.equal(1)
      expect(myModule.mym.config.name).to.equal('myModule')
    })
  })
})