import React from 'react'
import ComponentHooks from './components/ComponentHooks'
import EventFuncHooks from './components/EventFuncHooks'


const App = () =>{
	return(
		<div>        		
        	<hr />
         	<ComponentHooks name={`Jerry`}></ComponentHooks>
 			<hr />
			<EventFuncHooks></EventFuncHooks>
		</div>
	) 
}

export default App;
