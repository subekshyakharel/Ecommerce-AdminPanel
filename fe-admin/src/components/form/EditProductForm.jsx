import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm.js";
import CustomInput from "../customInput/CustomInput";
import {
  fetchAllProductAction,
  fetchSingleProductAction,
  updateProductAction,
} from "../../features/product/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentCategoriesAction } from "../../features/category/categoryAction.js";
import { productInput } from "../input/productInput.js";

const EditProductForm = ({ id }) => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productInfo);
  const { allCategory, parentCategory } = useSelector(
    (state) => state.categoryInfo
  );

  const { form, handleOnChange, setForm } = useForm({});
  const [image, setImage] = useState(null);

  // 1. Fetch product + categories
  useEffect(() => {
    if (id) {
      dispatch(fetchParentCategoriesAction());
      dispatch(fetchSingleProductAction(id));
    }
  }, [dispatch, id]);

  // 2. When product is fetched → populate form
  useEffect(() => {
    if (product?._id) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        brand: product.brand || "",
        parentCategory: product.parentCategory || "",
        category: product.category || "",
        size: product.size || [],
      });
    }
  }, [product, setForm]);

  // Image selection
  const handleOnImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  // Form submit (UPDATE)
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.parentCategory) {
      return alert("Please select category & parent category");
    }

    const formData = new FormData();

    // Add fields
  for (const key in form) {
  if (key === "size") {
    formData.append("size", JSON.stringify(form.size));
  } else {
    formData.append(key, form[key]);
  }
}

    // Only append image if user selected one
    if (image) {
      formData.append("imgUrl", image);
    }

    // UPDATE PRODUCT CALL
    const { status } = await dispatch(updateProductAction(id, formData));

    if (status === "success") {
      dispatch(fetchAllProductAction());
    }
  };

  const handleOnCheck = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setForm((prev) => ({ ...prev, size: [...prev.size, value] }));
    } else {
      setForm((prev) => ({
        ...prev,
        size: prev.size.filter((item) => item !== value),
      }));
    }
  };

  return (
    <div className="p-3">
      {/* <h3>Edit Product</h3>
      <hr /> */}
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
            .filter((cat) => cat.parentCategory === form.parentCategory)
            .map((cat) => (
              <option key={cat._id} value={cat.subCategory}>
                {cat.subCategory}
              </option>
            ))}
        </Form.Select>

        {/* Text Inputs */}
        {productInput.map((input) => (
          <CustomInput
            key={input.name}
            name={input.name}
            label={input.label}
            value={form[input.name]}
            onChange={handleOnChange}
          />
        ))}

        {/* Image */}
        <Form.Group className="mb-3">
          <Form.Label>Replace Image (Optional)</Form.Label>
          <Form.Control onChange={handleOnImageSelect} type="file" />
        </Form.Group>

        {/* Size */}
        <Form.Label>Size Available</Form.Label>
        <div>
          {["XS", "S", "M", "L", "XL", "XXL"].map((label, i) => (
            <Form.Check
              key={i}
              inline
              label={label}
              value={label}
              type="checkbox"
              onChange={handleOnCheck}
              checked={form.size?.includes(label)}
            />
          ))}
        </div>

        <div className="d-grid mt-3">
          <Button variant="dark" type="submit">
            Update Product
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProductForm;
