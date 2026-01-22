import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
