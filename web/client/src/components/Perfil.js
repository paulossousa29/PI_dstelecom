import React from "react";
import logo from '../assets/profile.png'

export default function Perfil() {
  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div className="container">
        <div className="row">
          <div className="col card">
            <center><img src={logo} alt="John" style={{ width: "70%" }} /></center>
            <h1>John Doe</h1>
            <p className="title">CEO &amp; Founder, Example</p>
            <div class="form-group">
              <label htmlFor="mensagem">Aptidões:</label>
              <textarea class="form-control" id="mensagem" style={{ marginBottom: 10 }} rows="4">Assíduo, autónomo</textarea>
            </div>
            <button type="submit" className="btn btn-secondary btn-block mb-4">Editar</button>
          </div>
          <div className="col card">
            <center><img src={logo} alt="John" style={{ width: "70%" }} /></center>
            <h1>John Doe</h1>
            <p className="title">CEO &amp; Founder, Example</p>
            <div class="form-group">
              <label htmlFor="mensagem">Aptidões:</label>
              <textarea class="form-control" id="mensagem" style={{ marginBottom: 10 }} rows="4">Assíduo, autónomo</textarea>
            </div>
            <button type="submit" className="btn btn-secondary btn-block mb-4">Editar</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}