// 缓存元素展示方式
let elementDisplay = {}
// 获取元素的默认展示方式,创建一个节点添加到body的后面获取其display,再将其删除
export default function defaultDisplay (nodeName) {
  let element, display
  if (!elementDisplay[nodeName]) {
    element = document.createElement(nodeName)
    document.body.appendChild(element)
    display = getComputedStyle(element, '').getPropertyValue("display")
    element.parentNode.removeChild(element)
    // 如果display等于none，默认是block
    display === "none" && (display = "block")
    elementDisplay[nodeName] = display
  }
  return elementDisplay[nodeName]
}