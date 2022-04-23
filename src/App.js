import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { getUser } from './services/Authorization'
import Navbar from './components/Navbar'
import EditForm from './pages/EditForm'
import Form from './pages/Form'
import Home from './pages/Home'
import SingleBlog from './pages/SingleBlog'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				{getUser() && <Route exact path='/form' component={Form} />}
				<Route exact path='/blog/:slug' component={SingleBlog} />
				{getUser() && (
					<Route exact path='/blog/edit/:slug' component={EditForm} />
				)}
				<Route exact path='/login' component={Login} />
				<Route exact path='*' component={NotFound} />
			</Switch>
		</Router>
	)
}

export default App
