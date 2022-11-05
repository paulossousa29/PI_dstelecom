import React from "react";

import Sidebar from "../components/Sidebar";
import SlideShow from "../components/SlideShow";


import "./Painel.css"


const Relatorio = () => {

  return (
    <React.Fragment>

    <div className="row">
      
    <Sidebar className ="left-panel"/>
    
    
    <div className="right-panel" style={{fontFamily: "HelveticaNeue-Light" }}>
    <center>
      <h1>Relatório R1</h1>
    </center>
      
      <div >
            <div>
                <p >Info</p>
                <ul>
                    <li>Data: 1/1/2000</li>
                    <li>Id: R1</li>
                    <li>Local: Barcelos</li>
                    <li>Equipa: equipa1</li>
                </ul>
                <div style={{backgroundColor: "#FF91A4",
                    borderRadius: 10,
                    width: 500}}>
                
                        Alertas
                
                </div>
                <ul>
                    <li>Conetor Incorreto</li>
                    
                    
                </ul>
            </div>
             
           
      </div>
    </div>
</div>
    
    
    </React.Fragment>
  );
};
export default Relatorio;