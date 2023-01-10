import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBRow,
	MDBCol,
	MDBContainer,
	MDBBtn,
	MDBBtnGroup,
	MDBPagination,
	MDBPaginationItem,
	MDBPaginationLink,
} from "mdb-react-ui-kit";

import ip from "../config/ip";


function RelTable() {
	const [data, setData] = useState([]);
	const [value, setValue] = useState("");
	const [sortValue, setSortValue] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [pageLimit] = useState(4);
	const [sortFilterValue, setSortFilterValue] = useState("");
	const [operation, setOperation] = useState("");


	const sortOptions = ["Data de Início", "Data Fim", "Total de Erros"];

	useEffect(() => {
		loadUsersData(0, 4, 0);
	}, []);

	const loadUsersData = async (
		start,
		end,
		increase,
		optType = null,
		filterOrSortValue
	) => {
		switch (optType) {
			case "search":
				setOperation(optType);
				setSortValue("");
				return await axios
					.get(
						`http://localhost:3001/users?q=${value}&_start=${start}&_end=${end}`
					)
					.then((response) => {
						setData(response.data);
						setCurrentPage(currentPage + increase);
					})
					.catch((err) => console.log(err));
			case "sort":
				setOperation(optType);
				setSortFilterValue(filterOrSortValue);
				return await axios
					.get(
						`http://localhost:5000/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
					)
					.then((response) => {
						setData(response.data);
						setCurrentPage(currentPage + increase);
					})
					.catch((err) => console.log(err));
			case "filter":
				setOperation(optType);
				setSortFilterValue(filterOrSortValue);
				return await axios
					.get(
						`http://localhost:5000/users?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
					)
					.then((response) => {
						setData(response.data);
						setCurrentPage(currentPage + increase);
					})
					.catch((err) => console.log(err));
			default:
				return await axios
					.get(ip.backend_ip + 'pedidos')
					.then((response) => {
						setData(response.data);
						setCurrentPage(currentPage + increase);
					})
					.catch((err) => console.log(err));
		}
	};

	console.log("data", data);

	const handleAceitar = (p) => {
		return axios
			.get(ip.backend_ip + 'pedidosaceites/' + p)
			.then((response) => {
				setData(response.data);
				//setCurrentPage(currentPage + increase);
			})
			.catch((err) => console.log(err));
	}

	const handleRecusar = (p) => {
		return axios
			.get(ip.backend_ip + 'pedidosrecusados/' + p)
			.then((response) => {
				setData(response.data);
				//setCurrentPage(currentPage + increase);
			})
			.catch((err) => console.log(err));
	}

	const handleReset = () => {
		setOperation("");
		setValue("");
		setSortFilterValue("");
		setSortValue("");
		loadUsersData(0, 4, 0);
	};
	const handleSearch = async (e) => {
		e.preventDefault();
		loadUsersData(0, 4, 0, "search");
		// return await axios
		//   .get(`http://localhost:5000/users?q=${value}`)
		//   .then((response) => {
		//     setData(response.data);
		//     setValue("");
		//   })
		//   .catch((err) => console.log(err));
	};

	const handleSort = async (e) => {
		let value = e.target.value;
		loadUsersData(0, 4, 0, "sort", value);
		setSortValue(value);

		// return await axios
		//   .get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
		//   .then((response) => {
		//     setData(response.data);
		//   })
		//   .catch((err) => console.log(err));
	};

	const handleFilter = async (value) => {
		loadUsersData(0, 4, 0, "filter", value);
		// return await axios
		//   .get(`http://localhost:5000/users?status=${value}`)
		//   .then((response) => {
		//     setData(response.data);
		//   })
		//   .catch((err) => console.log(err));
	};

	const renderPagination = () => {
		if (data.length < 4 && currentPage === 0) return null;
		if (currentPage === 0) {
			return (
				<MDBPagination className="mb-0">
					<MDBPaginationItem>
						<MDBPaginationLink>1</MDBPaginationLink>
					</MDBPaginationItem>
					<MDBPaginationItem>
						<MDBBtn onClick={() => loadUsersData(4, 8, 1, operation)}>
							Next
						</MDBBtn>
					</MDBPaginationItem>
				</MDBPagination>
			);
		} else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
			return (
				<MDBPagination className="mb-0">
					<MDBPaginationItem>
						<MDBBtn
							onClick={() =>
								loadUsersData(
									(currentPage - 1) * 4,
									currentPage * 4,
									-1,
									operation,
									sortFilterValue
								)
							}
						>
							Prev
						</MDBBtn>
					</MDBPaginationItem>
					<MDBPaginationItem>
						<MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
					</MDBPaginationItem>

					<MDBPaginationItem>
						<MDBBtn
							onClick={() =>
								loadUsersData(
									(currentPage + 1) * 4,
									(currentPage + 2) * 4,
									1,
									operation,
									sortFilterValue
								)
							}
						>
							Next
						</MDBBtn>
					</MDBPaginationItem>
				</MDBPagination>
			);
		} else {
			return (
				<MDBPagination className="mb-0">
					<MDBPaginationItem>
						<MDBBtn
							onClick={() =>
								loadUsersData(
									(currentPage - 1) * 4,
									currentPage * 4,
									-1,
									operation
								)
							}
						>
							Prev
						</MDBBtn>
					</MDBPaginationItem>
					<MDBPaginationItem>
						<MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
					</MDBPaginationItem>
				</MDBPagination>
			);
		}
	};

	return (
		<MDBContainer>
			<div style={{
				marginTop: "50px",
				padding: "20px"
			}}>
				{data.length > 0 && (
					<MDBRow>
						<MDBCol size="4">
							<h5>Filter By Status:</h5>
							<MDBBtnGroup>
								<MDBBtn color="success" onClick={() => handleFilter("Active")}>
									Ativos
								</MDBBtn>
								<MDBBtn
									color="danger"
									style={{ marginLeft: "2px" }}
									onClick={() => handleFilter("Inactive")}
								>
									Encerrados
								</MDBBtn>
							</MDBBtnGroup>
						</MDBCol>
					</MDBRow>
				)}
				<MDBRow>
					<MDBCol size="12">
						<MDBTable>
							<MDBTableHead light>
								<tr>
									<th scope="col">Id da Intervenção</th>
									<th scope="col">Estado</th>
									<th scope="col">Descrição</th>
									<th scope="col"></th>
									<th scope="col"></th>
								</tr>
							</MDBTableHead>
							{data.length === 0 ? (
								<MDBTableBody className="align-center mb-0">
									<tr>
										<td colSpan={8} className="text-center mb-0">
											Sem Pedidos Pendentes
										</td>
									</tr>
								</MDBTableBody>
							) : (
								data.map((item, index) => (
									<MDBTableBody key={index}>
										<tr>

											<td>{item.id_intervencao}</td>
											<td>{item.estado}</td>
											<td>{item.descricao}</td>
											<button icon="fas fa-sign-out-alt" type="button" class="btn btn-outline-dark" onClick={() => handleAceitar(item.id)}> Aceitar </button>
											<button icon="fas fa-sign-out-alt" type="button" class="btn btn-outline-dark" onClick={() => handleRecusar(item.id)}> Recusar </button>

										</tr>
									</MDBTableBody>
								))
							)}
						</MDBTable>
					</MDBCol>
				</MDBRow>
				<div
					style={{
						margin: "auto",
						padding: "15px",
						maxWidth: "250px",
						alignContent: "center",
					}}
				>
					{renderPagination()}
				</div>
			</div>
		</MDBContainer >
	);
}

export default RelTable;
