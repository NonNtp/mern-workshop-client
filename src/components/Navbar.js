import React from 'react'
import { NavLink, useHistory, withRouter } from 'react-router-dom'
import { getUser, logout } from '../services/Authorization'

const Navbar = () => {
	const history = useHistory()
	return (
		<nav className='container'>
			<ul className='nav nav-tabs'>
				<li className='nav-item mr-3 mt-3 mb-3'>
					<NavLink to='/' className='nav-link'>
						Home
					</NavLink>
				</li>
				{getUser() && (
					<li className='nav-item mr-3 mt-3 mb-3'>
						<NavLink to='/form' className='nav-link'>
							Create-Article
						</NavLink>
					</li>
				)}
				{!getUser() && (
					<li className='nav-item mr-3 mt-3 mb-3'>
						<NavLink to='/login' className='nav-link'>
							Login
						</NavLink>
					</li>
				)}
				{getUser() && (
					<li className='nav-item mr-3 mt-3 mb-3'>
						<button
							className='nav-link'
							onClick={() => logout(() => history.push('/'))}
						>
							Logout
						</button>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default withRouter(Navbar)
