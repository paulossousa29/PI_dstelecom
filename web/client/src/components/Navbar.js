import React, { Component } from 'react'
import logo from '../assets/dstelecomlogo.png'
import exit from '../assets/exit.png'
import "./NavBar.css"

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
          <a className="navbar-brand" href="#">
            <img style={{paddingLeft:20}} src={logo} alt="Logo" width="180" height="75"/>
          </a>
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className='navbar-nav ml-auto'>
              <a className="nav-link"  href="/relatorios">Relatórios</a>
              <a className="nav-link" href="/pendentes">Pedidos</a>
              <a className="nav-link" href="/">Estatisticas</a>
              <a className="nav-link" href="/equipa">Equipa</a>
            </div>
          </div>
          <a style={{paddingRight:30}} className="nav-link" href="#">
              <label className='nav-link'>
                <img  style={{paddingRight:10}} src={exit} alt="Exit" width="35" height="25"/>
                  Logout
              </label>
            </a>
          
        </nav>
      </React.Fragment>
    );
  }

}
export default NavBar;