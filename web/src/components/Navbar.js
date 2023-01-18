import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import logo from '../assets/dstelecomlogo.png'
import exit from '../assets/exit.png'
import "./NavBar.css"
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
        <a className="navbar-brand" href="#">
          <img style={{ paddingLeft: 20 }} src={logo} alt="Logo" width="180" height="75" />
        </a>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className='navbar-nav ml-auto'>
            <a className="nav-link" href="/relatorios">Relatórios</a>
            <a className="nav-link" href="/pendentes">Pedidos</a>
            <a className="nav-link" href="/stats">Estatisticas</a>
            <a className='nav-link' href="/avaliacao">Avaliacao</a>
          </div>
        </div>
        <a style={{ paddingRight: 30 }} className="nav-link" href="#">
          <label className='nav-link'>
            <button icon="fas fa-sign-out-alt" type="button" class="btn btn-outline-dark" onClick={logout} > Logout</button>
          </label>
        </a>

      </nav>
    </React.Fragment>
  );


}
export default NavBar;
