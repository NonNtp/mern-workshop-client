import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUser, getToken } from '../services/Authorization'
import axios from 'axios'
import Swal from 'sweetalert2'

const Home = () => {
	const [blogs, setBlogs] = useState([])

	const fetchData = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API}/blogs`)
			setBlogs(response.data.blogs)
		} catch (err) {
			alert(err)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const removeBlog = async (slug) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
				headers: {
					authorization: `Bearer ${getToken()}`,
				},
			})
			await Swal.fire({
				title: `Deleted ${slug}`,
				icon: 'success',
			})
			fetchData()
		} catch (err) {
			console.log(err)
		}
	}

	const removeHandler = (slug) => {
		Swal.fire({
			title: 'Are you sure to delete',
			icon: 'warning',
			showCancelButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				removeBlog(slug)
			}
		})
	}

	return (
		<div className='container p-5'>
			{blogs.map((blog, index) => {
				return (
					<div
						className='row'
						key={index}
						style={{ borderBottom: '1px solid silver' }}
					>
						<div className='col pt-3 pb-2'>
							<Link to={`/blog/${blog.slug}`}>
								<h2>{blog.title}</h2>
							</Link>
							<p>{blog.content.substring(0, 250)} ... </p>
							<p className='text-muted'>
								Author : {blog.author} , createdAt :{' '}
								{new Date(blog.createdAt).toLocaleString()}
							</p>
							{getUser() && (
								<div>
									<Link
										className='btn btn-outline-success'
										to={`/blog/edit/${blog.slug}`}
									>
										Edit
									</Link>{' '}
									&nbsp;
									<button
										className='btn btn-outline-danger'
										onClick={() => removeHandler(blog.slug)}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Home
