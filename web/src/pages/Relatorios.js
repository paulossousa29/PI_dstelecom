import * as React from 'react';
import StatsTable from "../components/RelTable";
import NavBar from '../components/Navbar';
import RelTable from '../components/RelTable';


const Home = () => {
  return (

    <React.Fragment>
      <div className="row">
        <NavBar />
        <div className="right-panel" style={{ paddingTop: 10, paddingRight: 20 }}>
          <RelTable />
        </div>

      </div>
    </React.Fragment>


  );
};

export default Home;