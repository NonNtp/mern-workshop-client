import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getUser, getToken } from '../services/Authorization'

const SingleBlog = () => {
	const [blog, setBlog] = useState('')

	const slug = useParams().slug

	const fetchData = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API}/blog/${slug}`
			)
			setBlog(response.data.blog)
		} catch (err) {
			alert(err)
		}
	}, [slug])

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

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return (
		<div className='container p-5'>
			<h1>{blog.title}</h1>
			<p>{blog.content}</p>
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
	)
}

export default SingleBlog
