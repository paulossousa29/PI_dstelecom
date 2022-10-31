import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
	return (
		<BrowserRouter>
			<nav>
				<div>
					<h1>Hello World</h1>
					<Link to="/">Página Inicial</Link>
					<Link to="/login">Login</Link>
				</div>
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
