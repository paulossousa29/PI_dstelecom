import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Relatorios from "./pages/Relatorios"
import Relatorio from "./pages/Relatorio"


const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/main" element={<Main />} />
				<Route path="/relatorios" element={<Relatorios />} />
				<Route path="/relatorio" element={<Relatorio />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
