import * as React from 'react';
import "./Painel.css"
import NavBar from '../components/Navbar';
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";
import ip from '../config/ip';


const Avaliacao = ({ route }) => {

    const [avaliacao, setAvaliacao] = React.useState([]);

    async function getAvaliacao() {
        const res = await fetch(ip.backend_ip + "avaliacao");
        const avaliacaoAux = await res.json();
        setAvaliacao(avaliacaoAux);
    }
    React.useEffect(() => {
        getAvaliacao();
    }, []);


    let aspeto = 0
    let global = 0
    let usabilidade = 0
    let total = avaliacao.length()

    function medias(avaliacao){
        let i;
        for (i  = 0; i < total; i++){
            aspeto = aspeto + avaliacao[i].avaliacao_aspeto
            global = global +  avaliacao[i].avaliacao_global
            usabilidade = usabilidade  + avaliacao[i].avaliacao_usabilidade
        }
        aspeto = aspeto/total
        global = global/total
        usabilidade = usabilidade/total
    }
    return (

        <React.Fragment>
            <div className="row">
                <NavBar />
                <div className='row'>
                    <ul className='list-group'>
                        {medias(avaliacao)}
                        <li className="list-group-item">
                            <b>Avaliação do aspeto:</b> {aspeto}
                        </li>
                        <li className="list-group-item">
                            <b>Avaliação da usabilidade:</b> {usabilidade}
                        </li>
                        <li className="list-group-item">
                            <b>Avaliação global da aplicação:</b> {global}
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Avaliacao;