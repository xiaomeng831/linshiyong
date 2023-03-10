import React, { createContext, useReducer } from 'react'
import {INCREMENT,DECREMENT} from './constant'

export const CountContext = createContext()

export const CountProvider = (props) => {
    const [count, dispatch] = useReducer(countReducer,0)
    return(
        <CountContext.Provider value={{count, dispatch}}>
            {props.children}
        </CountContext.Provider>
    )
}

const initState = 0
export function countReducer(state = initState, action){

	const {type, count} = action
	switch (type) {
		case INCREMENT:
			return state + count
		case DECREMENT:
			return state - count
		default:
			return state
	}
}