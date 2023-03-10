import React from 'react'
import {NavLink} from 'react-router-dom'

const MyNavLink = (props) => {
	return (
		<NavLink activeClassName="navActive" className="list-group-item" {...props}/>
	)
}
export default MyNavLink
