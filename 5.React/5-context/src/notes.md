## (一) Class Component 的Context

1. 使用createContext()在组件外创建Contex

   ```jsx
   const XxxContext = React.createContext()  
   ```

2. 父组件A渲染时，将子组件B外用xxxContext.Provider包裹，并通过value传递数据给后代

   ```jsx
   <xxxContext.Provider value={数据}>
       <B />
   </xxxContext.Provider>
   ```

3. 后代C组件通过static contextType声明接收context，再读取数据

   ```jsx
   // 声明接收context
   static contextType = xxxContext  
   // 读取context中的value数据
   this.context 
   ```

## (二)  Hooks Component 的Context

1. 使用createContext()在组件外创建Contex

   ```jsx
   const XxxContext = React.createContext()  
   ```

2. 父组件A渲染时，将子组件B外用xxxContext.Provider包裹，并通过value传递数据给后代

   ```jsx
   <xxxContext.Provider value={数据}>
       <B />
   </xxxContext.Provider>
   ```

3. 后代C组件通过useContext解构赋值接收context对象中的具体数据或方法

   ```jsx
   // 声明接收context
   const {xxx, setXxx} = useContext(XxxContext) 
   ```

## (三) 接收Context的通用方法(class和hooks均可)

- 后代C组件通过xxxContext.Consumer包裹一个函数来接收

  ```jsx
  //第二种方式: 函数组件与类组件都可以
  <xxxContext.Consumer>
  	{
  		// value就是context中的value数据
  		value => (
  			要显示的内容
  		)
  	}
  </xxxContext.Consumer>
  ```

  