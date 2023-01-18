import * as React from 'react';
import "./Painel.css"
import NavBar from '../components/Navbar';
import "./Avaliacao.css"
import ip from '../config/ip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Avaliacao = () => {

    const [avaliacao, setAvaliacao] = React.useState([]);

    async function getAvaliacao() {
        const res = await fetch(ip.backend_ip + "ava");
        const avaliacaoAux = await res.json();
        setAvaliacao(avaliacaoAux);
    }
    React.useEffect(() => {
        getAvaliacao();
    }, []);


    let aspeto = 0
    let global = 0
    let usabilidade = 0
    let total = avaliacao.length;

    function medias(avaliacao){
        let i;
        for (i  = 0; i < total; i++){
            aspeto = aspeto + avaliacao[i].avaliacao_aspeto
            global = global +  avaliacao[i].avaliacao_global
            usabilidade = usabilidade  + avaliacao[i].avaliacao_usabilidade
        }
        if(total !== 0){
            aspeto = aspeto/total
            global = global/total
            usabilidade = usabilidade/total
        }
    }

    console.log(avaliacao)
    const a = [0,0,0,0,0];
    function preenchido(avali){
        let i;
        for(i = 0; i < 5; i++){
            if(avali >= 1){
                a[i] = 1 
                avali -= 1
            }
            else {
                a[i] = 0
            }
        }
        return a;
    }


    return (

        <React.Fragment>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="row">
                <NavBar />
                <div className='row'>
                    <div className="right-panel" style={{ paddingTop: 10, paddingRight: 30 }}>
                        <div className='card'>
                            <div className="card-body">
                                <h5 className="card-title">Avaliações</h5>
                                {medias(avaliacao)}
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className='row'>
                                            <div className='col-4'>
                                                Aspeto
                                            </div>
                                            <div className='col-8'>
                                                {aspeto}
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className='row'>
                                            <div className='col-4'>
                                                Usabilidade
                                            </div>
                                            <div className='col-8'>
                                                {usabilidade}
                                                {preenchido(usabilidade).map((e) => {
                                                    if(e === 1){
                                                        return <span class="fa fa-star checked"></span>
                                                    }
                                                    else {
                                                        return <span class="fa fa-star"></span>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className='row'>
                                            <div className='col-4'>
                                                Global
                                            </div>
                                            <div className='col-8'>
                                                {global}
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
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

export default Avaliacao;