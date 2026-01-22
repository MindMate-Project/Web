import {
  CREATE_NEW_USER,
  LOGIN_USER,
  GET_CURRENT_USER,
  FOREGT_PASSWORD,
  VERIFY_PASSWORD,
} from "../type";

import { useInsertData } from "../../hooks/useInsertData";
import { useGetDataToken } from "../../hooks/useGetData";

export const createNewUser = (formData) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/auth/register", formData);
    console.log("API Response:", response);
    dispatch({
      type: CREATE_NEW_USER,
      payload: response,
      loading: true,
    });
  } catch (err) {
    dispatch({
      type: CREATE_NEW_USER,
      payload: err?.response || { message: err?.message || "Network Error" },
    });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/auth/login", formData);
    dispatch({
      type: LOGIN_USER,
      payload: response,
      loading: true,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_USER,
      payload: err?.response || { message: err?.message || "Network Error" },
    });
  }
};

// get current user details
export const getLoggedUser = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/users/getMe`);
    dispatch({
      type: GET_CURRENT_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_CURRENT_USER,
      payload: e?.response || { message: e?.message || "Network Error" },
    });
  }
};

//1-foregt  passwrod
export const forgetPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/auth/forgotPasswords`, data);
    dispatch({
      type: FOREGT_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: FOREGT_PASSWORD,
      payload: e?.response || { message: e?.message || "Network Error" },
    });
  }
};

//2-verify  passwrod
export const verifyPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/auth/verifyResetCode`, data);
    dispatch({
      type: VERIFY_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: VERIFY_PASSWORD,
      payload: e?.response || { message: e?.message || "Network Error" },
    });
  }
};

//2-reset  passwrod
// export const resetPassword = (data) => async (dispatch) => {
//     try {
//         const response = await useInsUpdateData(`/api/v1/auth/resetPassword`, data);
//         dispatch({
//             type: RESET_PASSWORD,
//             payload: response,
//             loading: true
//         })

//     } catch (e) {
//         dispatch({
//             type: RESET_PASSWORD,
//             payload: e.response,
//         })
//     }
// }
