// 数据模型
var data = {
  ma: {
    "person": {
      "name": "Jon",
      "age": 3
    },
    "province": [{
      "name": "广东",
      "cities": ["深圳", "广州", "珠海"]
    },
      {
        "name": "陕西",
        "cities": ["西安", "汉中", "咸阳"]
      }]
  },
  mb: {
    student: {
      id: 1,
      name: 'li'
    }
  },
  static: true
}
const { combineReducers, createStore } = require('redux')

function person (state = {}, action) {
  switch (action.type) {
    case 'person':
      return Object.assign({}, state, action.person)
    default:
      return state
  }
}

function province (state = [], action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          name: action.name,
          cities: action.cities
        }
      ]
    default:
      return state
  }
}

function student (state = {}, action) {
  switch (action.type) {
    case 'student':
      return Object.assign({}, state, action.student)
    default:
      return state
  }
}

function static (state = true, action) {
  switch (action.type) {
    default:
      return state
  }
}

let store = createStore(combineReducers({
  ma: combineReducers({
    person,
    province
  }),
  mb: combineReducers({
    student
  }),
  static
}))

// 打印初始状态
// console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
  console.log(JSON.stringify(store.getState()))
)

store.dispatch({
  type: 'xxxx'
})

// store.dispatch({
//   type: 'person',
//   "person": {
//     "name": "Jon",
//     "age": 3
//   }
// })

// store.dispatch({
//   type: 'add',
//   "name": "广东",
//   "cities": ["深圳", "广州", "珠海"]
// })
//
// store.dispatch({
//   type: 'student',
//   student: {
//     id: 1,
//     name: 'li'
//   }
// })