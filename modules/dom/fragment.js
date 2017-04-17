import { attr } from './attr'
var fragmentRE    = /^\s*<(\w+|!)[^>]*>/,
    singleTagRE   = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    table         = document.createElement('table'),
    tableRow      = document.createElement('tr'),
    containers    = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig

// 简单html片段处理函数
// 摘抄zepto
export default function fragment (html, name, properties) {
  var dom, container

  // A special case optimization for a single tag
  if (singleTagRE.test(html)) dom = document.createElement(RegExp.$1);

  if (!dom) {
    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'

    container = containers[name];
    container.innerHTML = '' + html;
    var childNodes = container.childNodes;
    var list = [];
    //避免死循环
    var count = 0;
    while (childNodes.length > 0 && count < 100) {
      var _dom = container.removeChild(childNodes[0]);
      properties && attr(_dom, properties);
      list.push(_dom);
      count++;
    }
    if (list.length === 1) {
      dom = list[0];
    } else {
      dom = list;
    }

  } else {
    properties && attr(dom, properties);
  }

  return dom
}
