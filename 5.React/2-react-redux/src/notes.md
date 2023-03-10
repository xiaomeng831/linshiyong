## Redux

### 1.redux 目录结构

```
redux
|
|-----store.js
|
|-----constant.js
|
|-----actions
|        |
|        |-----xxx1.js
|        |-----xxx2.js
|
|-----reducers
|        |
|        |-----index.js
|        |-----xx1.js
|        |-----xx2.js
```

### 2.连接

- step1: in **index.js** file, wrap `App` component with `Provider` component

```jsx
<Provider store={store}>
    <App/>
</Provider>
```

- step2: create a **store.js** file,  call `createStore()` function and export it
  
  - In new version of redux, createStore has been replaced by `configureStore()`
  
  - https://redux.js.org/introduction/why-rtk-is-redux-today

```jsx
export default createStore();
```

### 3.store.js file

- In the store.js file, import **reducers**, redux **dev tools**, **middleware** such as **redux thunk**

```jsx
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducers'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
```

### 4.constant.js file

- create some constants for action types

- export them for action file and reducer file to use

```js
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
export const GETAPILIST = 'get_api'
export const ADD_PERSON = 'add_person'
```

### 5.actions directory

- Create each action.js file for each state.

- In an action.js file,
  
  - import action types in string form from constant.js file
  
  - create some sync actions or async actions and export them

```jsx
//从constant.js文件中引入type的值
import 常量名 from '...'

//创建一个同步action，这个action是在文件内部使用，所以无需暴露
const getApi = data => ({type:GETAPILIST, data})

//创建一个异步action，派发这个同步action，并暴露
export const getApiAsync = () => {
    return (dispatch) => {
        axios.get('api/mock.json')
        .then(res => {
            console.log(res)
            dispatch(getApi(res.data.data))
        })
        .catch(() => {
            console.log('error')
        })
    }
} 
```

### 6.reducers directory

- create an index.js file for combining every reducer

- in index.js file, use `combineReducers()` function to combine every reducer and export the function.

```js
import {combineReducers} from 'redux'

import reducer1 from './reducer1'
import reducer2 from './reducer2'

export default  combineReducers({
    reducer1,
    reducer2
})
```

- In a reducer.js file
  
  - import action types in string form from constant.js file
  
  - Initialize the state
  
  - create a pure function to update state according to the different action types and export the function

```js
//从constant.js文件中引入type的值
import 常量名1, 常量名2 from '...'

//设置state的初始值，如果是对象，则给对象的每个属性一个初始值
const initState1 = 0
const initState2 = {
    mouseIn: false,
    list: []
}

//暴露函数，给函数的参数1赋默认值
export default function countReducer(state = initState, action){
    //解构赋值，从action上拿到type和data
    const {type,data} = action
    //使用纯函数操作state
    switch (type) {
        case 常量名1:
            return state + data
        case 常量名2:
            return state - data
        default:
            return state
    }
}
```

### 7.useSelector() & useDispatch()

- useSelector(): use it to get state from redux. It's similar to mapStateToProps.

```js
const apiList = useSelector(state => state.apiList)
```

- useDispatch(): use it to dispatch actions to update states.

```js
// 需要引入action
import {getApiAsync} from '../redux/actions/apiList'

const dispatch = useDispatch()

dispatch(getApiAsync())
```

## Redux Thunk

- It's a middleware

- allow our action creators to return a function instead of an action object.

- because of it, we can write async codes in an actions.js file
