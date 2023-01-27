import * as React from 'react';



import "./Painel.css"
import NavBar from '../components/Navbar';
import Pend from '../components/Pendentes';

const Pendentes = () => {
	return (

    <React.Fragment>
      

    <div className="row">
      <NavBar/>
		
    <div className="right-panel" style={{paddingTop: 10, paddingRight: 30}}>
			<Pend />
            </div>

    </div>
    </React.Fragment>
			
		
	);
};

export default Pendentes;