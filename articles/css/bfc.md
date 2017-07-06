# BFC(块级格式化上下文)

display: block, list-item, table

创建BFC：
* 根元素（html）
* float(元素的 float 不是 none)
* 绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
* display属性为下列之一:table-cell,table-caption,inline-block,flex,or inline-flex.
* 块元素具有overflow ，且值不是 visible

BFC规则:
* 内部的Box会在垂直方向，一个接一个地放置。
* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算

http://web.jobbole.com/91165/

# IFC

display: inline, inline-block, inline-table

# GFC

# FFC


