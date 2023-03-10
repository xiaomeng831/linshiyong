import React from 'react'
import Count from './components/Count'
import Person from './components/Person' 
import ApiList from './components/ApiList'

const App = () => {
	return (
		<div>
			<Count/>
			<hr/>
			<Person/>
			<hr/>
			<ApiList />
		</div>
	)
}

export default App
