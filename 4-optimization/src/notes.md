## (一) Class Component 优化

### 1.问题

1. 当setState被执行时，及时不改变state，也会重新渲染当前组件
2. 父组件重新渲染，即使子组件不发生任何改变，也会重新渲染

### 2.原因

- 上述两个问题产生的原因，是类式组件的生命周期中shouldComponentUpdate()总是返回true

### 3.解决

1. 重写shouldComponentUpdate()方法，比较新旧state和props
2. 使用PureComponent

### 4.其他知识点 - state修改与新旧数据

- 修改state值，一定要产生新的数据，不要直接修改原数据。

> (不确定猜想)原因可能是react的浅比较，两次比较发现state中的数组指向没有变化，而不是关系数组的值有没有变化

```jsx
//state中的数据
state = {carName:"奔驰c36",stus:['小张','小李','小王']}

//错误做法，unshift会在原数组内添加数据
this.setState({stus: this.state.stus.unshift('小刘')})
//正确做法，展开运算符会生成一个新的数组，再向里面添加数据
this.seState({stus: ['小刘',...this.state.arr]})

//错误做法
const obj = this.state //obj和this.state指向同一个对象，而不是生成了一个新的对象
obj.carName = '迈巴赫'
console.log(obj === this.state);
this.setState(obj)
//正确做法
this.setState({carName:'迈巴赫'})
```

## (二) Hooks Component 优化

### 1.问题

1. **问题**：组件中存在计算量庞大的数据值A，当其他值B，C，D...发生改变时，组件会渲染所有数据包括A，从而造成运行缓慢。

   **解决**：可以使用useMemo给数据A缓存，即数据A不发生改变，不会重新渲染数据A的内容

2. **问题**：父组件重新渲染，即使子组件不发生任何改变，也会重新渲染。

   **解决**：可以使用React.memo()或useMemo解决

### 2.React.memo()

1. 解决子组件重新渲染

   ```jsx
   //子组件
   const Childmemo = (props) => {
       "渲染内容"
   }
   export default memo(Childmemo)
   ```

2. 使用说明

   1. memo()接收两个参数，第二个参数位可选值，用来接收一个对比前后props的函数
   2. React.memo只能用来对比props的改变，对useState,useReducer和useContext无效

### 3.useMemo()

1. 解决重复渲染计算量庞大的数据

   ```jsx
   //正常情况，更改组件的state，重新渲染时会再次调用bigNumFunc()，渲染num
   const ParentH = () => {
       //组件的state
       const [stus, setStus] = useState(['小张','小李','小王'])
       //更改state的方法
       const addStu = () => {
   		setStus(stus => stus = ['小刘',...stus])
   	}
   	//计算量庞大的函数
       const bigNumFunc = () => {
           let num = 0
           for (let i = 0; i < 777777777; i++){
               num++
           }
           return num
       }
       
   	//渲染该函数
       return （
       		<>
           		{stus}<br />
           		{bigNumFunc()}
       		</>
       ）
   }
   ```

   ```jsx
   //优化处理，更改组件的state，重新渲染时不会重复渲染num
   const ParentH = () => {
       //组件的state
       const [stus, setStus] = useState(['小张','小李','小王'])
       //更改state的方法
       const addStu = () => {
   		setStus(stus => stus = ['小刘',...stus])
   	}
   	//计算量庞大的函数
       const bigNumMemo = useMemo (() => {
           let num = 0
           for (let i = 0; i < 777777777; i++){
               num++
           }
           return num
       },[])
       
   	//渲染该函数
       return （
       		<>
           		{stus}<br />
           		{bigNumMemo}
       		</>
       ）
   }
   ```

2. 解决子组件重新渲染

   ```jsx
   const Childmemo = (props) => {
   	return useMemo(() => {
           return "渲染内容"
       },[props.xxx]) //当props.xxx前后不一致时才再次进行渲染
   }
   ```

### 4.useCallback() ----- 后续工作中研究

1. useMemo上述用法都是，第一个参数中函数都是return一个具体的值或组件。
2. 但当这个函数return另一个函数时，useMemo等于useCallback，即 useMemo(() =>fn, deps) 等于 useCallBack(fn, deps) 
3. 一般使用场景：
   1. 需要传递函数给子组件的场合
   2. 调用节流、防抖函数时

