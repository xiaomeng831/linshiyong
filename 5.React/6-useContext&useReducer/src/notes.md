### 1.储存状态的XxxProvider组件.jsx

1. 创建xxxContext

   ```jsx
   export const xxxContext = createContext()
   ```

2. 创建一个XxxContext.Provider组件，在其中使用useReducer

   ```jsx
   export const CountProvider = (props) => {
       /*
       	useReducer： 
       	参数1：xxxReducer函数，用来加工数据
       	参数2：状态的初始值
       	返回值1：状态
       	返回值2：dispatch，用来分发动作，匹配xxxReducer函数的加工数据的方式
       */
       const [xxx, dispatch] = useReducer(xxxReducer,0)
       return(
           <XxxContext.Provider value={{xxx, dispatch}}>
               {props.children}
           </XxxContext.Provider>
       )
   }
   ```

3. 创建xxxReducer函数，来加工数据

   ```jsx
   const initState = ...
   export function xxxReducer(state = initState, action){
   	const {type, xxx} = action
   	switch (type) {
   		case ...:
   			return ...
   		default:
   			return state
   	}
   }
   ```

### 2.使用状态的普通组件.jsx

1. 引入创建的xxxContext

   ```jsx
   import { XxxContext } from '...'
   ```

2. 使用useContext(xxxContext)接收数据和方法

   ```jsx
   //注意这里解构赋值的是对象，而不是跟其他useXxx一样的数组
   const {xxx, dispatch} = useContext(XxxContext)
   ```

   

