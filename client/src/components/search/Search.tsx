import React, { Component } from "react";
import axios from "axios"

interface flightData {
  cityFrom: string,
  cityTo: string,
  departureDate: Date,
  returnDate: Date
}

class Search extends Component {
  state = {
    cityFrom: "",
    cityTo: "",
    departureDate: "",
    returnDate: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("HAE")
    const {cityFrom, cityTo, departureDate, returnDate} = this.state
    axios
      .get(
        `https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2020&dateTo=12/12/2020&partner=picky&v=3`
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Title of the website</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          distinctio veniam mollitia, eos ut illum explicabo ab voluptate
          tempora? Distinctio non quam natus incidunt architecto autem,
          asperiores aliquid aliquam? Quasi!
        </p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="flyFrom">From</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="flyFrom"
              id="flyFrom"
            />
          </div>
          <div>
            <label htmlFor="flyTo">To</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="flyTo"
              id="flyTo"
            />
          </div>
          <div>
            <label htmlFor="dateFrom">Departure Date</label>
            <input
              onChange={this.handleChange}
              type="date"
              name="dateFrom"
              id="dateFrom"
            />
          </div>
          <div>
            <label htmlFor="returnFrom">Return Date</label>
            <input
              onChange={this.handleChange}
              type="date"
              name="return From"
              id="returnFrom"
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
