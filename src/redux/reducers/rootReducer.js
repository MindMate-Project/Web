import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";

export default combineReducers({
    authReducer: authReducer,
});
