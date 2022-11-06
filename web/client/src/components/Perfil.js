import React from "react";
import logo from '../assets/profile.png'

export default function Perfil() {
return(
    <React.Fragment>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
      <div className="card">
        <img src={logo} alt="John" style={{ width: "100%" }} />
        <h1>John Doe</h1>
        <p className="title">CEO &amp; Founder, Example</p>
        <p>Harvard University</p>
        <a href="#">
          <i className="fa fa-dribbble" />
        </a>
        <a href="#">
          <i className="fa fa-twitter" />
        </a>
        <a href="#">
          <i className="fa fa-linkedin" />
        </a>
        <a href="#">
          <i className="fa fa-facebook" />
        </a>
        <p>
          <button>Contact</button>
        </p>
      </div>
      </React.Fragment>
);
}