import { combineReducers } from "redux";
import returnItems from "./addListItem";
import addItem from "./addItem";

export default combineReducers({
  addItem,
  returnItems,
});
