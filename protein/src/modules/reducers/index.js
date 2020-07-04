import { combineReducers } from "redux";
import returnItems from "./return_items";
import addItem from "./add_item";

export default combineReducers({
  addItem,
  returnItems,
});
