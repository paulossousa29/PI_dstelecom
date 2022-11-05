import React, { Component } from 'react'

import NavBar from '../components/Navbar';
import { Link } from 'react-router-dom';


class Login extends Component {

  handleLogin = (e) => {
    e.preventDefault();
    <Link to="/main"></Link>
    console.log("Cliquei no Login")
    }


  render() {
      
      
    return (
      <React.Fragment>
        <div>
          <NavBar/>
       </div>
    
    <form className='mb-10'>
		<center>
      Login
		
        <div className="mb-3" style={{width: 500, fontFamily: "Verdana"}}>
          <label>Introduza o seu email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div style={{width: 500, fontFamily: "Verdana"}} className="mb-3">
		<label>Introduza a sua password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
       
        <div className="d-grid">
        <center>
          <button style={{width: 500, fontFamily: "Verdana", backgroundColor:  "grey"}} onClick={this.handleLogin} type="submit" className="btn btn-secondary btn-sm">
          Iniciar Sessão
          </button>
          </center>
        </div>
        
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        </center>
      </form>
      
      </React.Fragment>


    )
  }
}

export default Login;
