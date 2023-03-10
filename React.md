# PART1 Basics

## 1.create

### 1.1.How do you create a React app?

- make sure our computer has npm or yarn
- for yarn: yarn create react-app [name]

### 1.2.render()

- is used to display component on the page
- function components do not need this function

### 1.3.create a list with keys

```jsx
{
    persons.map((p)=>{
        return <li key={p.id}>{p.name}--{p.age}</li>
    })
}
```

### 1.4.higher-order component

- acts as a container for other components.
- generally, when multiple components use a same logic, we can use it.
- example: memo(), withRouter()

## 2.state

### 2.1.what is state :o:

- plain JavaScript object
- holds information or data about the component
- influences component render

### 2.2.setState() :o:

- change the state of component
- If change state directly instead of using setState() function, component won’t re-render.

### 2.3.two ways to use setState() :o:

- setState(newValue)
- setState(preValue => preValue +1)

### 2.4.useState() :o:

- accepts an initial value of state as argument
- return an array with two elements: state and setState()

## 3.props :o:

- plain JavaScript object
- It’s similar to attributes of HTML tags
- provide a way to pass data from parent component to child component

## 4.ref :o:

### 4.1.what is ref

- is used to get the value of the specified element.

### 4.2.useRef() :o:

- step1: create a ref using useRef() function, like myRef
- step2: pass myRef to the specified element
- step3: use myRef.current.value to get the value

```jsx
const myRef = useRef()

<input type="text" ref={myRef} />

const show = () => {
        alert(myRef.current.value)
}
```

## 5.event & function

### 5.1.What is the difference between HTML and React event handling?

- In HTML, we use lowercase to name events. But in React, we use camelCase to name events.

- In HTML, we pass a string form of calling a function as the event handler. But in React, we just pass a function wrapped by curly bracket.

- In HTML, we can return false to prevent default behavior. But in React, we must call preventDefault() function.

### 5.2.create variables and functions

```jsx
const myRef = React.useRef()
const show = ()=>{alert(myRef.current.value}

<input type=“text” ref={myRef} />
<button onClick={show}>show</ button>
```

### 5.3.事件的回调的写法

1. 五参数
   
   ```jsx
   //定义函数，将其赋值给handleSubmit变量
   const handleSubmit = (event) => {
       event.preventDefault()
       alert(`你输入的用户名是${username}，密码是${password}`)
   }
   
   //给事件绑定函数 
   //注意不能是handleSubmit(),这样会直接在此处调用函数，而不是等事件触发才调用函数
   <form onSubmit={handleSubmit}>
   ```
   
   ```jsx
   //直接声明函数，并将其绑定给事件
   <form onSubmit={event => {
           event.preventDefault()
           alert(`你输入的用户名是${username}，密码是${password}`)
       }
   }>
   ```

2. 多参数
   
   ```jsx
   //定义函数，将其赋值给saveFormData变量，同时函数是返回值也是一个函数
   const saveFormData = (dataType) =>{ 
       if (dataType === 'username'){
           return (event) => setUsername(username => username = event.target.value)
       }
       if (dataType === 'password'){
           return (event) => setPassword(password => password = event.target.value)
       }
   }
   //给事件绑定函数 
   //这里调用了saveFormData()函数，并将其返回值的函数绑定给了事件
   用户名: <input onChange={saveFormData('username')} type="text" name="username"></input>
   密码: <input onChange={saveFormData('password')} type="password" name="username" autoComplete="off"></input>
   ```
   
   ```jsx
   //定义返回值调用的函数
   const saveFormData = (dataType, event) =>{ 
       if (dataType === 'username'){
           return setUsername(username => username = event.target.value)
       }
       if (dataType === 'password'){
           return setPassword(password => password = event.target.value)
       }
   }
   //直接声明函数，并将其绑定给事件
   //当事件触发，调用函数时，其返回值会再调用另一个函数
   用户名: <input onChange={event => saveFormData('username', event)} type="text" name="username"></input>
   密码: <input onChange={event => saveFormData('password', event)} type="password" name="username" autoComplete="off"></input>
   ```

