import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {nanoid} from 'nanoid'
import {addPerson} from '../redux/actions/person'

const Person = () => {
	
	const nameNode = useRef()
	const ageNode = useRef()

	const persons = useSelector(state => state.persons)
	const count = useSelector(state =>  state.count)
	const dispatch = useDispatch()


	const addPersonInHooks = () => {
		let name  = nameNode.current.value
		let age = ageNode.current.value*1
		const personObj = {id:nanoid(),name,age}
		dispatch(addPerson(personObj))
		nameNode.current.value = ''
		ageNode.current.value = ''
	}

	return (
		<div>
			<h2>我是Person组件,上方组件求和为{count}</h2>
			<input ref={nameNode} type="text" placeholder="输入名字"/>
			<input ref={ageNode} type="text" placeholder="输入年龄"/>
			<button onClick={addPersonInHooks}>添加</button>
			<ul>
				{
					persons.map((p)=>{
						return <li key={p.id}>{p.name}--{p.age}</li>
					})
				}
			</ul>
		</div>
	)
	
}

export default Person
 