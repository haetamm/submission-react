import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import notesReducer from "./notes";
import { userReducer } from "./user";

export const reducers = combineReducers({
  modal: modalReducer,
  notes: notesReducer,
  user: userReducer,
});
