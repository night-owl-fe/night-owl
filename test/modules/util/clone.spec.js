let expect = require('chai').expect
let clone = require('../../../modules/util/clone')

let obj = {
  name: 'obj'
}

let arr = [1, 2, {obj: obj}]

obj.arr = arr

describe("Clone", function () {

  describe("浅拷贝", function () {
    it("拷贝一个简单对象", function () {
      let nobj = clone(obj)
      expect(nobj).to.not.equal(obj)
    })

    it("拷贝一个数组", function () {
      let narr = clone(arr)
      expect(narr).to.not.equal(arr)
    })
  })

  describe("深拷贝", function () {
    it("引用类型", function () {
      let nobj = clone(obj, true)
      expect(nobj).to.not.equal(obj)
    })

    it("引用类型深层次", function () {
      let nobj = clone(obj, true)
      expect(nobj.arr).to.not.equal(obj.arr)
    })

    it("循环引用类型", function () {
      let nobj = clone(obj, true)
      expect(nobj.arr[2].obj).to.not.equal(obj)
    })

    describe("类数组", function () {
      it("Int16Array", function () {
        let iarr = new Int16Array(5)
        iarr[0] = 1
        iarr[1] = 2
        obj.iarr = iarr
        let nobj = clone(obj, true)
        iarr[0] = 3
        nobj.iarr[1] = 3
        expect(nobj.iarr[0]).to.equal(1)
        expect(obj.iarr[1]).to.equal(2)
      })
    })

    describe("ES6新类型", function () {
      it("不支持", function () {
        expect(true).to.be.true
      })
    })
  })
})