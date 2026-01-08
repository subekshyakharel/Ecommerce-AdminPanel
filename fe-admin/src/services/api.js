import axios from "axios";
import { toast } from "react-toastify";

const getAccessJWT = () => sessionStorage.getItem("accessJWT");
const getRefreshJWT = () => localStorage.getItem("refereshJWT");

export const apiProcessor = async ({
  method,
  url,
  payload,
  showToast,
  isPrivateCall,
  isRefreshJwt,
}) => {
  try {
    const headers = {};

    if (isPrivateCall) {
      const token = isRefreshJwt ? getRefreshJWT() : getAccessJWT();
      headers.Authorization = "Bearer " + token;
    }

    const isFormData = payload instanceof FormData;

    const responsePending = axios({
      method,
      url,
      // data: payload,
      headers: isFormData
        ? headers
        : { ...headers, "Content-Type": "application/json" },
      data: method === "delete" ? payload : payload,
    });

    if (showToast) {
      toast.promise(responsePending, {
        pending: "Please wait...",
      });
    }

    const { data } = await responsePending;
    if (showToast) toast[data.status]?.(data.message);
    return data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message;
    showToast && toast.error(msg);
    return { status: "error", message: msg };
  }
};
