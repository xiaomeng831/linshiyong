import {combineReducers} from 'redux'

import count from './count'
import persons from './person'
import apiList from './apiList'

export default  combineReducers({
	count,
	persons,
	apiList
})
