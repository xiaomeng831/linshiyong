## 1.state & useState()

### What

- holds data or imformation related to the component

- update the state to make component re-render

**create** the initial state and a fucntion to update the state

```jsx
const [count,setCount] = useState(0)
```

**use** the state

```jsx
<h2>当前求和为：{count}</h2>
```

**update** the state

```jsx
const add = () => {
    setCount(count => count + 1 )
}
```

### useState()

**useState()**

- has an argument as the initial value for state
- returns an array with two elements: state and setState()
- usually we use destructuring to get the two elements

```jsx
const [count,setCount] = useState(0)
```

### setState()

- updating the state must use setState function instead of updating the state straight

**two types** of argument of setState

```jsx
// the updated state
// setCount(newValue)
setCount(count + 1)
// a function
// setCount(preValue => prevalue + 1)
setCount(count => count + 1)
```

## 2.ref

- provides a way to access the DOM element to get its value.

### How use



**create** a ref

```jsx
const myRef = useRef()
```

**use** the ref

```jsx
<input type="text" ref={myRef}/>
```

**access** the DOM element

```jsx
const show = () => {
    alert(myRef.current.value)
}
<button onClick={show}>点我提示数据</button>
```

### Alternative way

需要取值的元素，和添加事件的元素**不是**一个时，使用ref

需要取值的元素，和添加事件的元素**是**一个时，可以使用e.target.value

```jsx
<input type="text" onChange={(e)=>{showWithNoRef(e)}}/>

const showWithNoRef= (e) => {
    alert(e.target.value)
}
```

## 3.props

- provide a way to pass data from parent component to child component
- It's kind of similar to attributes of HTML elements

```jsx
export const ComponentHooks = (props) => {
    return (
        <div>{props.name}</div>
    );
}
```

## 4.useEffect()

### What

It has two parameters, first is a callback function, second is an array.

- If the array or we just call it dependency is **empty**, useEffect() is similar to lifecycle method **componentDidMount()** and its first parameter, the callback function can return **a clean-up function** which is similar to lifecycle method **componentWillUnmount()**.

- If the dependency is **not empty**, the callback function **run** depends on when the dependency **has changed**.

- ~~mutations 不知道是啥~~, subscriptions, timers, logging, and other side effects need to place in this function

```jsx
React.useEffect(()=>{
    const timer = setInterval(()=>{
        setCount(count => count+1 )
    },1000)
    return ()=>{
        clearInterval(timer)
    }
},[])
```

### Others

如何卸载组件 (新方法: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)

```jsx
ReactDOM.unmountComponentAtNode(document.getElementById('root'))
```

## 5.render a component

A function component does not need render() function to therender component, just use **return value** to render the component.  

```jsx
return (
    <div>
        <input type="text" ref={myRef}/>
        <h2>当前求和为：{count}</h2>
        <button onClick={add}>点我+1</button>
        <button onClick={unmount}>卸载组件</button>
        <button onClick={show}>点我提示数据</button>
        <div>{props.name}</div>
    </div>
)
```

## 6.Event

### How use

有无参数，指函数绑定组件或html元素的时候

1. 无参数 - Event = myFunction 形式

```jsx
const handleSubmit = (e) => {
    e.preventDefault()
    alert(`你输入的用户名是${name}，密码是${password}`);
}

//有无参数指的是下面这里，绑定函数和元素的时候
<form onSubmit={handleSubmit}> 
```

2. 无参数 - Event = () => {} 形式

```jsx
<form onSubmit={(e)=>{
        e.preventDefault()
        alert(`你输入的用户名是${name}，密码是${password}`);
    }
}>
```

3. 带参数 - Event = myFunction(args) 形式 + 使用函数柯里化

```jsx
const saveFormData = (dataType) => {
    if(dataType === 'username'){
        return (e) => setUsername(username => username = e.target.value)
    }
    if (dataType === 'password'){
         return (e) => setPassword(password => password = e.target.value)
    }
}


<input onChange={saveFormData('username')} type="text" name="username" />
<input onChange={saveFormData('password')} type="password" name="password" />
```

- 带参数 - Event = () => { myFunction(args) } 形式

```jsx
const saveFormData = (dataType, e) =>{ 
    if (dataType === 'username'){
        return setUsername(username => username = e.target.value)
    }
    if (dataType === 'password'){
        return setPassword(password => password = e.target.value)
    }
}


<input onChange={e => saveFormData('username', e)} type="text" name="username" />
<input onChange={e => saveFormData('password', e)} type="password" name="password" />
```

### Some tips

1. 和普通HTML元素的区别
   
   1. onclick -  **lowercase**
      
      onClick -  **camel case**
   
   2. onclick = "myFunction()" - **string, calss**
      
      onClick = {myFunction} or { () => {} } -  **curly brackets, not call**

2. 本质: 事件必须绑定一个函数的定义形式，不是调用形式(即不带`()`括号)
   
   1. myFunction
   
   2. () => {}
   
   3. myFunction()形式下，其return值一定是 myFunction2 或 ()=>{} 两种形式
