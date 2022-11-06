import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import tw from "twin.macro";
import { GlobalFilter } from "./GlobalFilter";
import TablePagination from '@mui/material/TablePagination';
import TableCell from '@mui/material/TableCell';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

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

export default function StatsTable(props) {

 
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
        total: 10,
        ordens: 2,
        erros: 5
      },
      {
        id: 2,
        equipa: "equipa2",
        total: 20,
        ordens: 5,
        erros: 1

      },
      {
        id: 2,
        equipa: "equipa3",
        total: 15,
        ordens: 7,
        erros: 12
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
        Header: "Total de Trabalhos",
        accessor: "total",
      },
      {
        Header: "Trabalhos Com Alterações",
        accessor: "ordens",
      },
      {
        Header: "Média de Erros por Trabalho",
        accessor: "erros",
      },
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
        id: "Edit",
        Header: "Consultar Equipa",
        Cell: ({ row }) => (
          <Button onClick={() => alert("Editing: " + row.values.price)}>
            Informação
          </Button>
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
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
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
              <TableRow tabIndex={-1}
                {...row.getRowProps()}
                className={isEven(idx) ? "bg-gray-400 bg-opacity-30" : ""}
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

      <div style={{paddingLeft:900}}>
            <TableCell align="right">Total Alterações</TableCell>
            <TableCell align="right">{ccyFormat(10)}</TableCell>
      </div>
      <div style={{paddingLeft:830}}>
            <TableCell align="right">Total Desencaminhamentos</TableCell>
            <TableCell align="right">{ccyFormat(10)}</TableCell>
      </div>
    </>
  );



}
