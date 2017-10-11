const h = require('./vnode')

const ntree = h('div', { className: 'container' }, [
  h('ul', { id: 'list' }, [
    h('li', { key: 1 }, 'hello'),
    h('li', { key: 2 }, 'world')
  ]),
  h('h1'),
  h('p')
])

ntree.toString()

ntree.render()