## 6.lifecyle and useEffect() :o:

### 6.1.componentDidMount() :o:

- executes when the component gets rendered and placed on the DOM.

### 6.2.componentWillUnmount() :o:

- executes before a component is destroyed and unmounted.

### 6.3.useEffect() :o:

- mutations, subscriptions, timers, logging, and other side effects need to place in this function
- accepts two arguments: first is a callback function, second is an array.
- If the array is empty, the callback function runs after every completed render. In some way, it's similar to lifecycle method componentDidMount(). If not empty, the callback function run depends on when the value in the array has changed.
- The callback function can have a return function as a clean-up function. The clean-up function runs before the component is removed from the UI. It's similar to lifecycle method componentWillUnmount().

# PART2 redux

## 1.创建redux

```
redux
|
|-----store.js
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
|
|-----constant.js
```

## 2.连接

1. 项目入口 - index.js
   
   ```jsx
   //Provider包裹App
   <Provider store={store}>
     <App/>
   </Provider>
   ```

2. store.js
   
   ```jsx
   //使用createStroe()方法创建store并暴露
   export default createStore()
   ```

## 3.store.js

- 引入中间件和reducer

```jsx
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducers'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
```

## 4.actions目录

- 创建具体状态的action文件: xxx1.js

- 创建同步action及constant.js中type的字符串

- 根据同步action可以创建异步的action

```jsx
//从constant.js文件中引入type的值
import 常量名 from '...'

//先创建一个同步action
const getApi = data => ({type:GETAPILIST, data})

//再创建一个异步action，派发这个同步action，并暴露
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

//-----------------
// 在constant.js中
export const 常量名 = 'type的类型'
```

## 5.reducers目录中

1. index.js文件中，合并各状态的reducer
   
   ```jsx
   import {combineReducers} from 'redux'
   
   import xxx1 from './xxx1'
   import xxx2 from './xxx2'
   
   export default  combineReducers({
     xxx1,
     xxx1
   })
   ```

2. 具体状态的reducer文件xxx1.js中
   
   ```jsx
   //从constant.js文件中引入type的值
   import 常量名1, 常量名2 from '...'
   
   //设置state的初始值，如果是对象，则给对象的每个属性一个初始值
   const initState1 = 0
   const initState2 = {
     mouseIn: false,
     list: [],
   }
   
   //暴露函数，给函数的参数1赋默认值
   export default function countReducer(state = initState,action){
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

## 6.组件使用redux中的状态

1. useSelector(): use it ot get state from redux. It's similar to mapStateToProps.

2. useDispatch(): use it to dispatch actions to update states.

```jsx
//获取redux中的
const xx1 = useSelector(state => state.xx1)
const xx2 = useSelector(state => state.xx2)

//创建dispatch，用来使用操作state的方法
const dispatch = useDispatch()

