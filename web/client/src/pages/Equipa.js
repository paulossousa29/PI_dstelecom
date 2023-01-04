import * as React from 'react';
import "./Painel.css"
import NavBar from '../components/Navbar';

import { useLocation, useNavigate } from "react-router-dom";

const Equipa = ({ route, navigate }) => {
    const location = useLocation();

    const id = location.state.id

    const [equipaID, setEquipa] = React.useState([]);
    const [value, setValue] = React.useState("");

    async function getSkills(id) {
        const res = await fetch("http://localhost:3001/equipa/" + id);
        const equipaAux = await res.json();
        setEquipa(equipaAux);
    }

    async function deleteSkill(id, idEquipa) {
        console.log("O id é: " + id)
        const res = await fetch("http://localhost:3001/equipa/delete/" + id + "/" + idEquipa);
        const skills = await res.json();
        setEquipa(skills)
    }

    async function handleAdd(ap, idEquipa) {
        const res = await fetch("http://localhost:3001/equipa/add/" + ap + "/" + idEquipa);
        const skills = await res.json();
        setEquipa(skills)
    }

    React.useEffect(() => {
        getSkills(id);
    }, []);

    console.log(value);
    return (

        <React.Fragment>
            <div className="row">
                <NavBar />
                <div className='row'>
                    <div className='col'>
                        <div className="right-panel" style={{ paddingTop: 10, paddingRight: 30 }}>
                            <h1 style={{ textAlign: "center" }}>Equipa <b>{id}</b> </h1>
                            <div className='card'>
                                <div className="card-body">
                                    <h5 className="card-title">Aptidões</h5>
                                    <ul className="list-group">
                                        {equipaID.map((e) => (
                                            <li className="list-group-item">
                                                <div className='row'>
                                                    <div className='col-8'>
                                                        {e.ap}
                                                    </div>
                                                    <div className='col-4'>
                                                        <button style={{ borderRadius: "12px", backgroundColor: "gray" }} onClick={(aux) => {
                                                            deleteSkill(e.id, e.id_equipa)
                                                        }}>Eliminar</button>
                                                    </div>
                                                </div>
                                            </li>))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <form
                            style={{
                                width: "50%", borderRadius: "2px", height: "35px", marginBottom: "20px",
                                margin: "auto",
                                padding: "30px",
                                maxWidth: "500px",
                                alignContent: "start",
                            }}
                            className="d-flex input-group w-auto"
                            onSubmit={() => handleAdd(value, id)}>
                            <div>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Ex: Pontual "
                                    value={value}
                                    cols="80"
                                    rows="5"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </div>
                            <div style={{ paddingTop: "10pt" }} className='parent'>
                                <button style={{ borderRadius: "12px", backgroundColor: "gray" }} className="child" type="submit" color="light">
                                    Adicionar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Equipa;