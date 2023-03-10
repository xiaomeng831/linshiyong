import React, { useRef } from 'react'
import { useContext } from 'react'
import { INCREMENT, DECREMENT } from '../../useReducer/constant'
import { CountContext } from '../../useReducer/CountProvider'

const Count = () => {

	const selectNumber = useRef()

	const {count, dispatch} = useContext(CountContext)


	const incrementInHooks = () => {
		const {value} = selectNumber.current
		console.log(value)
		dispatch({type:INCREMENT, count:value*1})
		console.log(count)
	}
	
	const decrementInHooks = () => {
		const {value} = selectNumber.current
		dispatch({type:DECREMENT, count:value*1})
	}

	const incrementIfOddInHooks = () => {
		const {value} = selectNumber.current
		if(count % 2 !== 0){
			dispatch({type:INCREMENT, count:value*1})
		}
	}
	
	const incrementAsyncInHooks = () => {
		const {value} = selectNumber.current
		setTimeout(()=>{
			dispatch({type:INCREMENT, count:value*1})
		},500)
	}

	return (
		<div>			
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
