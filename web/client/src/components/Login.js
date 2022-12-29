import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from "../assets/dstelecomlogo.png";

import axios from 'axios'
import { useNavigate } from "react-router-dom";




const Login = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: "",
		pass: ""
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3001/login", {
				headers: { "Accept": "application/json, text/plain, /", "Content-Type": "application/json" },
				username: values.username,
				password: values.pass,
			})
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				navigate("/stats")
			})
			.catch((err) => console.error(err));
	};

	return (
		<React.Fragment>
			<section style={{ margin: "100px" }}>
				<div
					className="px-4 py-5 px-md-5 text-center text-lg-start"
					style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
				>
					<div className="container">
						<div className="row gx-lg-5 align-items-center">
							<div className="col-lg-6 mb-5 mb-lg-0">
								<center>
									<img
										style={{ width: "400pt" }}
										src={logo}
										alt="Logo"
										className=""
									/>
								</center>
							</div>
							<div className="col-lg-6 mb-5 mb-lg-0">
								<div className="card">
									<div className="card-body py-5 px-md-5">
										<Form onSubmit={handleSubmit}>
											{/* Email */}
											<Form.Group
												controlId="user"
												className="form-outline mb-4"
											>
												<Form.Label
													className="form-label"
													htmlFor="form2Example1"
												>
													Email
												</Form.Label>
												<Form.Control
													type="username"
													id="form2Example1"
													className="form-control"
													placeholder="Email"
													required
													onChange={(e) => setValues({ ...values, username: e.target.value })
													}
												/>
											</Form.Group>
											{/* Password */}
											<Form.Group
												controlId="pass"
												className="form-outline mb-4"
											>
												<Form.Label
													className="form-label"
													for="form2Example1"
												>
													Password
												</Form.Label>
												<Form.Control
													type="password"
													id="form2Example1"
													className="form-control"
													placeholder="Password"
													required
													onChange={(e) => setValues({ ...values, pass: e.target.value })
													}
												/>
											</Form.Group>


											<Button
												type="submit"
												className="btn btn-secondary btn-block mb-4"
											>
												Iniciar Sessão
											</Button>
										</Form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
}

export default Login;
