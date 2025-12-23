import { useEffect, useState } from "react";
import ProductForm from "../components/form/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductAction } from "../features/product/productAction";
import { Button } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { AiFillDelete } from "react-icons/ai";
import TablePagination from "@mui/material/TablePagination";
import {
  setModalContent,
  setmodalShow,
} from "../features/system/systemSlice.js";
import { fetchParentCategoriesAction } from "../features/category/categoryAction.js";
import { deleteProductApi } from "../features/product/productApi.js";
import { FaEdit } from "react-icons/fa";
import EditProductForm from "../components/form/EditProductForm.jsx";

const Product = () => {
  const dispatch = useDispatch();
  const { allProduct } = useSelector((state) => state.productInfo);
  const { parentCategory } = useSelector((state) => state.categoryInfo);

  useEffect(() => {
    dispatch(fetchAllProductAction());
    dispatch(fetchParentCategoriesAction());
  }, [dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = allProduct.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOnAddProduct = () => {
    dispatch(
      setModalContent({ content: <ProductForm />, title: "Add Category" })
    );
    dispatch(setmodalShow(true));
  };

  const handleOnDeleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete the peoduct")) {
      const { status } = await deleteProductApi(id);
      //  console.log(res)
      if (status === "success") {
        dispatch(fetchAllProductAction());
      }
    }
  };

  const handleOnEditProduct = async (id) => {
    dispatch(
      setModalContent({content: <EditProductForm id={id}/>, title:"Edit Product"})
    );
    dispatch(setmodalShow(true));
    console.log(id);
  };

  return (
    <div>
      <div className="mt-5">
        <div className="p-4 d-flex justify-content-between align-items-center">
          <h3>Product</h3>

          <Button variant="dark" onClick={() => handleOnAddProduct()}>
            Add Product <FaCirclePlus />
          </Button>
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
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Sub Category</TableCell>
                  <TableCell align="right">Sizes Available</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((product, index) => (
                  <TableRow key={product._id}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="right">{product.title}</TableCell>

                    <TableCell align="right">
                      <img
                        src={product.imgUrl}
                        alt=""
                        className="rounded-circle"
                        width={"100px"}
                      />
                    </TableCell>
                    {/* <TableCell align="right">{product.description}</TableCell> */}
                    <TableCell align="right">
                      {product.parentCategory}
                    </TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right">
                      {product.size.join(", ")}
                    </TableCell>

                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.stock}</TableCell>
                    <TableCell align="right" style={{ cursor: "pointer" }}>
                      <div>
                        <FaEdit
                          style={{ color: "blue" }}
                          onClick={() => handleOnEditProduct(product._id)}
                          size={28}
                        />
                        <AiFillDelete
                          style={{ color: "red" }}
                          onClick={() => handleOnDeleteProduct(product._id)}
                          size={30}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={allProduct.length}
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
  );
};

export default Product;
