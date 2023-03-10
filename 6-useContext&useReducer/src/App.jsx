import React from 'react'
import Count from './components/Count'
import { CountProvider } from './useReducer/CountProvider'

const App = () => {
	return (
		<div>
			<CountProvider>
				<Count/>
			</CountProvider>
		</div>
	)
}

export default App
