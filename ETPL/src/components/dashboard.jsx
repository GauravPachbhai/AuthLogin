import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const URL = 'http://localhost:8000';
function Dashboard() {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setAuth(false);
          return;
        }

        const result = await axios.get(`${URL}/api/users/getusers`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(result.data.users);
        setUsers(result.data.users);

      } catch (error) {
        console.log(error);
        
      }
    }

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        height: '86.5vh'
      }}
    >
      <h1>User Dashboard</h1>
      {
        auth ?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Users</StyledTableCell>
                  <StyledTableCell align="right">DOB</StyledTableCell>
                  <StyledTableCell align="right">Email&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.dob}</StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> :
          <Typography>Login again to display <a href='/login'>login</a></Typography>
      }
    </Box>
  );
}

export default Dashboard;
