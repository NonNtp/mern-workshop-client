import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory, withRouter } from 'react-router-dom'
import { Authorization, getUser } from '../services/Authorization'

const Login = () => {
	const history = useHistory()

	const [login, setLogin] = useState({
		username: '',
		password: '',
	})

	const { username, password } = login

	const inputValue = (name) => (event) => {
		setLogin({ ...login, [name]: event.target.value })
	}

	const submitHandler = async (event) => {
		event.preventDefault()
		try {
			const response = await axios.post(`${process.env.REACT_APP_API}/login`, {
				username,
				password,
			})
			Authorization(response, () => history.replace('/'))
		} catch (err) {
			Swal.fire({
				title: err.response.data.error,
				icon: 'error',
			})
		}
	}

	useEffect(() => {
		getUser() && history.push('/')
	})

	return (
		<div className='container p-5'>
			<h1>Login</h1>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label>USERNAME : </label>
					<input
						type='text'
						className='form-control'
						value={username}
						onChange={inputValue('username')}
					/>
				</div>
				<div className='form-group'>
					<label>PASSWORD : </label>
					<input
						type='password'
						className='form-control'
						value={password}
						onChange={inputValue('password')}
					/>
				</div>

				<br />
				<button type='submit' className='btn btn-primary '>
					Login
				</button>
			</form>
		</div>
	)
}

export default withRouter(Login)
