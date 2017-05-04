# 单页应用的数据流方案探究

### 组件化

> [MDN的web component定义](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

> 个人理解

一个组件就是一个View(视图)，这个视图包含html，js(自身业务逻辑)，css(私有)。
组件就是将整个页面分割成一个个小的单元，这些单元组成了一个倒立的组件树。
组件之间互不影响，但可以通信，使用一个组件只需要在组件树中添加一个节点，
删掉这个节点也不影响其它组件，从而实现高内聚，低耦合。

> 组件化的实现

* Vue Components
* React Components
* Angular Directives

### Model-Driven-View

> 一个Component就是一个View，View又是由Model驱动的

```
  view = f(state)
```

> 当数据模型产生变化的时候，其对应的视图也会随之变化
```
  view + Δview = f(state + Δstate)
```

> 数据的变化又是由用户动作引起的
```
  Δstate = reducer(action)
```

> 将这些变化的状态和最初的状态叠加起来就是当前的状态，这也是Redux的核心理念

```
  state := states.reduce(Δstate, initState)
```

数据的变化导致视图变化，怎么收集和组织这些变化数据源，特别是一些异步处理

### Reactive Programming

* [RxJS](https://github.com/Reactive-Extensions/RxJS)
* [xstream](https://github.com/staltz/xstream)
* [most](https://github.com/cujojs/most)

### 组件与状态

> 组件间通信

![avatar](./props-events.png)

* 父组件通过props传递给子组件
* 子组件通过事件通知父组件
* props可以多级传递

> 问题

组件嵌套太深，数据传递繁琐，兄弟组件之间如何通信

### Redux

### Vuex









```
单页应用的数据流方案探究
数据驱动视图
view = f(state)
view + Δview = f(state + Δstate)



Vue VS React + MobX

rxjs

vue-rx

```
