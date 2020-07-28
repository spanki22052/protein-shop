import { combineReducers } from "redux";
import returnItems from "./addListItem";
import addItem from "./addItem";
import shopStore from "./shopStore";

export default combineReducers({
  addItem,
  returnItems,
  shopStore,
});
