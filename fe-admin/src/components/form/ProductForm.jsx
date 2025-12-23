import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { productInput } from "../input/productInput";
import useForm from "../../hooks/useForm.js";
import CustomInput from "../customInput/CustomInput";
import { fetchAllProductAction, postProductAction } from "../../features/product/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentCategoriesAction } from "../../features/category/categoryAction.js";

const initialState = {
  title: "",
  description: "",
  price: "",
  stock: "",
  brand: "",
  parentCategory: "", // ✅ added
  category: "",
  size: [], // keep size inside form only
};

const ProductForm = () => {
  const { form, handleOnChange, setForm } = useForm(initialState);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allCategory, parentCategory } = useSelector(
    (state) => state.categoryInfo
  );

  useEffect(() => {
    dispatch(fetchParentCategoriesAction());
  }, [dispatch]); // ✅ added dependency

  const handleOnImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.parentCategory) {
      return alert("Please select a parent category and category");
    }

    const formData = new FormData();

    for (const key in form) {
      if (form[key] !== undefined) {
        if (key === "size") {
          formData.append("size", JSON.stringify(form.size)); // ✅
        } else {
          formData.append(key, form[key]);
        }
      }
    }

    if (image) formData.append("imgUrl", image);

    // Debug log
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const {status} = await postProductAction(formData);
  if(status === "success") {
    dispatch(fetchAllProductAction());
  }
  };

  const handleOnCheck = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setForm((prev) => ({
        ...prev,
        size: [...prev.size, value],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        size: prev.size.filter((size) => size !== value),
      }));
    }
  };

  return (
    <div className="p-3">
      <h3>Insert new Product details</h3>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {/* Parent Category */}
        <Form.Label>Parent Category</Form.Label>
        <Form.Select
          name="parentCategory"
          onChange={handleOnChange}
          value={form.parentCategory}
          required
        >
          <option value="">-- Select Parent Category --</option>
          {parentCategory.map((cat) => (
            <option key={cat._id} value={cat.parentCategory}>
              {cat.parentCategory}
            </option>
          ))}
        </Form.Select>

        {/* Sub Category */}
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="category"
          onChange={handleOnChange}
          value={form.category}
          required
        >
          <option value="">-- Select Category --</option>
          {allCategory
            .filter((cat) => cat.parentCategory === form.parentCategory) // ✅ filter by parent
            .map((cat) => (
              <option key={cat._id} value={cat.subCategory}>
                {cat.subCategory}
              </option>
            ))}
        </Form.Select>

        {/* Other Inputs */}
        {productInput.map((input) => (
          <CustomInput onChange={handleOnChange} key={input.name} {...input} />
        ))}

        {/* Image */}
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={handleOnImageSelect}
            type="file"
            name="imgUrl"
            required
          />
        </Form.Group>

        {/* Size */}
        <Form.Group className="mb-3 d-flex flex-column">
          <Form.Label>Size Available</Form.Label>
          <div>
            {["XS", "S", "M", "L", "XL", "XXL"].map((label, i) => (
              <Form.Check
                key={i}
                inline
                label={label}
                name={label}
                onChange={handleOnCheck}
                value={label}
                type="checkbox"
                id={`inline-checkbox-${i + 1}`}
                checked={form.size.includes(label)} // ✅ keeps checkboxes in sync
              />
            ))}
          </div>
        </Form.Group>

        <div className="d-grid">
          <Button variant="dark" type="submit">
            Add Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
