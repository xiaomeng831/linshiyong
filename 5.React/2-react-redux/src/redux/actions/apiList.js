import axios from 'axios'
import {GETAPILIST} from '../constant'


const getApi = data => ({type:GETAPILIST, data})

//异步action，就是指action的值为函数,异步action中一般都会调用同步action
export const getApiAsync = () => {
	return (dispatch) => {
		axios.get('api/mock.json')
		.then(res => {
			console.log(res)
			dispatch(getApi(res.data.data))
		})
		.catch(() => {
			console.log('error')
		})
	}
} 