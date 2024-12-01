import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./todo";

export default configureStore({
  reducer: {
    todo: todoListReducer,
  },
});
