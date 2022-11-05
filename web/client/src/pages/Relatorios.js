import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import "./Painel.css"
import Sidebar from '../components/Sidebar';


const columns = [
  { id: 'equipa', label: 'Equipa', minWidth: 170 },
  { id: 'idRel', label: 'Id do Relatório', minWidth: 100 },
  {
    id: 'data',
    label: 'Data',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'local',
    label: 'Local',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'revisto',
    label: 'Revisto',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];


const rows = [
 {equipa: "equipa1", idRel : "R1", data: "1/1/2000", local: "Barcelos", revisto: "SIM"},
 {equipa: "equipa2", idRel : "R2", data: "1/1/2000", local: "Barcelinhos", revisto: "NÃO"},
 {equipa: "equipa1", idRel : "R3", data: "1/1/2000", local: "Caldas da Rainha", revisto: "SIM"},
 {equipa: "equipa6", idRel : "R4", data: "1/1/2000", local: "Taipas", revisto: "SIM"},
 {equipa: "equipa1", idRel : "R5", data: "1/1/2000", local: "Lisboa", revisto: "SIM"},
 {equipa: "equipa3", idRel : "R6", data: "1/1/2000", local: "Castelo do Neiva", revisto: "NÃO"},
 {equipa: "equipa3", idRel : "R7", data: "1/1/2000", local: "Porto", revisto: "NÃO"},
 {equipa: "equipa4", idRel : "R8", data: "1/1/2000", local: "Braga", revisto: "SIM"},
 {equipa: "equipa7", idRel : "R9", data: "1/1/2000", local: "Viana do Castelo", revisto: "NÃO"},
 {equipa: "equipa6", idRel : "R10", data: "1/1/2000", local: "Bragança", revisto: "NÃO"},
 {equipa: "equipa6", idRel : "R11", data: "1/1/2000", local: "Algarve", revisto: "SIM"},
 {equipa: "equipa5", idRel : "R12", data: "1/1/2000", local: "Covilhã", revisto: "SIM"}
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>

    <div className="row">
      
    <Sidebar className ="left-panel"/>
    

    <div className="right-panel">

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    </div>

    </React.Fragment>
  );
};
