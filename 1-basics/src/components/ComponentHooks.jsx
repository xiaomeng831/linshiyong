import React from 'react'
import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

export default function ComponentHooks(props) {

	const [count, setCount] = useState(0)
	const add = () => {
		//setCount(count+1)
		setCount(count => count + 1)
	}


	const myRef = useRef()
	const show = () => {
		alert(myRef.current.value)
	}
	const showWithNoRef = (e) => {
		alert(e.target.value)
	}


	useEffect(() => {
		const timer = setInterval(() => {
			setCount(count => count + 1)
		}, 1000)
		return () => {
			clearInterval(timer)
		}
	}, [])

	const unmount = () => {
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}


	return (
		<div>
			<input type="text" ref={myRef} />
			<input type="text" onChange={(e)=>{showWithNoRef(e)}} />
			<h2>当前求和为{count}</h2>
			<button onClick={add}>点我+1</button>
			<button onClick={unmount}>卸载组件</button>
			<button onClick={show}>点我提示数据</button>
			<div>{props.name}</div>
		</div>
	)
}

