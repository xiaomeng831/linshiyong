import React, { useState, useMemo } from 'react'
import './index.css'
import Childmemo from './Child/Childmemo'
import ChilduseMemo from './Child/ChilduseMemo'



const Parent = () => {
	
	const [carName, setCarName] = useState("奔驰")
	const [stus, setStus] = useState(['小张','小李','小王'])
	const [childCarName, setChildCarName] = useState("宝马")

	const changeCar = () => {
		setCarName(carName => carName = "奥迪")
	}

	const addStu = () => {
		setStus(stus => stus = ['小刘',...stus])
	}
	
	const changeChildCarName = () => {
		setChildCarName(childCarName => childCarName = "宝马")
		//setChildCarName(childCarName => childCarName = "奥迪")
	}

	// const bigNumFunc = () => {
	// 	let num = 0
	// 	for (let i = 0; i < 777777777; i++){
	// 		num++
	// 	}
	// 	return num
	// }
	
	const bigNumMemo  = useMemo(() => {
		let num = 0
		for (let i = 0; i < 777777777; i++){
			num++
		}
		return num		
	},[])

	
	return (
		<div className="parent">
			{console.log('HooksParent---render')}
			<h3>我是Parent组件</h3>
			{stus}<br/>
			<span>我的车名字是：{carName}</span><br/>
			<button onClick={changeCar}>Parent换车</button>
			<button onClick={addStu}>添加一个小刘</button>
			<button onClick={changeChildCarName}>Child换车</button>
			<Childmemo childCarName={childCarName}/>
			<ChilduseMemo childCarName={childCarName}/>
			<br />
			{bigNumMemo}
			{/* {bigNumFunc()} */}
		</div>
	)

}

export default Parent
