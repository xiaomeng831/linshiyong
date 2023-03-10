import React, { useMemo } from 'react'

const ChilduseMemo = (props) => {

	return (
		<div className="child">
			{console.log('HooksChild_useMemo---render')}
			<h3>我是Child组件</h3>
			<span>我接到的车是：{props.childCarName}</span>
		</div>
	)

	// return useMemo (() => {
	// 	return (
	// 		<div className="child">
	// 			{console.log('HooksChild_useMemo---render')}
	// 			<h3>我是Child组件</h3>
	// 			<span>我接到的车是：{props.childCarName}</span>
	// 		</div>
	// 	)
	// },[props.childCarName])	
	
}

export default ChilduseMemo