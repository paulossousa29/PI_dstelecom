import React, { useState } from "react";
import SlideShow from "../components/SlideShow";
import NavBar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

import "./Painel.css"
import ip from '../config/ip';

const Relatorio = () => {
  const location = useLocation();

  const id = location.state.id
  console.log(id);
  
  const [relatorio,setRelatorio] = React.useState([]);


  async function getRelatorio(id) {
    const res = await fetch(ip.backend_ip + "relatorio/" + id);
    const relatorio = await res.json();
    setRelatorio(relatorio);
  }

  React.useEffect(() => {
    getRelatorio(id);
  }, []);


  return (
    <React.Fragment>
      <div className="row">
        <NavBar />
        <div className='row'>
          <div className="right-panel" style={{ paddingTop: 10, paddingRight: 30 }}>
            <h1 style={{ textAlign: "center" }}>Relatório <b>{id}</b> </h1>
            <div className='card'>
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Data de inicio:</b>
                      </div>
                      <div className='col-8'>
                        {relatorio[0].data_inicio}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Data de fim:</b>
                      </div>
                      <div className='col-8'>
                        {relatorio[0].data_fim}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Id da intervenção:</b>
                      </div>
                      <div className='col-8'>
                        {relatorio[0].id_intervenção}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Passo 1:</b>
                      </div>
                      <div className='col-8'>
                        {(() => {
                          if(relatorio[0].passo_1 === 0){
                            return "Passo incorreto"
                          }
                          else{
                            return "Passo correto"
                          }
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Passo 3:</b>
                      </div>
                      <div className='col-8'>
                        {(() => {
                          if(relatorio[0].passo_3 === 0){
                            return "Passo incorreto"
                          }
                          else{
                            return "Passo correto"
                          }
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Passo 5:</b>
                      </div>
                      <div className='col-8'>
                        {(() => {
                          if(relatorio[0].passo_5 === 0){
                            return "Passo incorreto"
                          }
                          else{
                            return "Passo correto"
                          }
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Passo 7:</b>
                      </div>
                      <div className='col-8'>
                        {(() => {
                          if(relatorio[0].passo_7 === 0){
                            return "Passo incorreto"
                          }
                          else{
                            return "Passo correto"
                          }
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Passo 9:</b>
                      </div>
                      <div className='col-8'>
                        {(() => {
                          if(relatorio[0].passo_9 === 0){
                            return "Passo incorreto"
                          }
                          else{
                            return "Passo correto"
                          }
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Passo 11:</b>
                      </div>
                      <div className='col-8'>
                        {(() => {
                          if(relatorio[0].passo_11 === 0){
                            return "Passo incorreto"
                          }
                          else{
                            return "Passo correto"
                          }
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Passo 12:</b>
                      </div>
                      <div className='col-8'>
                        {(() => {
                          if(relatorio[0].passo_12 === 0){
                            return "Passo incorreto"
                          }
                          else{
                            return "Passo correto"
                          }
                        })}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className='row'>
                      <div className='col-4'>
                        <b>Passo 13:</b>
                      </div>
                      <div className='col-8'>
                        {(() => {
                          if(relatorio[0].passo_13 === 0){
                            return "Passo incorreto"
                          }
                          else{
                            return "Passo correto"
                          }
                        })}
                      </div>
                    </div>
                  </li>
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