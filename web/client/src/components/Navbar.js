import React, { Component } from 'react'

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src="/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""/>
          </a>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;