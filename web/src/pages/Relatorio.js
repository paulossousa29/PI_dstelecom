import React, { useState } from "react";
import SlideShow from "../components/SlideShow";
import NavBar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

import "./Painel.css"
import ip from '../config/ip';

const Relatorio = ({route}) => {
  const location = useLocation();
  console.log(location.state)
  const id = 1

  console.log(id);
  
  const [relatorio,setRelatorio] = React.useState([]);


  async function getRelatorio(id) {
    const res = await fetch(ip.backend_ip + "relatorio/" + id);
    const relatorioAux = await res.json();
    setRelatorio(relatorioAux);
  }

  React.useEffect(() => {
    getRelatorio(id);
  }, []);

  console.log(relatorio)

  function passos(passo){
    if (passo === 0){
      return "Passo correto"
    }
    else{
      return "Passo correto"
    }
  }


  return (
    <React.Fragment>
      <div className="row">
        <NavBar />
        <div className='row'>
          <div className="right-panel" style={{ paddingTop: 10, paddingRight: 30 }}>
            <h1 style={{ textAlign: "center" }}>Relatório <b>{id}</b> </h1>
            <div className='card mw-75' >
              <div className="card-body">
                <ul className="list-group">
                  {relatorio.map((e) => (
                    <React.Fragment>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Data de inicio:</b>
                          </div>
                          <div className='col'>
                            {e.data_inicio}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Data de fim:</b>
                          </div>
                          <div className='col'>
                            {e.data_fim}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Id da intervenção:</b>
                          </div>
                          <div className='col'>
                            {e.id_intervencao}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Passo 1 - Identificar a referencia do PDO e verificar se coincide com a ordem de trabalho:</b>
                          </div>
                          <div className='col'>
                            {passos(e.passo_1)}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Passo 3 - Medir a potencia ótica no conetor:</b>
                          </div>
                          <div className='col'>
                            {passos(e.passo_3)}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Passo 5 - Passar o cabo de drop pelo slot:</b>
                          </div>
                          <div className='col'>
                            {passos(e.passo_5)}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Passo 7 - Identificar o tabuleiro verde para fusão:</b>
                          </div>
                          <div className='col'>
                            {passos(e.passo_7)}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Passo 9 - Ligar no conetor:</b>
                          </div>
                          <div className='col'>
                            {passos(e.passo_9)}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Passo 11 - Verficar revestimento dos cabos:</b>
                          </div>
                          <div className='col'>
                            {passos(e.passo_11)}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Passo 12 - Fechar o Tabuleiro:</b>
                          </div>
                          <div className='col'>
                            {passos(e.passo_12)}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Passo 13 - Colocar a tag no cabo de drop:</b>
                          </div>
                          <div className='col'>
                            {passos(e.passo_13)}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col'>
                            <b>Observações:</b>
                          </div>
                          <div className='col'>
                            {e.observacoes}
                          </div>
                        </div>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Relatorio;