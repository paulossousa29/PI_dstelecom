import * as React from 'react';
import "./Painel.css"
import NavBar from '../components/Navbar';
import "./Avaliacao.css"
import ip from '../config/ip';


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
    return (

        <React.Fragment>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
                                            <div className='col-4'>
                                                {aspeto}
                                                <span class="w3-large fa-solid fa-star checked"></span>
                                                <span class="w3-large fa-solid fa-star checked"></span>
                                                <span class="w3-large fa-solid fa-star checked"></span>
                                                <span class="w3-large fa-solid fa-star checked"></span>
                                                <span class="w3-large fa-solid fa-star"></span>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className='row'>
                                            <div className='col-4'>
                                                Usabilidade
                                            </div>
                                            <div className='col-4'>
                                                {usabilidade}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className='row'>
                                            <div className='col-4'>
                                                Global
                                            </div>
                                            <div className='col-4'>
                                                {global}
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