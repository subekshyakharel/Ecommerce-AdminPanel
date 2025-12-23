import { fetchNewAccessJWTApi } from "../../services/authapi.js";
import { fetchAdminApi, fetchAllAdminApi } from "./adminApi";
import { setAdmin, setAllAdmins } from "./adminSlice.js";

export const fetchAdminAction = () => async (dispatch) => {
  const { status, payload } = await fetchAdminApi();

  status === "success" && payload?._id && dispatch(setAdmin(payload));
};

export const fetchAllAdminAction = () => async (dispatch) => {
  const { status, payload } = await fetchAllAdminApi();

  if (status === "success" && Array.isArray(payload)) {
    dispatch(setAllAdmins(payload));
  }
};

export const autoLoginAdmin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    dispatch(fetchAdminAction());
  }

  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    const { payload } = await fetchNewAccessJWTApi();
    if (payload) {
      sessionStorage.setItem("accessJWT", payload);
      dispatch(fetchAdminAction());
    }
  }
};
