var _ = require('lodash')

var objects = [
  { 'a': 2, 'b': 1 },
  { 'a': 1, 'b': 2 }
];
var fn = _.conforms({ 'b': function (n) { return n > 1; } })
console.log(fn({ b: 2 }))