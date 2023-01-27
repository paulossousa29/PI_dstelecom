import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";
import React, { useState } from "react";

// import Home from "./pages/Home";
import Main from "./pages/Main";
import Relatorios from "./pages/Relatorios";
import Relatorio from "./pages/Relatorio";
import Estatistica from "./pages/Estatistica";
import Pendentes from "./pages/Pendentes";
import Equipa from "./pages/Equipa";
import Login from "./components/Login";
import Protected from "./components/Protected";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route path="/stats" element={<Protected> <Estatistica /> </Protected>} />
				<Route exact path="/relatorios" element={<Protected> <Relatorios /> </Protected>} />
				<Route exact path="/relatorio" element={<Protected>  <Relatorio /> </Protected>} />
				<Route exact path="/pendentes" element={<Protected> <Pendentes /> </Protected>} />
				<Route exact path="/equipa" element={<Protected> <Equipa /></Protected>} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
