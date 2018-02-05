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

### 源码解析

Vuex暴露出来的api主要有Store，install，和mapState,mapGetters等帮助函数，

先来说说install，install是Vue的规范了，每一个Vue插件都需要暴露一个install函数，用于

和Vue进行绑定。install会接受一个vue局部变量，会赋值给全局的vue变量并export出去，方便使用，这里提醒

我们在使用Vue时，不要通过import导入，避免不必要的依赖。在install中会使用全局混合，将根组件的store选项

绑定到每一个组件上，具体实现是，在beforeCreate钩子中，根组件查看是否有store选项，如果有就绑定到组件实例上，

其他组件，通过父组件的parent.$store绑定到自己的实例上来实现。


接下来说一下Store，Store是Vuex的核心，所有的模块都依赖它。Store是一个类，通过new 生成一个Store实例。

下面说一下大致流程：

1. 首先会执行两个断言，一个是判断Vue是否存在，也就是Vuex是否安装了，另一个是promise是否存在，因为Vuex依赖Promise，

如果项目在ie9上运行，需要引入一个Promise polyfill库。断言函数很简单，不过这种使用方式，值得推荐
```javascript
function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
```

2. 初始化内部数据，对dispatch和commit重写，主要是绑定上下文。

```javascript
// 是否正在提交，主要判断用户是通过commit提交数据，还是直接修改
this._committing = false
// 所有actions集合
this._actions = Object.create(null)
// 监听dispatch动作的回调函数
this._actionSubscribers = []
// 所有mutation的集合
this._mutations = Object.create(null)
// 所有getter的集合
this._wrappedGetters = Object.create(null)
// 模块集合
this._modules = new ModuleCollection(options)
// 模块命名空间的集合
this._modulesNamespaceMap = Object.create(null)
// 监听commit动作的回调函数
this._subscribers = []
// 监听数据变化，避免直接设置数据
this._watcherVM = new Vue()

// 绑定上下文，没有bind而是通过新建函数，考虑性能问题？
const store = this
const { dispatch, commit } = this
this.dispatch = function boundDispatch (type, payload) {
  return dispatch.call(store, type, payload)
}
this.commit = function boundCommit (type, payload, options) {
  return commit.call(store, type, payload, options)
}
```

3. 安装模块，vuex对Store传进来的参数options进行拆解，按照模块进行划分，构建成一个状态树，如何实现的呢

主要有这几步：
* 划分命名空间
* 本地化上下文，目的是，在同一个模块中state，getters，dispatch和commit可以不依赖命名空间，方便调用
* 将子模块的State绑定到父模块的State上，key是模块名
* 注册模块的Mutation
* 注册模块的Action
* 注册模块的Getter
* 遍历子模块，子模块进行模块注册

```javascript
// 模块集合
this._modules = new ModuleCollection(options)
// 初始化根模块，递归安装子模块，需要注意根组件的路径path=[]空数组，子模块的路径是在父模块的基础上拼接在一起的
installModule(this, state, [], this._modules.root)
```

看一下installModule如何实现

```javascript
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  // [a,b] => a/b，将路径进行拼接
  const namespace = store._modules.getNamespace(path)

  // 在_modulesNamespaceMap记录所有命名空间，方便以后dispatch和commit查找
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module
  }

  // set state 将模块的State绑定到父模块的State上，模块名作为key
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    // vuex内部修改数据，不需要校验是否通过commit来修改数据
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state)
    })
  }

  // 绑定本地上下文，为下面绑定mutation，action，getter
  const local = module.context = makeLocalContext(store, namespace, path)

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
```

4. 绑定Store的state和getters

在经过上一步，state和getters已经收集完成，下面开始绑定
```javascript

function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // 绑定到getters上的数据
  store.getters = {}
  // 收集到的getters数据
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  // 使用Vue实例存储状态树
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // 在严格模式下，通过vm.$watch深监听数据修改，判断其是否是通过commit提交改变的
  if (store.strict) {
    enableStrictMode(store)
  }

  // 释放旧vm资源，之所以会有oldVm,是因为可以动态的注册模块
  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```

5. dispatch

```javascript
function dispatch (_type, _payload) {
    // 对参数格式化统一风格
    const {
      type,
      payload
    } = unifyObjectStyle(_type, _payload)

    const action = { type, payload }
    const entry = this._actions[type]
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown action type: ${type}`)
      }
      return
    }
    // 通知订阅
    this._actionSubscribers.forEach(sub => sub(action, this.state))
    // Promise化返回
    return entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)
  }
```

6. commit

```javascript
function commit (_type, _payload, _options) {
    // 对参数格式化统一风格
    const {
      type,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options)

    const mutation = { type, payload }
    const entry = this._mutations[type]
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown mutation type: ${type}`)
      }
      return
    }
    // 执行commit的状态修改函数
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })
    // 通知订阅
    this._subscribers.forEach(sub => sub(mutation, this.state))
  }
```

7. vuex插件开发，插件开发比较简单，只是一个不同的函数，vuex在初始化时会调用这些插件，给其传一个Store

的实例，一般store.subscribe监听数据变化就行了