let expect = require('chai').expect
import {
  isNull,
  isUndefined,
  isString,
  isNumber,
  isBoolean,
  isSymbol
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
})