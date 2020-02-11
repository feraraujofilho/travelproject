import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'

interface CustomInputProps {
	props?: any
	location?: any
}

export default class SearchResults extends Component<CustomInputProps> {
	state = {
		flights: [],
		cityFrom: '',
		iataFrom: '',
		cityTo: '',
		iataTo: '',
		departureDate: '',
		returnDate: '',
		carriers: [],
	}

	componentDidMount = async () => {
		const values = queryString.parse(this.props.location.search)
		console.log('VALUES', values)
		const { cityFrom, cityTo, departureDate, returnDate } = values
		await this.setState({
			cityFrom: cityFrom,
			cityTo: cityTo,
			departureDate: departureDate,
			returnDate: returnDate,
		})
		await this.getCities(cityFrom, cityTo)
	}

	getCities = async (city, city2) => {
		await axios
			.get(`http://localhost:5001/api/cities/${city}`)
			.then(res => {
				this.setState({
					iataFrom: res.data.iataCode,
				})
				console.log('iataFrom', this.state)
			})
			.catch(err => {
				console.log(err)
			})
		await axios
			.get(`http://localhost:5001/api/cities/${city2}`)
			.then(res => {
				this.setState({
					iataTo: res.data.iataCode,
				})
				console.log('iataTO', res)
			})
			.catch(err => {
				console.log(err)
			})

		await this.getFlights()
	}

	getFlights = async () => {
		console.log('THISSTATE GET FLIGHTS', this.state)
		const { iataFrom, iataTo, departureDate, returnDate } = this.state
		await axios
			.get(
				`http://localhost:5001/api/flights/?cityFrom=${iataFrom}&cityTo=${iataTo}&departureDate=${departureDate}&returnDate=${returnDate}`
			)
			.then(res => {
				console.log('RES', res)

				// Only direct flights
				/* let filtered = res.data.data.filter(val => {
					if(val.itineraries[0].segments.length === 1 &&
						val.itineraries[1].segments.length === 1) {
							return val
						}
				})
						 */
				this.setState({
					flights: res.data.data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		console.log('PROPS', this.props)
		return (
			<div>
				{this.state.flights.length > 0 &&
					this.state.flights.map(flight => {
						let infoDep = flight.itineraries[0].segments[0]
						let infoRet = flight.itineraries[1].segments[0]
						return (
							<div style={{display: "flex", justifyContent: "space-around"}}>
								<div>
									<h3>Outbound</h3>
									<p>{infoDep.departure.iataCode}</p>
									<p>{infoDep.arrival.iataCode}</p>
									<p>
										{infoDep.departure.at.slice(0, 10)} at{' '}
										{infoDep.departure.at.slice(12, 20)}
									</p>
								</div>
								<div>
									<h3>Return</h3>
									<p>{infoRet.departure.iataCode}</p>
									<p>{infoRet.arrival.iataCode}</p>
									<p>
										{infoRet.departure.at.slice(0, 10)} at{' '}
										{infoRet.departure.at.slice(12, 20)}
									</p>
								</div>
								<div>
									<h3>Price</h3>
									<p>{flight.price.total} {flight.price.curreny}</p>
								</div>
								
								
							</div>
						)
					})}
			</div>
		)
	}
}
