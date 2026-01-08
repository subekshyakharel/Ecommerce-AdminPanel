import { useEffect, useState } from "react";
import React from "react";
import CategoryForm from "../components/form/CategoryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategoriesAction,
  fetchParentCategoriesAction,
} from "../features/category/categoryAction.js";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { Button } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import TablePagination from "@mui/material/TablePagination";
import { AiFillDelete } from "react-icons/ai";
import {
  setModalContent,
  setmodalShow,
} from "../features/system/systemSlice.js";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { deleteSubCatApi } from "../features/category/categoryApi.js";
import { setAllCategory } from "../features/category/categorySlice.js";

const Categories = () => {
  const { allCategory } = useSelector((state) => state.categoryInfo);
  const { parentCategory } = useSelector((state) => state.categoryInfo);
  const [openRow, setOpenRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
    dispatch(fetchParentCategoriesAction());
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnAddCategory = () => {
    dispatch(
      setModalContent({ content: <CategoryForm />, title: "Add Category" })
    );
    dispatch(setmodalShow(true));
  };

  const visibleRows = parentCategory.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

const handleOnDeleteSub = async (subCat) => {
  if (window.confirm("Are you sure you want to delete sub category?")) {
    const { status } = await deleteSubCatApi(subCat._id);
    if (status === "success") {
      dispatch(setAllCategory(
        allCategory.filter(cat => cat._id !== subCat._id)
      ));
    }
  }
};



  return (
    <>
      <div className="mt-5">
        <div className="p-4 d-flex justify-content-between align-items-center">
          <h3>Category</h3>

          <Button variant="dark" onClick={() => handleOnAddCategory()}>
            Add Category <FaCirclePlus />
          </Button>
        </div>

        <hr />
        <div
          style={{
            width: "85vw",
            padding: 20,
            boxSizing: "border-box",
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
                  <TableCell>Parent Category</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((parent, index) => (
                  <React.Fragment key={parent}>
                    {/* Parent Category Row */}
                    <TableRow>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{parent.parentCategory}</TableCell>
                      <TableCell align="center">
                        <img src={parent.image} alt="" width={"100"} />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          style={{ background: "skyblue" }}
                          onClick={() =>
                            setOpenRow(openRow === parent ? null : parent)
                          }
                        >
                          View SubCat
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Accordion Row */}
                    {openRow === parent && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Accordion defaultActiveKey="">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Sub Categories
                              </Accordion.Header>
                              <Accordion.Body>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>S/N</TableCell>
                                      <TableCell>Sub Category</TableCell>
                                      <TableCell>Image</TableCell>
                                      <TableCell>Action</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {allCategory
                                      .filter(
                                        (subCat) =>
                                          subCat.parentCategory ===
                                          parent.parentCategory
                                      ) //  filter correctly
                                      .map((subCat, idx) => (
                                        <TableRow key={subCat._id}>
                                          <TableCell>{idx + 1}</TableCell>
                                          <TableCell>
                                            {subCat.subCategory}
                                          </TableCell>
                                          <TableCell>
                                            <img
                                              src={subCat.image}
                                              alt=""
                                              width="50"
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <AiFillDelete
                                            onClick={()=>handleOnDeleteSub(subCat)}
                                              size={20}
                                              style={{
                                                color: "red",
                                                cursor: "pointer",
                                              }}
                                            />
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={allCategory.length}
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

export default Categories;
