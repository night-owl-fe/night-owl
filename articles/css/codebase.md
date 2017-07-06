# CSS编码规范

1. 2个空格代码tab
2. 每个选择器单独一行
3. 每个规则单独一行
4. 分号结尾
5. 不要id选择器
6. 选择器全部小写
7. 对于0值的不要单位
8. 不使用*选择器
9. 避免不必要的嵌套，最多不要超过3层
10. 不要下划线_和驼峰，只允许横线 -
11. 使用class当JS选择器时，使用.js-* 开头表示这是一个js选择器，不能有样式
12. 基于最近的父 class 或基本（base） class 作为新 class 的前缀
13. 尽量使用class选择器
14. 只有在必要的时候才将 class 限制在最近的父元素内

## 严格的属性的顺序

> 大致

* Positioning
* Box model
* Typographic
* Visual

> [twitter/recess规则](https://github.com/twitter/recess/blob/master/lib/lint/strict-property-order.js#L36)

* position
* top
* right
* bottom
* left
* z-index
* display
* float
* width
* height
* max-width
* max-height
* min-width
* min-height
* padding
* padding-top
* padding-right
* padding-bottom
* padding-left
* margin
* margin-top
* margin-right
* margin-bottom
* margin-left
* margin-collapse
* margin-top-collapse
* margin-right-collapse
* margin-bottom-collapse
* margin-left-collapse
* overflow
* overflow-x
* overflow-y
* clip
* clear
* font
* font-family
* font-size
* font-smoothing
* osx-font-smoothing
* font-style
* font-weight
* hyphens
* src
* line-height
* letter-spacing
* word-spacing
* color
* text-align
* text-decoration
* text-indent
* text-overflow
* text-rendering
* text-size-adjust
* text-shadow
* text-transform
* word-break
* word-wrap
* white-space
* vertical-align
* list-style
* list-style-type
* list-style-position
* list-style-image
* pointer-events
* cursor
* background
* background-attachment
* background-color
* background-image
* background-position
* background-repeat
* background-size
* border
* border-collapse
* border-top
* border-right
* border-bottom
* border-left
* border-color
* border-image
* border-top-color
* border-right-color
* border-bottom-color
* border-left-color
* border-spacing
* border-style
* border-top-style
* border-right-style
* border-bottom-style
* border-left-style
* border-width
* border-top-width
* border-right-width
* border-bottom-width
* border-left-width
* border-radius
* border-top-right-radius
* border-bottom-right-radius
* border-bottom-left-radius
* border-top-left-radius
* border-radius-topright
* border-radius-bottomright
* border-radius-bottomleft
* border-radius-topleft
* content
* quotes
* outline
* outline-offset
* opacity
* filter
* visibility
* size
* zoom
* transform
* box-align
* box-flex
* box-orient
* box-pack
* box-shadow
* box-sizing
* table-layout
* animation
* animation-delay
* animation-duration
* animation-iteration-count
* animation-name
* animation-play-state
* animation-timing-function
* animation-fill-mode
* transition
* transition-delay
* transition-duration
* transition-property
* transition-timing-function
* background-clip
* backface-visibility
* resize
* appearance
* user-select
* interpolation-mode
* direction
* marks
* page
* set-link-source
* unicode-bidi
* speak

## css 优化建议：[缩小样式计算的范围并降低其复杂性](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

> 样式计算对时间50%是用来匹配选择器，另一半时间用于从匹配的规则中构建 RenderStyle
 * 降低选择器的复杂性；使用以类为中心的方法，例如 BEM
 * 减少必须计算其样式的元素数量