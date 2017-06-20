let expect = require('chai').expect
import {
  isNull,
  isUndefined,
  isNil,
  isString,
  isNumber,
  isBoolean,
  isSymbol,
  isObject,
  isObjectLike,
  isPlainObject,
  isArguments,
  isLength,
  isArray,
  isArrayLike,
  isBuffer,
  isDate,
  isFunction,
  isMap,
  isSet,
  isWeakMap,
  isWeakSet,
  isRegExp,
  isError,
  isElement
} from './index'

describe("Type", function () {

  describe("Null", function () {
    it("isNull", function () {
      expect(isNull(null)).to.be.ok
      expect(isNull(undefined)).to.not.be.ok
    })
  })

  describe("Undefined", function () {
    it("isUndefined", function () {
      expect(isUndefined(undefined)).to.be.ok
      expect(isUndefined(null)).to.not.be.ok
    })
  })

  describe("Nil", function () {
    it("isNil", function () {
      expect(isNil(undefined)).to.be.ok
      expect(isNil(null)).to.be.ok
    })
  })

  describe("String", function () {
    it("isString", function () {
      expect(isString('type')).to.be.ok
      expect(isString(new String('type'))).to.be.ok
      expect(isString(1)).to.not.be.ok
    })
  })

  describe("Number", function () {
    it("isNumber", function () {
      expect(isNumber(1)).to.be.ok
      expect(isNumber(new Number(1))).to.be.ok
      expect(isNumber(Number.MIN_VALUE)).to.be.ok
      expect(isNumber(Infinity)).to.be.ok
      expect(isNumber(NaN)).to.be.ok
      expect(isNumber(0)).to.be.ok
      expect(isNumber('1')).to.not.be.ok
      expect(isNumber(arguments)).to.not.be.ok
      expect(isNumber(void 0)).to.not.be.ok
    })
  })

  describe("Boolean", function () {
    it("isBoolean", function () {
      expect(isBoolean(true)).to.be.ok
      expect(isBoolean(false)).to.be.ok
      expect(isBoolean(new Boolean(false))).to.be.ok
      expect(isBoolean('string')).to.not.be.ok
      expect(isBoolean(2)).to.not.be.ok
      expect(isBoolean('false')).to.not.be.ok
      expect(isBoolean('true')).to.not.be.ok
      expect(isBoolean(null)).to.not.be.ok
      expect(isBoolean(arguments)).to.not.be.ok
      expect(isBoolean(void 0)).to.not.be.ok
      expect(isBoolean(NaN)).to.not.be.ok
      expect(isBoolean(null)).to.not.be.ok
    })
  })

  describe("Symbol", function () {
    it("isSymbol", function () {
      expect(isSymbol(Symbol())).to.be.ok
      expect(isSymbol(Symbol('symble'))).to.be.ok
      expect(isSymbol(Object(Symbol()))).to.be.ok
      expect(isSymbol(0)).to.not.be.ok
      expect(isSymbol('')).to.not.be.ok
      expect(isSymbol(Symbol)).to.not.be.ok
    })
  })

  describe("Object", function () {
    it("isObject", function () {
      expect(isObject(arguments)).to.be.ok
      expect(isObject([1, 2])).to.be.ok
      expect(isObject(function () {})).to.be.ok
      expect(isObject(null)).to.not.be.ok
      expect(isObject(void 0)).to.not.be.ok
      expect(isObject('string')).to.not.be.ok
      expect(isObject(12)).to.not.be.ok
      expect(isObject(true)).to.not.be.ok
    })
  })

  describe("ObjectLike", function () {
    it("isObjectLike", function () {
      expect(isObjectLike(arguments)).to.be.ok
      expect(isObjectLike([1, 2])).to.be.ok
      expect(isObjectLike(function () {})).to.not.be.ok
      expect(isObjectLike(null)).to.not.be.ok
      expect(isObjectLike(void 0)).to.not.be.ok
      expect(isObjectLike('string')).to.not.be.ok
      expect(isObjectLike(12)).to.not.be.ok
      expect(isObjectLike(true)).to.not.be.ok
    })
  })

  describe("PlainObject", function () {
    it("isPlainObject", function () {
      function Foo () {

      }

      const set = new Set()
      expect(isPlainObject({name: 'plain'})).to.be.ok
      expect(isPlainObject(Object.create(null))).to.be.ok
      expect(isPlainObject(arguments)).to.not.be.ok
      expect(isPlainObject([1, 2])).to.not.be.ok
      expect(isPlainObject(function () {})).to.not.be.ok
      expect(isPlainObject(null)).to.not.be.ok
      expect(isPlainObject(void 0)).to.not.be.ok
      expect(isPlainObject('string')).to.not.be.ok
      expect(isPlainObject(12)).to.not.be.ok
      expect(isPlainObject(true)).to.not.be.ok
      expect(isPlainObject(new Foo)).to.not.be.ok
      expect(isPlainObject(new Array())).to.not.be.ok
      expect(isPlainObject(set)).to.not.be.ok
    })
  })

  describe("arguments", function () {
    it("isArguments", function () {
      var args = (function () { return arguments; }(1, 2, 3));
      expect(isArguments(arguments)).to.be.ok
      expect(isArguments(args)).to.be.ok
      expect(isArguments([1, 2])).to.not.be.ok
      expect(isArguments(function () {})).to.not.be.ok
      expect(isArguments(null)).to.not.be.ok
      expect(isArguments(void 0)).to.not.be.ok
      expect(isArguments('string')).to.not.be.ok
    })
  })

  describe("Length", function () {
    it("isLength", function () {
      expect(isLength(0)).to.be.ok
      expect(isLength(1)).to.be.ok
      expect(isLength(-1)).to.not.be.ok
      expect(isLength(1.1)).to.not.be.ok
      expect(isLength(9007199254740992)).to.not.be.ok
      expect(isLength(Number.MIN_VALUE)).to.not.be.ok
      expect(isLength('1')).to.not.be.ok
      expect(isLength(Infinity)).to.not.be.ok
    })
  })

  describe("Array", function () {
    it("isArray", function () {
      expect(isArray([])).to.be.ok
      expect(isArray(new Array())).to.be.ok
      expect(isArray(arguments)).to.not.be.ok
    })
  })

  describe("ArrayLike", function () {
    it("isArrayLike", function () {
      expect(isArrayLike([])).to.be.ok
      expect(isArrayLike(new Array())).to.be.ok
      expect(isArrayLike(arguments)).to.be.ok
      expect(isArrayLike('123')).to.be.ok
    })
  })

  describe("Buffer", function () {
    it("isBuffer", function () {
      expect(isBuffer(new Buffer('buffer'))).to.be.ok
      expect(isBuffer(new Array())).to.not.be.ok
      expect(isBuffer(arguments)).to.not.be.ok
      expect(isBuffer('123')).to.not.be.ok
    })
  })

  describe("Date", function () {
    it("isDate", function () {
      expect(isDate(new Date())).to.be.ok
      expect(isDate(Date.now())).to.not.be.ok
    })
  })

  describe("Function", function () {
    it("isFunction", function () {
      async function foo () {}

      function* foo1 () {}

      function foo2 () {}

      expect(isFunction(foo)).to.be.ok
      expect(isFunction(foo2)).to.be.ok
      expect(isFunction(foo1)).to.be.ok
    })
  })

  describe("Map", function () {
    it("isMap", function () {
      expect(isMap(new Map())).to.be.ok
      expect(isMap('string')).to.not.be.ok
      expect(isMap(1)).to.not.be.ok
      expect(isMap({})).to.not.be.ok
      expect(isMap(false)).to.not.be.ok
      expect(isMap(void 0)).to.not.be.ok
      expect(isMap([])).to.not.be.ok
      expect(isMap(new Set())).to.not.be.ok
    })
  })

  describe("Set", function () {
    it("isSet", function () {
      expect(isSet(new Set())).to.be.ok
      expect(isSet('string')).to.not.be.ok
      expect(isSet(1)).to.not.be.ok
      expect(isSet({})).to.not.be.ok
      expect(isSet(false)).to.not.be.ok
      expect(isSet(void 0)).to.not.be.ok
      expect(isSet([])).to.not.be.ok
      expect(isSet(new Map())).to.not.be.ok
    })
  })

  describe("WeakMap", function () {
    it("isWeakMap", function () {
      expect(isWeakMap(new WeakMap())).to.be.ok
      expect(isWeakMap('string')).to.not.be.ok
      expect(isWeakMap(1)).to.not.be.ok
      expect(isWeakMap({})).to.not.be.ok
      expect(isWeakMap(false)).to.not.be.ok
      expect(isWeakMap(void 0)).to.not.be.ok
      expect(isWeakMap([])).to.not.be.ok
      expect(isWeakMap(new Map())).to.not.be.ok
      expect(isWeakMap(new WeakSet())).to.not.be.ok
    })
  })

  describe("WeakSet", function () {
    it("isWeakSet", function () {
      expect(isWeakSet(new WeakSet())).to.be.ok
      expect(isWeakSet('string')).to.not.be.ok
      expect(isWeakSet(1)).to.not.be.ok
      expect(isWeakSet({})).to.not.be.ok
      expect(isWeakSet(false)).to.not.be.ok
      expect(isWeakSet(void 0)).to.not.be.ok
      expect(isWeakSet([])).to.not.be.ok
      expect(isWeakSet(new Map())).to.not.be.ok
      expect(isWeakSet(new WeakMap())).to.not.be.ok
    })
  })

  describe("RegExp", function () {
    it("isRegExp", function () {
      expect(isRegExp(/^.*/)).to.be.ok
      expect(isRegExp('//')).to.not.be.ok
    })
  })

  describe("Error", function () {
    it("isError", function () {
      expect(isError(new Error())).to.be.ok
      expect(isError(null)).to.not.be.ok
    })
  })

  describe("Element", function () {
    it("isElement", function () {
      expect(isElement({nodeType: 1})).to.be.ok
      expect(isElement(null)).to.not.be.ok
    })
  })

})