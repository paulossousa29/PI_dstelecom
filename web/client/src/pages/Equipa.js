import * as React from 'react';
import "./Painel.css"
import NavBar from '../components/Navbar';




const Equipa = () => {

    const id = "CGO0001"

    const [equipaID, setEquipa] = React.useState([]);

    async function getSkills(id) {
        const res = await fetch("http://localhost:3001/equipa/" + id);
        const equipaAux = await res.json();
        setEquipa(equipaAux);
    }

    async function deleteSkill (id){
        //console.log("O id é: " + id)
        const res = await fetch ("http://localhost:3001/equipa/delete/" + id);
        const skills = await res.json();
        setEquipa(skills)
    }

    React.useEffect(() => {
        getSkills(id);
    }, []);

    return (

        <React.Fragment>
            <div className="row">
                <NavBar />
                <div className="right-panel" style={{ paddingTop: 10, paddingRight: 30 }}>
                    <h1 style={{ textAlign: "center" }}>Equipa <b>{id}</b> </h1>
                    <div className='card' style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 class="card-title">Aptidões</h5>
                            <ul className="list-group">
                                {equipaID.map((e) => (
                                <li className="list-group-item">
                                    {e.ap} 
                                    <button onClick={(aux) => {
                                        deleteSkill(e.id)
                                    }}>Eliminar aptidão</button>
                                </li>))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Equipa;