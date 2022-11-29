import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Main from "./pages/Main";
import Relatorios from "./pages/Relatorios"
import Relatorio from "./pages/Relatorio"
import Estatistica from "./pages/Estatistica"
import Pendentes from "./pages/Pendentes"
import Equipa from "./pages/Equipa"



const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/main" element={<Main />} />
				<Route exact path="/relatorios" element={<Relatorios />} />
				<Route exact path="/relatorio" element={<Relatorio />} />
				<Route exact path="/stats" element={<Estatistica />} />
				<Route exact path="/pendentes" element={<Pendentes />} />
				<Route exact path="/equipa" element={<Equipa />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
