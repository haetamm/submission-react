import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import notesReducer from "./notes";

export const reducers = combineReducers({
  modal: modalReducer,
  notes: notesReducer,
});
