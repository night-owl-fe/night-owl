// transform-es2015-block-scoping
let uid = 0
const ES2015_BLOCK_SCOPING = 'transform-es2015-block-scoping'
// check-es2015-constants
// ES2015_BLOCK_SCOPING = 'transform-es2015-block-scoping2'

// transform-es2015-arrow-functions
// transform-es2015-function-name
let fn = () => {
  console.log('--fn--')
}

// transform-es2015-block-scoped-functions
{
  function x1 () {
  }
}

// transform-es2015-classes
// transform-es2015-modules-commonjs
export class Sub extends Array {
  constructor (...args) {
    super(...args)
  }

  toString (...args) {
    super.toString(...args)
  }
}

// "transform-es2015-object-super"
var obj1 = {
  name() {
    return super.name() + " Verma";
  }
};

// transform-es2015-computed-properties
const obj0 = {
  [uid]: 0,
  a: 'z',
  a: 'z1'
}

// transform-es2015-literals
var b = 0b11; // binary integer literal
var o = 0o7; // octal integer literal
const u = 'Hello\u{000A}\u{0009}!'; // unicode string literals, newline and tab

// transform-es2015-parameters
function fn2 ({a = 1}, ...args) {
  console.log(args)
}

// transform-es2015-shorthand-properties
var obj2 = {
  fn2
}

// transform-es2015-spread
var a = ['a', 'b', 'c'];
var b = [...a, 'foo'];

// transform-es2015-template-literals
var str = `-------> ${b}`

// transform-es2015-typeof-symbol
typeof Symbol() === "symbol"

// transform-es2015-unicode-regex
var string = "foo💩bar";
var match = string.match(/foo(.)bar/u);

// transform-regenerator
function* a () {
  yield 1;
}