import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getASingleReviewByIdAction, getReviewedProductAction } from '../features/review/reviewAction'
import TablePagination from '@mui/material/TablePagination'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Reviews = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
     const handleChangePage = (event, newPage) => setPage(newPage);
    const dispatch = useDispatch();
    const {reviews}= useSelector((state)=> state.reviewInfo);
    const {productReview} = useSelector((state)=> state.reviewInfo)
    const [openRow, setOpenRow] = useState(null)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(()=>{
    dispatch(getReviewedProductAction())
  }, [dispatch])

  const uniqueProducts = React.useMemo(() => {
  const seen = new Set();

  return reviews.filter((item) => {
    if (seen.has(item.productId)) return false;
    seen.add(item.productId);
    return true;
  });
}, [reviews]);


  const visibleRows = uniqueProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
       <div>
      <div className="mt-5">
        <div className="p-4 d-flex justify-content-between align-items-center">
          <h3>Reviews</h3>
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
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((review, index) => (
                  <React.Fragment key={review._id}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="right">{review.productTitle}</TableCell>

                    <TableCell align="right">
                      <img
                        src={review.thumbnail}
                        alt=""
                        className="rounded-circle"
                        width={"100px"}
                      />
                    </TableCell>
                    <TableCell align="right">{review.price}</TableCell>
                    <TableCell align="right" style={{ cursor: "pointer" }}>
                      <Link to={`/admin/reviews/${review.productId}`}>
                    <Button variant='success'>View Review</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={reviews.length}
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
    </div>
  )
}

export default Reviews