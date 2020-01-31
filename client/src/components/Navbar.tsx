import React, { Component } from 'react'
import Logo from "../img/Logo-Test.png"

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <img src={Logo} alt="logo"/>
        <ul>
          <li>Home</li>
          <li>Search</li>
          <li>Contact</li>
        </ul>
      </div>
    )
  }
}
