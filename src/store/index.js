import ChatReducer from "./reducers/reducer";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({ type: action });
  }
  return next(action);
};
const store = configureStore({
  reducer: ChatReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
