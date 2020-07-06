var initialState = [];

export default function returnItems(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      let newList = [...state];
      newList.splice(newList.indexOf(action.payload), 1);
      return newList;
    case "EMPTY_ITEMS":
      return action.payload;
    default:
      return state;
  }
}
