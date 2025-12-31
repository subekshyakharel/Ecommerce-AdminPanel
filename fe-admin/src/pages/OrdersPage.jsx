import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrderAction } from '../features/order/orderAction'
import { RiEdit2Fill } from "react-icons/ri";
import { setModalContent, setmodalShow } from '../features/system/systemSlice'
import EditOrderform from '../components/form/EditOrderform'


const OrdersPage = () => {
    const dispatch = useDispatch();
    const {allOrder} = useSelector((state)=> state.orderInfo)
    const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);

      useEffect(()=>{
        dispatch(fetchAllOrderAction())
      }, [dispatch])
    
      const handleChangePage = (event, newPage) => setPage(newPage);
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const visibleRows = allOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      const handleOnEdit = (id)=>{
    dispatch(
      setModalContent({ content: <EditOrderform id={id} />, title: "Edit Status" })
    );
    dispatch(setmodalShow(true));


      }
  return (
      <div>

 <div className="mt-5">
       <div className="p-4 d-flex justify-content-between align-items-center">
     <h3>Orders</h3>
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
                 <TableCell>Status</TableCell>
                 <TableCell>Order Date</TableCell>
                 <TableCell>Order Number</TableCell>
                 <TableCell>Details</TableCell>
                 <TableCell align="right">Amount</TableCell>
                 <TableCell align="right">Action</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {visibleRows.map((item, index) => (
                 <TableRow key={item._id}>
                   <TableCell component="th" scope="row">
                     {page * rowsPerPage + index + 1}
                   </TableCell>
                   <TableCell>{item.status}</TableCell>
                   <TableCell>{item.orderDate.slice(0, 10)}</TableCell>
                   <TableCell>{item.orderNumber}</TableCell>
                   <TableCell align="left">{item.productTitle} {" - "} {item.quantity}</TableCell>
                   <TableCell align='center'>{item.price}</TableCell>
                   <TableCell onClick={()=>handleOnEdit(item._id)} align="center" style={{color:"blue"}}><RiEdit2Fill size={30} /></TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
            <TablePagination
           component="div"
           count={allOrder.length}
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
    </div>
  )
}

export default OrdersPage