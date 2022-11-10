import * as React from 'react';


import "./Painel.css"
import Sidebar from '../components/Sidebar';
import Pie from '../components/PieChartTeam';
import Perfil from '../components/Perfil';
import NavBar from '../components/NavBar';

const Equipa = () => {
	return (

    <React.Fragment>
        <div className="row">
            <NavBar/>
            <div className="right-panel" style={{paddingTop: 10, paddingRight: 30}}>
			    <Pie />
                <div>
                    <h1 style={{textAlign: "center"}}>Contactos</h1>
                    <div className="row">
                        <Perfil className="right-panel"/>
                        <Perfil className="left-panel"/>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
			
		
	);
};

export default Equipa;