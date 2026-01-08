import CategorySchema from "./categorySchema.js";

export const createNewCategory = (catObj) => {
  return CategorySchema(catObj).save();
};

export const getAllCategory = () => {
  // all docs where subCategory is NOT null
  return CategorySchema.find({ subCategory: { $ne: null } });
};

export const getParentCategory = () => {
  return CategorySchema.find({ subCategory: null });
};

export const deleteSubCat = (id) => {
  return CategorySchema.findByIdAndDelete(id);
};
