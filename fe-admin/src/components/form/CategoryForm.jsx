import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { categoryInput } from "../input/categoryInput.js";
import CustomInput from "../customInput/CustomInput";
import useForm from "../../hooks/useForm.js";
import { fetchAllCategoriesAction, fetchParentCategoriesAction, postCategoryAction } from "../../features/category/categoryAction.js";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  parentCategory: "",
  categoryName: "",
  image: null,
};


const CategoryForm = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);
  const {parentCategory} = useSelector((state)=> state.categoryInfo)
  const dispatch = useDispatch();
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData for multipart/form-data
    const formData = new FormData();
    if (form.parentCategory === "noParent") {
      formData.append("parentCategory", form.categoryName);
    } else {
      formData.append("subCategory", form.categoryName);
      formData.append("parentCategory", form.parentCategory);
      
    }
    if (form.image) formData.append("image", form.image);

    const response = await postCategoryAction(formData);

    if (response.status === "success") {
      setForm(initialState); // Reset form
      dispatch(fetchAllCategoriesAction())
      dispatch(fetchParentCategoriesAction())
    }
  };



  return (
    <Container>
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        {/* <h4 className="text-center mb-4">Add Category</h4> */}
        <Form onSubmit={handleOnSubmit}>
          <Form.Label>Parent Categories</Form.Label>
          <Form.Select
            name="parentCategory"
            onChange={handleOnChange}
            value={form.parentCategory || ""}
            required
          >
            <option value="">-- Select Parent Category --</option>
            {parentCategory.map((pcat, i) => (
              <option key={i} value={pcat.parentcategory}>
                {pcat.parentCategory}
              </option>
            ))}
            <option value="noParent">No Parent Categories</option>
          </Form.Select>

          {categoryInput.map((input, i) => (
            <div className="mb-3" key={i}>
              <CustomInput {...input} onChange={handleOnChange} />
            </div>
          ))}

          {/* Image input */}
          <Form.Group className="mb-3">
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleOnChange}
              accept="image/*"
            />
          </Form.Group>

          <div className="d-grid mt-3">
            <Button type="submit" variant="dark">
              Add Category
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CategoryForm;
