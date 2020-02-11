import React from 'react'
import { Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Search from './components/search/Search'
import SearchResults from './components/results/SearchResults'
import './App.css'

const App: React.FC = () => {
	return (
		<div className="App">
			<Navbar />
			<Route exact path="/" component={Search} />
			<Route path="/flights/" component={SearchResults} />
		</div>
	)
}

export default App
