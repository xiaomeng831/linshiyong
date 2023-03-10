import React from 'react'
import {withRouter} from 'react-router-dom'


const Header = (props) => {
	const back = () => {
		props.history.goBack()
	}

	const forward = () => {
		props.history.goForward()
	}

	const go = () => {
		props.history.go(-2)
	}
	
	return (
		<div className="page-header">
			<h2>React Router Demo</h2>
			<button onClick={back}>回退</button>&nbsp;
			<button onClick={forward}>前进</button>&nbsp;
			<button onClick={go}>go</button>
		</div>
	)
	
}

export default withRouter(Header)

//withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
//withRouter的返回值是一个新组件
