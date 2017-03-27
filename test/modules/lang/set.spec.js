let expect = require('chai').expect
let Set = require('../../../modules/lang/set')

let s = new Set([
  1, 2, 2, 3,
  '2', 'true',
  '2', 'true',
  '', '',
  null, null,
  undefined, undefined,
  true, false, true,
  {a: 'a'}, {b: 'b'}])

describe("Set", function () {

  describe("基本方法", function () {
    it("add(has)", function () {
      s.add(5)
      expect(s.has(5)).to.be.true
    })

    it("delete", function () {
      expect(s.delete(3)).to.be.true
    })

    it("clear", function () {
      s.clear()
      expect(s.size).to.equal(0)
    })

    it("重复", function () {
      s = new Set([
        1, 2, 2, 3,
        '2', 'true',
        '2', 'true',
        '', '',
        null, null,
        undefined, undefined,
        true, false, true,
        {a: 'a'}, {b: 'b'}])

      expect(s.size).to.equal(11)
    })
  })

  describe("引用类型不支持", function () {
    it("只支持基本类型", function () {
      s = new Set([
        {a: 'a'}, {b: 'b'}])

      expect(s.size).to.equal(1)
    })
  })
})