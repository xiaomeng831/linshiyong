import {GETAPILIST} from '../constant'

const initState = []
export default function apiListReducer(state = initState,action){
	
	const {type,data} = action
	
	switch (type) {
		case GETAPILIST:
			return state = data
		default:
			return state
	} 
}