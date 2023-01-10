import React from "react";

import NavBar from "../components/Navbar";
import Perfil from "../components/Perfil";

import "./Main.css";


import "./Painel.css"


const Main = () => {

  return (
    <React.Fragment>

      <div className="row">

        <NavBar />


        <div className="right-panel" style={{ paddingTop: 30 }}>
          <Perfil />
        </div>
      </div>


    </React.Fragment>
  );
};
export default Main;