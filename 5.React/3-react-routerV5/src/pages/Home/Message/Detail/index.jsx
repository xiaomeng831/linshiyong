import React from 'react'
import { useParams } from 'react-router-dom'
// import qs from 'querystring'

const DetailData = [
	{id:'01',content:'你好，中国'},
	{id:'02',content:'你好，尚硅谷'},
	{id:'03',content:'你好，未来的自己'}
]
const Detail = (props) => {	

	//使用useParams接收参数
	const {id,title} = useParams()

	// 接收params参数
	// const {id,title} = props.match.params 

	// 接收search参数
	// const {search} = props.location
	// const {id,title} = qs.parse(search.slice(1))

	// 接收state参数
	// const {id,title} = props.location.state || {}

	const findResult = DetailData.find((detailObj)=>{
		return detailObj.id === id
	}) || {}
	return (
		<ul>
			<li>ID:{id}</li>
			<li>TITLE:{title}</li>
			<li>CONTENT:{findResult.content}</li>
		</ul>
	)
	
}

export default Detail