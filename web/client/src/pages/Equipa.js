import * as React from 'react';
import "./Painel.css"
import NavBar from '../components/Navbar';

const Equipa = () => {

    const id = "CGO0001"

    const [equipaID, setEquipa] = React.useState([]);

    async function getSkills(id) {
        console.log("id")
        const res = await fetch("http://localhost:3001/equipa/" + id)
        const equipaAux = await res.json();
        console.log(equipaAux)
        setEquipa(equipaAux)
    }

    React.useEffect(() => {
        console.log("OLa")
        getSkills(id);

    }, []);

    console.log(equipaID)
    return (

        <React.Fragment>
            <div className="row">
                <NavBar />
                <div className="right-panel" style={{ paddingTop: 10, paddingRight: 30 }}>
                    <h1 style={{ textAlign: "center" }}>Equipa <b>{equipaID[0].id}</b> </h1>
                    <div className='card' style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 class="card-title">Aptidões</h5>
                            <ul className="list-group">
                                {equipaID.map((e) => (<li className="list-group-item">{e.ap}</li>))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Equipa;