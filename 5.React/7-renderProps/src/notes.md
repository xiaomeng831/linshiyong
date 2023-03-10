1. 标签体中的内容，会以 props.children 传给子组件

   ```jsx
   const Parent = () => {
       ...
   	return (
               <>
           		<Child>ABC</Child>
           	</>        	
   	)	
   }
   
   const Parent = (props) => {
       ...
   	return (
               <>
           		{props.children} //渲染后显示 ABC
           	</>        	
   	)	
   }
   ```

2. 插槽技术 (以hooks组件为例)

   1. Parent组件

      1. Parent组件渲染A组件，并以props的方式给A组件传递一个回调函数
      2. 该函数返回一个B组件。
      3. 回调函数的参数为A组件打算传递给B组件的数据，返回的B组件通过其props接收A组件打算传递的数据

      ```jsx
      const ParentC = () => {
          ...
      	return (
                  ...
      			<A render={ name => <B name={name}/>}/>
              	//Parent通过render属性，传递给A回调函数 name => <B name={name}/>}/>
              	//第一个name为A组件打算传递给B的数据
              	//第三个name为B组件通过其props接收A组件传递的数据
              	//A、B组件形成父子关系
      	)	
      }
      ```

   2. A组件

      1. A组件通过其props接收到函数render()
      2. A组件通过render()传数据，B组件的props就可以接到这个数据

      ```jsx
      const A = (props) => {
      
      	const [name] = useState('Tom')
      	
      	return (
      		...
      			{props.render(name)}
      			//通过render()函数给子组件B传数据
      	)
      }
      ```

   3. B组件

      - B组件通过其props接收父组件A传过来的数据

      ```jsx
      const B = (props) => {
      
      	return (
      		...
      			<h3>我是B组件, 收到A组件传值：{props.name}</h3>
              	//通过自身的props接收数据
      	)
      }
      ```

      