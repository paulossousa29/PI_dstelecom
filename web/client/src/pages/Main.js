import React from "react";

import Sidebar from "../components/Sidebar";
import Perfil from "../components/Perfil";

import "./Main.css";





import "./Painel.css"


const Main= () => {

  return (
    <React.Fragment>

    <div className="row">
      
    <Sidebar className ="left-panel"/>
    
    
    <div className="right-panel" style={{paddingTop:30}}>
       <Perfil/>
      </div>
    </div>
    
    
    </React.Fragment>
  );
};
export default Main;