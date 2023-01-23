import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink,
} from "mdb-react-ui-kit";
import ip from "../config/ip";

import Relatorio from "../pages/Relatorio"
import { useNavigate } from "react-router-dom";




function RelTable() {
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageLimit] = useState(4);
    const [sortFilterValue, setSortFilterValue] = useState("");
    const [operation, setOperation] = useState("");
    const sortOptions = ["Data de Início", "Data Fim", "Total de Erros", "Duração"];

    const navigate = useNavigate();
    useEffect(() => {
        loadUsersData(0, 4, 0);
    }, []);

    const handleConsulta = (p) => {
        navigate('/relatorio', { state: { id: p } })
    }

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
                        ip.backend_ip + 'searchrel/' + value
                    )
                    .then((response) => {
                        setData(response.data);
                        //setCurrentPage(currentPage + increase);
                    })
                    .catch((err) => console.log(err));
            case "sort":
                setOperation(optType);
                setSortFilterValue(filterOrSortValue);
                return await axios
                    .get(
                        ip.backend_ip + 'relsort/' + filterOrSortValue
                    )
                    .then((response) => {
                        setData(response.data);
                        //setCurrentPage(currentPage + increase);
                    })
                    .catch((err) => console.log(err));
            default:
                return await axios
                    .get(ip.backend_ip + 'relatorios')
                    .then((response) => {
                        setData(response.data);
                        //setCurrentPage(currentPage + increase);
                    })
                    .catch((err) => console.log(err));
        }
    };

    console.log("data", data);

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

    const horas = (item) => {
        if (item.duracao.hours == null) {
            item.duracao.hours = 0
        }
        else {
            item.duracao.hours = item.duracao.hours
        }


        if (item.duracao.days == null) {
            item.duracao.days = 0
        }
        else {
            item.duracao.days = item.duracao.days
        }

        if (item.duracao.minutes == null) {
            item.duracao.minutes = 0
        }
        else {
            item.duracao.minutes = item.duracao.minutes
        }

        if (item.duracao.seconds == null) {
            item.duracao.seconds = 0
        }
        else {
            item.duracao.seconds = item.duracao.seconds
        }


        return item.duracao.days + ' d :' + item.duracao.hours + ' h :' + item.duracao.minutes + ' min :' + item.duracao.seconds + ' s'
    }

    const verifica = (i) => {

        if (i == "0") {
            return "Não verificado"
        }
        else return "Verificado"
    }



    const renderPagination = () => {
        if (data.length < 4 && currentPage === 0) return null;
        if (currentPage === 0) {
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <MDBPaginationLink>1</MDBPaginationLink>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <button onClick={() => loadUsersData(4, 8, 1, operation)}>
                            Next
                        </button>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <button
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
                        </button>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                    </MDBPaginationItem>

                    <MDBPaginationItem>
                        <button
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
                        </button>
                    </MDBPaginationItem>
                </MDBPagination>
            );
        } else {
            return (
                <MDBPagination className="mb-0">
                    <MDBPaginationItem>
                        <button
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
                        </button>
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
            <form
                style={{
                    width: "50%", borderRadius: "2px", height: "35px", marginBottom: "20px",
                    margin: "auto",
                    padding: "30px",
                    maxWidth: "500px",
                    alignContent: "start",
                }}
                className="d-flex input-group w-auto"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisa "
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div class='parent'>
                    <button style={{ borderRadius: "12px", backgroundColor: "gray" }} className="child" type="submit" color="light">
                        Search
                    </button>
                    <button style={{ borderRadius: "12px", backgroundColor: "gray" }} className="child" color="info" onClick={() => handleReset()}>
                        Reset
                    </button>

                </div>
            </form>
            <div style={{
                marginTop: "50px",
                padding: "20px"
            }}>
                {data.length > 0 && (
                    <MDBRow>
                        <MDBCol size="8">
                            <h5>Filtrar por:</h5>
                            <select
                                style={{ width: "50%", borderRadius: "12px", height: "35px", marginBottom: "20px" }}
                                onChange={handleSort}
                                value={sortValue}
                            >
                                <option>Selecione um Valor</option>
                                {sortOptions.map((item, index) => (
                                    <option value={item} key={index}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </MDBCol>
                    </MDBRow>
                )}
                <MDBRow>
                    <MDBCol size="12">
                        <MDBTable>
                            <MDBTableHead light>
                                <tr>
                                    <th scope="col">Id da Intervenção</th>
                                    <th scope="col">Equipa</th>
                                    <th scope="col">Total de Erros</th>
                                    <th scope="col">Observações</th>
                                    <th scope="col">Data de Início</th>
                                    <th scope="col">Data do Fim</th>
                                    <th scope="col">Duração Total</th>
                                    <th scope="col">Verificação</th>
                                    <th scope="col"></th>
                                </tr>
                            </MDBTableHead>
                            {data.length === 0 ? (
                                <MDBTableBody className="align-center mb-0">
                                    <tr>
                                        <td colSpan={8} className="text-center mb-0">
                                            No Data Found
                                        </td>
                                    </tr>
                                </MDBTableBody>
                            ) : (
                                data.map((item, index) => (
                                    <MDBTableBody key={index}>
                                        <tr>
                                            {console.log("o id é:")}
                                            {console.log(item.id)}
                                            <td>{item.id_intervencao}</td>
                                            <td>{item.id_equipa}</td>
                                            <td>{item.total_erros}</td>
                                            <td>{item.observacoes}</td>
                                            <td>{item.data_inicio}</td>
                                            <td>{item.data_fim}</td>
                                            <td>{horas(item)}</td>
                                            <td>{verifica(item.verificar)}</td>
                                            <button icon="fas fa-sign-out-alt" type="button" class="btn btn-outline-dark" onClick={() => handleConsulta(item.id)}> Consultar </button>

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
                </div>
            </div>
        </MDBContainer >
    );
}

export default RelTable;
