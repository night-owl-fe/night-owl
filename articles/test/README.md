# 测试

## karma
Karma是一个基于Node.js的JavaScript测试执行过程管理工具
Karma会启动一个web服务器在browsers（Chrome，PhantomJS...）中来执行源代码和测试代码
在每个browsers测试的结果通过命令行告知开发人员，成功还是失败了，还可以通过coverageReporter，生成对应目录，展示测试覆盖率

> Karma Configuration File 

karma可以通过配置文件统一处理options
查找配置文件如下
* ./karma.conf.js
* ./karma.conf.coffee
* ./.config/karma.conf.js
* ./.config/karma.conf.coffee

```javascript

// karma.conf.js
module.exports = function(config) {
  config.set({
    // files，exclude，preprocessors文件规则使用minimatch（https://github.com/isaacs/minimatch）
    
    // 在browser启动服务之前，Karma允许对files进行处理
    // 预处理插件列表
    // https://www.npmjs.com/browse/keyword/karma-preprocessor
    // 如karma-webpack https://github.com/webpack-contrib/karma-webpack
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    // 文件列表，源文件和测试文件
    files: [],
    // 排除的files
    exclude: [],
    
    // 文件更改自动执行
    autoWatch: false,
    // 文件更改后停留多长时间自动执行
    autoWatchBatchDelay: 500,
    // 执行的根目录，如果files，exclude，preprocessors是相对目录，则是相对于basePath的resolve
    // 如果basePath是相对目录，则是相对于__dirname
    basePath: '../..',
    // 引入全局测试库
    // 如mocha，chai，jasmine
    frameworks: ['jasmine'],
    // 浏览器执行捕获的列表，Karma启动，浏览器自动启动，Karma关闭，浏览器自动关闭
    // 浏览器列表：http://karma-runner.github.io/0.13/config/browsers.html
    browsers: ['PhantomJS'],
    // 插件 preprocessors，reporters，browser launchers，frameworks都是插件
    plugins:[],
    // 报告 
    // 如karma-spec-reporter（https://www.npmjs.com/package/karma-spec-reporter）
    // 如karma-coverage（https://www.npmjs.com/package/karma-coverage）
    reporters: ['spec', 'coverage'],
    specReporter: {
      maxLogLines: 5,             // limit number of lines logged per test 
      suppressErrorSummary: true, // do not print error summary 
      suppressFailed: false,      // do not print information about failed tests 
      suppressPassed: false,      // do not print information about passed tests 
      suppressSkipped: true,      // do not print information about skipped tests 
      showSpecTiming: false,      // print the time elapsed for each spec 
      failFast: true              // test would finish with error when a first fail occurs.  
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  });
};

```

## phantomjs
PhantomJS是一个基于webkit的javascript API。
它使用QtWebKit作为它核心浏览器的功能，使用webkit来编译解释执行JavaScript代码。任何你可以在基于webkit浏览器做的事情，它都能做到。
它不仅是个隐形的浏览器，提供了诸如CSS选择器、支持Web标准、DOM操作、JSON、html5、Canvas、SVG等，
同时也提供了处理文件I/O的操作，从而使你可以向操作系统读写文件等。PhantomJS的用处可谓非常广泛，诸如网络监测、网页截屏、无需浏览器的 Web 测试、页面访问自动化等。

## phantomjs-prebuilt
phantomjs支持命令行，prebuilt可以通过node来运行

## karma-phantomjs-shim
对phantomjs功能进行扩展
* CustomEvent
* Function.prototype.bind
* Object.assign
* String.prototype.includes
* String.prototype.repeat
* String.prototype.startsWith
* requestAnimationFrame

## karma-webpack
使用webpack预处理karma的files，就是处理文件入口

```javascript
// 基本配置
// Karma configuration
module.exports = function(config) {
  config.set({
    // ... normal karma configuration
    files: [
      // all files ending in "_test"
      {pattern: 'test/*_test.js', watched: false},
      {pattern: 'test/**/*_test.js', watched: false}
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/*_test.js': ['webpack'],
      'test/**/*_test.js': ['webpack']
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  });
};

// 以上配置会为每一个入口文件生成一个bundle，对于测试用例比较多的会生成许多大的文件，
// 下面的配置可以为所有的测试用例生成一个bundle

// Karma configuration
module.exports = function(config) {
  config.set({
    files: [
      // 仅仅需要一个入口文件，这个入口文件包含所有测试用例
      'test/test_index.js'
    ],

    preprocessors: {
      'test/test_index.js': ['webpack']
    }
  });
};

// 在test/test_index.js
// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context(".", true, /_test$/);
testsContext.keys().forEach(testsContext);

```

## Source Maps
使用karma-sourcemap-loader生成测试source maps <br>
npm install --save-dev karma-sourcemap-loader <br>
```
// karma preprocessors
preprocessors: {
  'test/test_index.js': ['webpack', 'sourcemap']
}

// webpack 
webpack: {
  devtool: 'inline-source-map'
}
```

## karma-spec-reporter
在控制台打印测试信息

## karma-coverage
生成代码覆盖率

## mocha karma-mocha
测试框架 https://mochajs.org/
## chai karma-chai
断言库 http://chaijs.com/
expect http://chaijs.com/api/bdd/
## sinon-chai
断言库 https://github.com/domenic/sinon-chai/
## jasmine karma-jasmine
测试框架 https://jasmine.github.io/