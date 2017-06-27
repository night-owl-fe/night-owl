# Vuex

store的state和getters就是new Vue()的data和computed
```
store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: getters
})
```

因为vue的相应系统，当state和getters绑定到vue组件的computed时自然也是响应式

> 简单来说
```
// vuex
const state = new Vue({
  data: {
    name: ‘hello’			
  }
}).$data

// component
const vm = new Vue( {
  computed: {
    name () {
      return state.name
    }
  }
})

// 修改state
state.name=’vue’
// vm会同步
vm.name === ’vue’ // true
```

> strict:严格模式

只能通过mutation修改，直接修改会报错。
对state进行深监听，判断内部状态_committing是否是false，当是false，说明不是通过mutation修改。
通过mutation修改的好处是，每次修改都会通知订阅者最新的状态，这对一些插件很有用，可以监听这些变化，获取
当前最新的状态。
如devtool插件，可视化观察数据变化，还可方便会退的某一版本

> state

不能直接对state={}替换，需要显示的使用replaceState，这个也是为了避免在严格模式出错。
因为state就是vue实例的data，所以规则同data，当添加属性时，要通过Vue.set()的方式

> getters

就是computed, 模块中的getters会提升

> 其他

vuex依赖promise