//使用redux中的state和操作state的方法
xx1
xx2
dispatch(action1(数据实参))
dispatch(action2(数据实参1,数据实参2))
```

## 7.Redux Thunk

- It's a middleware

- allow our action creators to return a function instead of an action object.

- because of it, we can write async codes in an actions.js file

# PART3 router

## 1.BrowserRouter & HashRouter

- wrap `<App />` component with `<BrowserRouter>` or `<HashRouter>` component to use Router in react project.

```jsx
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
)
```

## 2.Link & NavLink

- The `<Link>` and `<NavLink>` component is used to navigate the different routes on the site.

- `to` attribute indicates the link location.

- `activeClassName` attribute of `<NavLink>` is used to add the style to `<NavLink>`

```jsx
<Link to="/about">About</Link>
<NavLink to="/home" activeClassName="navActive">About</NavLink>
```

## 3.Switch & Route & Redirect

- `<Switch>` - wrap `<Route />` and `<Redirect />` with `<Switch>` to ensure only one page will display at one time.

- `<Route />` component is to render specified UI when its path matches the current URL.

- `<Redirect />` - if no `<Route />` path matches current URL, `<Redirect />` will navigate to a new location according to the value of its `to` attribute.

```jsx
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
</Switch>
```

## 4.exact attribute & nested router

- The nested routes must contain their ancestor routes' path.

- `exact` attribute means only when the path exact matches the current URL, the specified UI will be rendered.

```jsx
<Route exact={true} path="/about" component={About}/>
<Route exact path="/about" component={About}/>
```

## 5.pass URL parameters

1. There are 3 ways to pass and receive URL parameters.
   
   1. Use params property of match object.
   
   2. Use search property of location object.
   
   3. Use state property of location object

2. params
   
   1. pass value to `<Link />`
   
   2. pass key name `<Route />`
   
   3. use `props.match.params` or `useParams()` to receive and use url parameters

```jsx
1.params参数
    路由链接(携带参数)：<Link to='/demo/test/tom/18'}>详情</Link>
    注册路由(声明接收)：<Route path="/demo/test/:name/:age" component={Test}/>
    接收参数：props.match.params
            const {name,age} = useParams()
2.search参数
    路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'}>详情</Link>
    注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
    接收参数：props.location.search
    备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
3.state参数
    路由链接(携带参数)：<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
    注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
    接收参数：props.location.state
    备注：刷新也可以保留住参数
```

## 6.withRouter

- `withRouter` is a higher-order component that enable normal component to get access to history or location object’s properties.

- The way to use it is very simple. we just take a normal component as an argument of `withRouter` component.

```jsx
class Header extends Component { ... }

export default withRouter(Header)
```

- Then, we can use `push(), replace(), goBack(), goForward(), go()` method from `props.history` or by using `useHistory`hooks

```jsx
props.history.push()
props.history.replace()
props.history.goBack()
props.history.goForward()
props.history.go()

//---------------------------------------

const LOCATION = useLocation()
console.log(LOCATION===props.location)

const HISTORY = useHistory()
console.log(HISTORY===props.history)
```

## 7.LazyLoad in Router

- `lazy` function lets us render a dynamic import as a regular component.

- The lazy component should be rendered inside a `Suspense` component, which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.

- The `fallback` prop accepts any React elements that you want to render while waiting for the component to load.

```jsx
//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
const Login = lazy(()=>import('.../pages/Login'))

//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
return(
    <Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
)
```

# PART4 other hooks

## 1.useMemo() & memo()

### 1.1.why

- When parent component re-renders, even though child component doesn’t have any change, it will re-render too. (useMemo&memo)
- There are some huge data or calculation in a component. When others tiny data have changed, the huge things will re-render too. But we don’t want it because it will cause re-rendering slow. (useMemo)

## 1.2.useMemo()

- accepts two arguments: a callback function namely a compute function, an array namely dependencies
- During first rendering, useMemo(compute, dependencies) will call the compute function, memorize and return the calculation result.
- when it comes to next render, if dependencies have changed, the compute function will be called again. A new value will be memorized and returned.
- if not changed, the compute function will not be called.

## 2.useCallback

- it’s similar to useMemo.
- useMemo memorizes a result of a callback function. But useCallback memorize the callback function itself.

## 3.useContext

## 3.1.why

- Context is designed for sharing data from a component to its descendant components.
- useContext allow descendant components to receive the data from its ancestor component.

## 3.2.steps

- step1: use createContext() function to create a Context object
  
  ```jsx
  Const MyContext = React.createContext()
  ```

- step2: use wrap child component with Context.Provider component 
  
  ```jsx
  <MyContext.Provider value={data}>
      <B />
  <MyContext.Provider />
  ```

- step3: in descendant component, we can use useContext to receive and use the data from its ancestor component.
  
  ```jsx
  Const {xxx, setXxx} = useContext(MyContext)
  ```

## 4.useReducer

- we usually combine useReducer and Context to create a mini redux.
- I rarely use it, so I can’t explain it exactly. But I don’t think it’s a problem, it’s not hard to learn.
