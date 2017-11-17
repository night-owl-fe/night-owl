// @flow
// $ExpectError
// interface Invariant {  property: number | string }
// interface Covariant { +readOnly: number | string }
//
// var value1: Invariant = { property: 42 }; // Error!, 是因为这个属性即可读也可写，当你复制给你个数字时，读的时候不确定是数字还是字符串，所以报错
// var value2: Covariant = { readOnly: 42 }; // Works!

// interface Invariant {  property: number }
// interface Contravariant { -writeOnly: number }
//
// var numberOrString = Math.random() > 0.5 ? 42 : 'forty-two';
//
// // $ExpectError
// var value1: Invariant = { property: numberOrString };  // Error!，因为只能写入数字类型，有可能写入字符串类型，所以报错
// var value2: Contravariant = { writeOnly: numberOrString }; // Works!，只能写不能读的属性不知道有什么用？？
