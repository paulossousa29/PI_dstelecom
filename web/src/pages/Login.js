import Button from "../components/Button";
import React, { Component } from 'react'




class Login extends Component {
  render() {
	const mystyle = {
		fontFamily: "Verdana"
	  }

    return (
      <form>
		<center>
        <h3>Login</h3>
		</center>
        <div className="mb-3">
          <label>Introduza o seu email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div style={mystyle} className="mb-3">
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
          <button style={{ backgroundColor:  "grey"  }} type="submit" className="btn btn-secondary btn-sm">
            Iniciar Sessão
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}

export default Login;
