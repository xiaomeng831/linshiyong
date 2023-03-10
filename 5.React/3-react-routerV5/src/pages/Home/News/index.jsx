import React, { useEffect } from 'react'

const News = (props) => {
	useEffect(()=>{
		setTimeout(()=>{
			props.history.push('/home/message')
		},2000)
	},[])

	return (
		<ul>
			<li>news001</li>
			<li>news002</li>
			<li>news003</li>
		</ul>
	)
}
export default News 