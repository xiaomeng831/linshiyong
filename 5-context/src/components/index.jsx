import React, { createContext, useContext, useState } from 'react'
import './index.css'

//创建Context对象
const MyContext = createContext()

const A = () => {

	const [username, setUsername] = useState('Tom')
	const [age, setAge] = useState(18)

	return (
		<div className="parent">
			<h3>我是A组件</h3>
			<h4>我的用户名是:{username}</h4>
			<h4>我的年龄是:{age}</h4>			
			<MyContext.Provider value={{username,setUsername,age,setAge}}>
				<B/>
			</MyContext.Provider>
		</div>
	)

}


const B = () => {
	return (
		<div className="child">
			<h3>我是B组件</h3>
			<C/>
		</div>
	)
}

const C = () => {

	const {username, setUsername} = useContext(MyContext)
	const {age, setAge} = useContext(MyContext)

	return (
		<div className="grand">
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:{username},年龄是{age}</h4>
			<button onClick={() => setUsername('Jerry')}>接收到的改变A和C用户名的方法</button>&nbsp;
			<button onClick={() => setAge(17)}>接收到的改变改变A和C年龄的方法</button>
		</div>
	)
}


// function C(){
// 	return (
// 		<div className="grand">
// 			<h3>我是C组件</h3>
// 			<h4>我从A组件接收到的用户名:
// 			<MyContext.Consumer>
// 				{value => `${value.username},年龄是${value.age}`}
// 			</MyContext.Consumer>
// 			</h4>
// 		</div>
// 	)
// }

export default A