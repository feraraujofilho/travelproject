import React, { Component } from "react";
import Logo from "../../img/Logo-Test.png";
import { Link } from "react-router-dom"
import { Container } from "./styles"

export default class Navbar extends Component {
  render() {
    return (
      <Container>
        <div className="navbar">
          <Link to="/"><img src={Logo} alt="logo" /></Link>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>
      </Container>
    );
  }
}
