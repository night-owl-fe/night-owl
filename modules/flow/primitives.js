// @flow
function foo (x: number, y: string, z: boolean) {
}

foo(1, 'abc', true)

// function call. Called with too few arguments
// foo()

// Number. This type is incompatible with the expected param type of number
// foo(new Number(1), 'abc', true)

function bar (x: Number, y?: string) {
}

bar(new Number(1), 'abc')
bar(new Number(1))

if (42) {}

if ('') {}