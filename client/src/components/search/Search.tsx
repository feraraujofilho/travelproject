import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

interface flightData {
	cityFrom: string
	cityTo: string
	departureDate: Date
	returnDate: Date
}

class Search extends Component {
	state = {
		cityFrom: '',
		cityTo: '',
		departureDate: '',
		returnDate: '',
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		console.log(event)
		const { cityFrom, cityTo, departureDate } = this.state
		axios
			.get(
				`http://localhost:5001/api/flights/?cityFrom=${cityFrom}&cityTo=${cityTo}&departureDate=${departureDate}`
			)
			.then(res => {
				console.log('FRONTEND', res)

				return (
					<Redirect
						to={{
							pathname: `/flights/?cityFrom=${cityFrom}&cityTo=${cityTo}&departureDate=${departureDate}`,
							state: { flights: res },
						}}
					/>
				)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<div>
				<h1>Title of the website</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Debitis distinctio veniam mollitia, eos ut illum explicabo
					ab voluptate tempora? Distinctio non quam natus incidunt
					architecto autem, asperiores aliquid aliquam? Quasi!
				</p>
				<form action="flights/search" /* onSubmit={this.handleSubmit} */>
					<div>
						<label htmlFor="cityFrom">From</label>
						<input
							onChange={this.handleChange}
							type="text"
							name="cityFrom"
							id="cityFrom"
						/>
					</div>
					<div>
						<label htmlFor="cityTo">To</label>
						<input
							onChange={this.handleChange}
							type="text"
							name="cityTo"
							id="cityTo"
						/>
					</div>
					<div>
						<label htmlFor="departureDate">Departure Date</label>
						<input
							onChange={this.handleChange}
							type="date"
							name="departureDate"
							id="departureDate"
						/>
					</div>
					<div>
						<label htmlFor="returnDate">Return Date</label>
						<input
							onChange={this.handleChange}
							type="date"
							name="returnDate"
							id="returnDate"
						/>
					</div>
					<button type="submit">Search</button>
				</form>
			</div>
		)
	}
}

export default Search
