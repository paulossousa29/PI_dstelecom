import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import logo from "../assets/dstelecomlogo.png";
import PropTypes from "prop-types";

async function loginUser(credentials) {
	return fetch("http://localhost:3001/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}

export default function Login({ setToken }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = await loginUser({
			email,
			password,
		});
		setToken(token);
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
												controlId="email"
												className="form-outline mb-4"
											>
												<Form.Label
													className="form-label"
													htmlFor="form2Example1"
												>
													Email
												</Form.Label>
												<Form.Control
													type="email"
													id="form2Example1"
													className="form-control"
													placeholder="Email"
													value={email}
													onChange={(e) =>
														setEmail(e.target.value)
													}
												/>
											</Form.Group>
											{/* Password */}
											<Form.Group
												controlId="password"
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
													value={password}
													onChange={(e) =>
														setPassword(
															e.target.value
														)
													}
												/>
											</Form.Group>

											<div className="row mb-4">
												<div className="col d-flex justify-content-center">
													<div className="form-check">
														<input
															className="form-check-input"
															type="checkbox"
															value=""
															id="form2Example31"
														/>
														<label
															className="form-check-label"
															htmlFor="form2Example31"
														>
															{" "}
															Remember me{" "}
														</label>
													</div>
												</div>
											</div>
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

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};
