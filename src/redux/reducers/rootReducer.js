import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import patientReducer from "../slices/patientSlice";
import reminderReducer from "../slices/reminderSlice";
import memoryReducer from "../slices/memorySlice";
export default combineReducers({
    authReducer: authReducer,
    patientReducer: patientReducer,
    reminderReducer: reminderReducer,
    memoryReducer: memoryReducer,
});
