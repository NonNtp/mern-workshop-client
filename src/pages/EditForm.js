import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getToken } from '../services/Authorization'

const EditForm = () => {
	const slug = useParams().slug

	const history = useHistory()

	const [blog, setBlog] = useState({
		title: '',
		content: '',
		author: '',
		slug: '',
	})

	const { title, content, author } = blog

	const inputValue = (name) => (event) => {
		setBlog({ ...blog, [name]: event.target.value })
	}

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API}/blog/${slug}`
			)
			const { title, content, author } = response.data.blog
			setBlog({ ...blog, title, content, author, slug })
		} catch (err) {
			alert(err)
		}
	}

	useEffect(() => {
		fetchData()
		//eslint-disable-next-line
	}, [])

	const submitHandler = async (event) => {
		event.preventDefault()

		try {
			await Swal.fire({
				title: 'Are you sure to Edit this form ',
				icon: 'warning',
				showCancelButton: true,
			})
			await axios.put(
				`${process.env.REACT_APP_API}/blog/${slug}`,
				{
					title,
					content,
					author,
				},
				{
					headers: {
						authorization: `Bearer ${getToken()}`,
					},
				}
			)
			await Swal.fire({
				title: 'Updated Success',
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
					<input
						type='text'
						className='form-control'
						value={title}
						onChange={inputValue('title')}
					/>
				</div>
				<div className='form-group'>
					<label>CONTENT : </label>
					<textarea
						className='form-control'
						value={content}
						onChange={inputValue('content')}
					></textarea>
				</div>
				<div className='form-group'>
					<label>AUTHOR : </label>
					<input
						type='text'
						className='form-control'
						value={author}
						onChange={inputValue('author')}
					/>
				</div>
				<br />
				<button type='submit' className='btn btn-success '>
					Update
				</button>
			</form>
		</div>
	)
}

export default EditForm
