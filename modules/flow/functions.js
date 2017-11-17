// @flow
function concat (a: string, b: string): string {
  return a + b;
}

concat("foo", "bar"); // Works!
// $ExpectError
// concat(true, false);  // Error!