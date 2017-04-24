# babel
babel是依靠一个一个插件完成具体的功能，preset是plugin的集合，方便一次性添加多个插件
## es2015 Plugins
* check-es2015-constants 检验const常量是否被重新赋值
* transform-es2015-arrow-functions 编译箭头函数 
* transform-es2015-block-scoped-functions 函数声明在作用域内
* transform-es2015-block-scoping 编译const和let
* transform-es2015-classes 编译class
* transform-es2015-computed-properties 编译计算对象属性
* transform-es2015-destructuring 编译解构赋值
* transform-es2015-duplicate-keys 编译对象中重复的key
* transform-es2015-for-of 编译for…of
* transform-es2015-function-name 对匿名函数表达式或方法添加方法名
* transform-es2015-literals 编译整数(8进制/16进制)和unicode
* transform-es2015-modules-commonjs 将modules编译成commonjs
* transform-es2015-object-super 编译super关键字 
* transform-es2015-parameters 编译参数，包括默认参数，不定参数和解构参数
* transform-es2015-shorthand-properties 编译属性缩写
* transform-es2015-spread 编译展开运算符
* transform-es2015-sticky-regex 正则添加sticky属性
* transform-es2015-template-literals 编译模版字符串
* transform-es2015-typeof-symbol 获取Symbol类型
* transform-es2015-unicode-regex 正则添加unicode模式
* transform-regenerator 编译generator函数

### es2015 Options
* loose
    许多Babel的插件有两种模式
    * 尽可能符合ECMAScript6语义的normal模式。loose=false
    * 提供更简单ES5代码的loose模式。loose=true
    * http://www.tuicool.com/articles/RRvYfy7
* modules
    es6的Module加载转为"amd" | "umd" | "systemjs" | "commonjs" | false
* spec
    不了解
           
           
## es2016 Plugins
* transform-exponentiation-operator 编译幂运算符2 ** 2 ---> 2 * 2 * 2

## es2017 Plugins
* syntax-trailing-function-commas function最后一个参数允许使用逗号
* transform-async-to-generator 把async函数转化成generator函数

## latest(不赞成使用，赞成使用env)
* latest是一个特殊的presets，包括了es2015，es2016，es2017的插件（目前为止，以后有es2018也会包括进去）

## env
* 和没有options的babel-preset-latest一样

## stage-4
* 已经完成的提案，所以理论上包含es2015 es2016 es2017，babel不存在这个包

## stage-3
* 包含stage-4
* transform-object-rest-spread 编译对象的解构赋值和不定参数
* transform-async-generator-functions 将async generator function和for await编译为es2015的generator。
## stage-2
* 包含stage-3
* syntax-dynamic-import import引入路径支持变量
* transform-class-properties 编译静态属性(es2015)和属性初始化语法声明的属性(es2016)
## stage-1
* 包含stage-2
* transform-export-extensions
## stage-0
* 包含stage-1
* transform-do-expressions 编译do表达式
* transform-function-bind 编译bind运算符，也就是::

## babel-plugin-transform-runtime和babel-polyfill
Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。
例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，
以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。
如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。
* babel-runtime 使用场景
```
Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，
例如，{ [name]: 'JavaScript' } 转译后的代码如下所示：

'use strict';
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var obj = _defineProperty({}, 'name', 'JavaScript');
类似上面的帮助函数 _defineProperty 可能会重复出现在一些模块里，导致编译后的代码体积变大。
Babel 为了解决这个问题，提供了单独的包 babel-runtime 供编译模块复用工具函数。

```
参考：https://segmentfault.com/q/1010000005596587<br>
https://www.npmjs.com/package/babel-plugin-transform-runtime