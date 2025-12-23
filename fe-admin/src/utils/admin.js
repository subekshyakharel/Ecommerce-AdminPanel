// utils/admin.js
import { fetchAdminAction } from "../features/admin/adminAction";

export const autoLogin = async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT"); // you probably want sessionStorage here
  if (accessJWT) {
    await dispatch(fetchAdminAction()); // will set admin in Redux
  }
};
