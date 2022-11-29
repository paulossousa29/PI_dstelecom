import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import logo from '../assets/dstelecomlogo.png'


class Login extends Component {

  handleLogin = (e) => {
    e.preventDefault();
    <Link to="/main"></Link>
    console.log("Cliquei no Login")
    }


  render() {
    return (
      <React.Fragment>
        
        <section style={{margin:"100px"}}>
            <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor: "hsl(0, 0%, 96%)"}}>
                <div className="container" >
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <center>
                                <img style={{width:"400pt"}} src={logo} alt="Logo" className=''/>
                            </center>
                        </div>
                        <div className='col-lg-6 mb-5 mb-lg-0'>
                            <div className='card'>
                                <div className='card-body py-5 px-md-5'>
                                    <form>
                                        {/* Email */}
                                        <div className="form-outline mb-4">
                                            <input type="email"  id="form2Example1" className="form-control" placeholder='Email'/>
                                            <label className="form-label" htmlFor="form2Example1"></label>
                                        </div>
                                        {/* Password */}
                                        <div className="form-outline mb-4">
                                            <input type="password"  id="form2Example1" className="form-control" placeholder='Password'/>
                                            <label className="form-label" for="form2Example1"></label>
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col d-flex justify-content-center">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                                                    <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-secondary btn-block mb-4" onClick={this.handleLogin}>Iniciar Sessão</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    
      
      </React.Fragment>


    )
  }
}

export default Login;
