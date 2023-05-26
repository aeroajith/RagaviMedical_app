import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <a
              href="#"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-expanded="false"
            ></a>
            <a href="#" className="bars" onClick={this.props.onBarClick}></a>
            <a className="navbar-brand" href="index.html">
              Ragavi Medical Management System
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
