import React from 'react'
import { useState } from 'react'
import './index.css'

const Parent = () => {

	return (
		<div className="parent">
			<h3>我是Parent组件</h3>
			<A render={ name => <B name={name}/>}/>
		</div>
	)	

}

const A = (props) => {

	const [name] = useState('Jerry')
	
	return (
		<div className="a">
			<h3>我是A组件</h3>
			{props.render(name)}
		</div>
	)
}

const B = (props) => {

	return (
		<div className="b">
			<h3>我是B组件, 收到A组件传值：{props.name}</h3>
		</div>
	)
}

export default Parent



