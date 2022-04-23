import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getToken } from '../services/Authorization'

const Form = () => {
	const titleInputRef = useRef()
	const contentInputRef = useRef()
	const authorInputRef = useRef()
	const history = useHistory()

	const submitHandler = async (event) => {
		event.preventDefault()

		const enteredTitle = titleInputRef.current.value
		const enteredDetail = contentInputRef.current.value
		const enteredAuthor = authorInputRef.current.value

		const enteredData = {
			title: enteredTitle,
			content: enteredDetail,
			author: enteredAuthor,
		}

		try {
			await Swal.fire({
				title: 'Are you sure to Create',
				icon: 'warning',
				showCancelButton: true,
			})
			await axios.post(`${process.env.REACT_APP_API}/create`, enteredData, {
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
			})
			await Swal.fire({
				title: 'Created Success',
				icon: 'success',
			})
		} catch (err) {
			Swal.fire({
				title: err,
				icon: 'error',
			})
		}

		event.target.reset()
		history.push('/')
	}

	return (
		<div className='container p-5'>
			<h1>Create Article</h1>
			<form onSubmit={submitHandler}>
				<div className='form-group'>
					<label>TITLE : </label>
					<input type='text' className='form-control' ref={titleInputRef} />
				</div>
				<div className='form-group'>
					<label>CONTENT : </label>
					<textarea className='form-control' ref={contentInputRef}></textarea>
				</div>
				<div className='form-group'>
					<label>AUTHOR : </label>
					<input type='text' className='form-control' ref={authorInputRef} />
				</div>
				<br />
				<button type='submit' className='btn btn-primary '>
					SUBMIT
				</button>
			</form>
		</div>
	)
}

export default Form
