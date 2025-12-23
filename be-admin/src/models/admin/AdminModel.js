import AdminSchema from "./AdminSchema.js";

export const createNewAdmin = (Adminobj) => {
  return AdminSchema(Adminobj).save();
};

export const updateAdmin = (filter, update) => {
  return AdminSchema.findOneAndUpdate(filter, update, { new: true });
};

export const getAdminByMail = (email) => {
  return AdminSchema.findOne({ email });
};

export const getOneAdmin = (filter) => {
  return AdminSchema.findOne(filter);
};

export const getAllAdmin = () => {
  return AdminSchema.find();
};
