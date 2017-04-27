# CSS
决定一个属性的值计算过程：
1. 用户自定义
2. 1没找到，如果属性可以继承，则继承父元素
3. 2没找到，浏览器自定义
4. 3没找到，使用最初值initial

# initial
[w3c Full property table](https://www.w3.org/TR/CSS21/propidx.html)
# Inherit
继承父元素的计算后的属性

> 列举常见的属性是否继承

* ---NO---
* background(背景相关)
* border(边框相关)
* outline(边框相关)
* width/height
* position
* top/right/bottom/left
* z-index
* margin/padding
* outline
* overflow
* text-decoration
* vertical-align
* ---YES---
* font(字体相关)
* letter-spacing
* line-height
* list-style(列表样式相关)
* text-indent
* text-transform
* visibility
* word-spacing

# Revert
没有使用任何属性值，等同于这个属性的值没有设置一样
# Unset
一个属性如是是继承的就是Inherit，否则是initial