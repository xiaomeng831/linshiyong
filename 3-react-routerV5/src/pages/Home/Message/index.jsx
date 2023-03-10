import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link, Route, useLocation } from 'react-router-dom'
import Detail from './Detail'

const Message = (props)=> {

	const LOCATION = useLocation()
	console.log(LOCATION===props.location)

	const HISTORY = useHistory()
	console.log(HISTORY===props.history)

	const [messageArr] = useState([
		{id:'01',title:'消息1'},
		{id:'02',title:'消息2'},
		{id:'03',title:'消息3'},
	])

	const replaceShow = (id,title)=>{
		//replace跳转+携带params参数
		props.history.replace(`/home/message/detail/${id}/${title}`)

		//replace跳转+携带search参数
		// props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

		//replace跳转+携带state参数
		// props.history.replace(`/home/message/detail`,{id,title})
	}

	const pushShow = (id,title)=>{
		//push跳转+携带params参数
		props.history.push(`/home/message/detail/${id}/${title}`)

		//push跳转+携带search参数
		// props.history.push(`/home/message/detail?id=${id}&title=${title}`)

		//push跳转+携带state参数
		// props.history.push(`/home/message/detail`,{id,title})
		
	}

	const back = ()=>{
		props.history.goBack()
	}

	const forward = ()=>{
		props.history.goForward()
	}

	const go = ()=>{
		props.history.go(-2)
	}

	
	return (
		<div>
			<ul>
				{
					messageArr.map((msgObj)=>{
						return (
							<li key={msgObj.id}>

								{/* 向路由组件传递params参数 */}
								<Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>

								{/* 向路由组件传递search参数 */}
								{/* <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

								{/* 向路由组件传递state参数 */}
								{/* <Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link> */}

								&nbsp;<button onClick={()=> pushShow(msgObj.id,msgObj.title)}>push查看</button>
								&nbsp;<button onClick={()=> replaceShow(msgObj.id,msgObj.title)}>replace查看</button>
							</li>
						)
					})
				}
			</ul>
			<hr/>
			{/* 使用useParams()时，声明接收params参数 */}
			<Route path="/home/message/detail/:id/:title"><Detail /></Route>	

			{/* 声明接收params参数 */}
			{/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}

			{/* search参数无需声明接收，正常注册路由即可 */}
			{/* <Route path="/home/message/detail" component={Detail}/> */}

			{/* state参数无需声明接收，正常注册路由即可 */}
			{/* <Route path="/home/message/detail" component={Detail}/> */}

			<button onClick={back}>回退</button>&nbsp;
			<button onClick={forward}>前进</button>&nbsp;
			<button onClick={go}>go</button>

		</div>
	)
	
}

export default  Message