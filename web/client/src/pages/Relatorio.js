import React from "react";

import Sidebar from "../components/Sidebar";
import SlideShow from "../components/SlideShow";


import "./Painel.css"


const Relatorio = () => {

  return (
    
    <React.Fragment>
      
    
    <div className="row">
    

    <Sidebar className ="left-panel"/>
    
    <div className="right-panel">
        <center>
          <h1 style={{paddingTop: 30}}>Relatório R1</h1>
        </center>
        <SlideShow  />
      
    </div>
    

    <div style={{fontFamily: "Verdana" , paddingLeft: 40}}>
            <div>
                <p style={{
                    borderRadius: 10,
                    width: 500, textAlign: "center"}}>Info</p>
                <ul>
                    <li>Data: 1/1/2000</li>
                    <li>Local: Barcelos</li>
                    <li>Equipa: equipa1</li>
                </ul>
                <div style={{backgroundColor: "#FF91A4",
                    borderRadius: 10,
                    width: 500, textAlign: "center"}}>
                
                        Alertas
                
                </div>
                <ul style={{backgroundColor: "#FF91A4",
                    borderRadius: 10,
                    width: 500}}>
                    <li>Passo 3: Conetor Incorreto</li>
                    <li>Alteração de PDO necessária</li>  
                </ul>
            </div>
    </div>
    </div>


    
    
    </React.Fragment>
  );
};
export default Relatorio;