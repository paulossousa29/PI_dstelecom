import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "./GlobalFilter";
import TablePagination from '@mui/material/TablePagination';
import { MDBBtn } from 'mdb-react-ui-kit';
import { TableContainer } from "@mui/material";
import Paper from '@mui/material/Paper';


 const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-gray-500
`;

const TableHeader = tw.th`
border
border-gray-500
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
border
border-gray-500
p-5
`;


const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-red-300
  hover:bg-red-200
  transition-colors
`;

export default function Pend(props) {

 
    const [products, setProducts] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    // Vai buscar os dados à API
  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => console.log(err));

    if (response) {
      const products = response.data;

      console.log("Products: ", products);
      setProducts(products);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  // Dados:
  const data = useMemo(
    () => [
      {
        id: 1,
        equipa: "equipa1",
        trabalho: "XAZ",
        descrição: "Mudança PDO",
        estado: "Pendente"
      },
      {
        id: 2,
        equipa: "equipa1",
        trabalho: "XYB",
        descrição: "Mudança conetor",
        estado: "Pendente"
      },
      {
        id: 3,
        equipa: "equipa2",
        trabalho: "AJK",
        descrição: "Mudança PDO",
        estado: "Pendente"
      },
    ],
    []
  );

  //Colunas:
  const columns = useMemo(
    () => [
      {
        Header: "Equipa",
        accessor: "equipa",
      },
      {
        Header: "Intervenção",
        accessor: "trabalho",
      },
      {
        Header: "Descrição",
        accessor: "descrição",
      },
      {
        Header: "Estado do Pedido",
        accessor: "estado",
      }
    ],
    []
  );


  const productsData = useMemo(() => [...products], [products]);

  const productsColumns = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== "rating")
            .map((key) => {
              if (key === "image")
                return {
                  Header: key,
                  accessor: key,
                  Cell: ({ value }) => <img style={{ width: 200, height: 100 }} src={value} />,
                  maxWidth: 10,
                };

              return { Header: key, accessor: key };
            })
        : [],
    [products]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Aut",
        Cell: ({ row }) => (
          <MDBBtn rippleColor='dark' color='light' onClick={() => alert("Editing: " + row.values.pedido)}>
            Autorizar
          </MDBBtn>
        ),
      },
      {
        id: "Naut",
        Cell: ({ row }) => (
          <MDBBtn rippleColor='dark' color='light' onClick={() => alert("Editing: " + row.values.pedido)}>
            Não Autorizar
          </MDBBtn>
        ),
      },
    ]);
  };

  

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    tableHooks,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  useEffect(() => {
    fetchProducts();
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <>
      <div className="table-responsive" style={{marginLeft:10}}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={state.globalFilter}
        />
      </div>
      <div className="right-panel" style={{paddingTop: 10, paddingRight: 30, marginLeft:20}}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHeader key={column.id} align={column.align} style={{ minWidth: column.minWidth }}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                      
                    </TableHeader>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
                prepareRow(row);

                return (
                  <TableRow hover role="checkbox" tabIndex={-1}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell, idx) => (
                      <TableData {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableData>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </Table>
        </TableContainer>
        </Paper>
      </div>
    </>
  );



}
