import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import patientReducer from "../slices/patientSlice";
export default combineReducers({
    authReducer: authReducer,
    patientReducer: patientReducer,
});
