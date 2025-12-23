import ProductSchema from "./productSchema.js";

export const createNewProduct = (productObj) => {
  return ProductSchema(productObj).save();
};

export const getAllProduct = () => {
  return ProductSchema.find();
};

export const getAProduct = (filter) => {
  return ProductSchema.findOne(filter);
};

export const deleteProduct = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};

export const updateProduct = (_id, rest) => {
  return ProductSchema.findByIdAndUpdate(_id, rest, { new: true });
};
