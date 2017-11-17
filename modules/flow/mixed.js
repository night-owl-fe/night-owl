// @flow
function stringify(value: mixed) {
  // $ExpectError
  // return "" + value; // Error!

  if (typeof value === 'string') {
    return '' + value
  }

  return ''
}

stringify("foo");