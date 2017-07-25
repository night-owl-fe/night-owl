# 性能优化

1. 减少HTTP请求
    * 合并css、js
    * 合并图片
    * 图片懒加载
    * 异步加载js
    * 合并css/js：nginx-concat， combo的url

2. cdn
    * 设置比较长的过期时间
    * 静态资源独立域名
    * http2 （减少3次握手，浏览器不限制请求次数）
    * 域名收敛 （使用http2，域名尽量减少）
    
3. 代码优化    
    * html懒加载改造
    * 减少css大小（去掉base64图片）减少js大小（去掉没用的代码，对于引入的一些工具库，不建议全量引入，可按需引入）
    * 避免在dom ready之前动态插入script
    * css在head中，js在body底部
    * 减少对DOM的操作（如列表，一次添加全部）
    * 压缩合并（webpack/gulp）
    
4. html优化
    * 使用无协议的url
    * 删除注释
    * 压缩空白符
    * 压缩inline css & Javascript
    * CSS&Javascript尽量外链
    * 删除元素默认属性
    * 去掉没用的标签，减少标签的使用
    * 以上目的是减少代码量
    
5. css优化
    * 去掉base64图片，改成雪碧图
    * 不使用*选择器
    * 避免不必要的嵌套，最多不要超过3层
    * 尽量使用class选择器
    * 只有在必要的时候才将 class 限制在最近的父元素内
    
6. js优化
    * 对高频触发的事件进行节流（debounce）或消抖（throttle）
    * 批量操作 DOM
    * requestAnimationFrame
    * 使用 transform 和 opacity 来完成动画
    * 按需加载资源
    * service workers

7. Vue优化
    * 如果<template>中有大量静态代码，可以提取出放在一个单独的组件中（或使用v-once），避免vue检测到数据变化时重新渲染不会改变的静态代码。（如果放在单独的组件中，不会重新渲染）
    * 在vue中使用for循环时，尽量添加key属性
    * 尽量使用vue的运行时环境
    * 使用refs获取dom元素
    
8. jQuery优化
    * 尽量使用 ID 代替 class
    * 给选择器一个上下文
    * 缓存 jQuery 对象与链式调用
    * 使用 DocumentFrame 的思想
    * 事件的委托处理
    * 最好直接使用原生API操作DOM
    
    
    
# 五阿哥首页优化
   
    1、合并css、js
    2、图片懒加载
    3、非必须首屏加载的js，都通过异步插入script标签来加载(等dom ready之后)或者设置async，code split
    4、img.wuage.com 中的资源设置比较长的过期时间
    5、减少css大小—去掉其中使用的base64格式的图片地址   (其中一个css从72K减少到了6K)
    6、第二个“钢材市场楼层”进行了html懒加载改造 -> 单独处理图片懒加载逻辑
    7、合并css/js：nginx-concat， combo的url
    8、避免在dom ready之前动态插入script
    9、css要放到js之前
    10、静态资源独立域名
    11、cdn
    12、http2 （减少3次握手，浏览器不限制请求次数）
    13、域名收敛 （使用http2，域名尽量减少）


## 白屏时间（first Paint Time）

用户从打开页面开始到页面开始有东西呈现为止

## 首屏时间

用户浏览器首屏内所有内容都呈现出来所花费的时间

## 用户可操作时间(dom Interactive)

用户可以进行正常的点击、输入等操作，默认可以统计domready时间，因为通常会在这时候绑定事件操作

## 总下载时间

页面所有资源都加载完成并呈现出来所花的时间，即页面 onload 的时间
