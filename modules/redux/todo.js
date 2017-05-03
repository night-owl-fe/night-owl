/**
 * 标题 redux demo
 * 描述
 * 创建日期 2017/5/3 上午11:38
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

/**
 * ************************************
 * action
 * ************************************
 */

/*
 * action 类型
 */

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */

function addTodo (text) {
  console.log('addTodo')
  return { type: ADD_TODO, text }
}

function toggleTodo (index) {
  console.log('toggleTodo')
  return { type: TOGGLE_TODO, index }
}

function setVisibilityFilter (filter) {
  console.log('setVisibilityFilter')
  return { type: SET_VISIBILITY_FILTER, filter }
}

/**
 * ************************************
 * reducers
 * ************************************
 */

const { combineReducers } = require('redux')
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter (state = SHOW_ALL, action) {
  console.log('visibilityFilter')
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos (state = [], action) {
  console.log('todostodos')
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

// console.log(todoApp({}, {}))

function todoApp2 (state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
/**
 * ************************************
 * store
 * ************************************
 */

const { createStore } = require('redux')

let store = createStore(todoApp)

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe();