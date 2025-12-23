import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAdminAction } from "../features/admin/adminAction";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const Admins = () => {
    const dispatch =useDispatch();
    const {allAdmins} = useSelector((state)=> state.adminInfo)

  useEffect(()=>{
    dispatch(fetchAllAdminAction())
  }, [dispatch])

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = allAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
    <div className="mt-5">
    <div className="p-4 d-flex justify-content-between align-items-center">
  <h3>Admin</h3>
  <Link to="/signup">
    <Button variant="dark">
      Create Admin <FaCirclePlus />
    </Button>
  </Link>
</div>

<hr />
<div
      style={{
        width: "85vw",
        height: "80vh",
        padding: 20,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <Table sx={{ minWidth: 300 }} aria-label="admin table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((admin, index) => (
              <TableRow key={admin._id}>
                <TableCell component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="right">{admin.fName } {" "} {admin.lName}</TableCell>
                <TableCell align="right">{admin.email}</TableCell>
                <TableCell align="right">{admin.phone}</TableCell>
                <TableCell align="right" style={{ cursor: "pointer", color: "red" }}>
                  Delete
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         <TablePagination
        component="div"
        count={allAdmins.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Rows per page:"
      />
      </div>

     
    </div>
    </div>
    </>
  );
};

export default Admins;
