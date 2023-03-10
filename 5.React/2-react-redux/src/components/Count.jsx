import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	increment,
	decrement,
	incrementAsync
} from '../redux/actions/count'


const Count = () => {

	const selectNumber = useRef()
	const count = useSelector(state => state.count)
	const personCount = useSelector(state => state.persons).length
	const dispatch = useDispatch()


	const incrementInHooks = () => {
		const {value} = selectNumber.current
		console.log(value)
		dispatch(increment(value*1))
	}
	
	const decrementInHooks = () => {
		const {value} = selectNumber.current
		dispatch(decrement(value*1))
	}

	const incrementIfOddInHooks = () => {
		const {value} = selectNumber.current
		if(count % 2 !== 0){
			dispatch(increment(value*1))
		}
	}
	
	const incrementAsyncInHooks = () => {
		const {value} = selectNumber.current
		dispatch(incrementAsync(value*1,500))
	}

	return (
		<div>
			<h2>我是Count组件,下方组件总人数为:{personCount}</h2>
			<h4>当前求和为：{count}</h4>
			<select ref={selectNumber}>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>&nbsp;
			<button onClick={incrementInHooks}>+</button>&nbsp;
			<button onClick={decrementInHooks}>-</button>&nbsp;
			<button onClick={incrementIfOddInHooks}>当前求和为奇数再加</button>&nbsp;
			<button onClick={incrementAsyncInHooks}>异步加</button>&nbsp;
		</div>
	)
	
}

export default Count
