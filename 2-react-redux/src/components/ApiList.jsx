import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getApiAsync
} from '../redux/actions/apiList'


const ApiList = () => {

	const apiList = useSelector(state => state.apiList)
	const dispatch = useDispatch()

	const api = () => {
		dispatch(getApiAsync())
	}

	return (
		<div>
			<h2>mock数据为: {apiList[0]}</h2>
			<button onClick={api}>点击获取mock数据</button>&nbsp;
			<button onClick={() => dispatch(getApiAsync())}>点击获取mock数据</button>&nbsp;
		</div>
	)
}

export default ApiList

