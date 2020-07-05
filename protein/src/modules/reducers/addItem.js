const initialState = { counter: 0 };

export default function addItem(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      let whatToReturn = { ...state };

      whatToReturn[action.payload.title] = action.payload;
      whatToReturn.counter += 1;
      return whatToReturn;
    case "REMOVE_PRODUCT":
      let newReturnState = { ...state };
      delete newReturnState[action.payload];
      return newReturnState;
    case "MODIFY_COUNTER":
      let newObj = { ...state };
      newObj["counter"] = action.payload;
      return newObj;
    case "EMPTY_PRODUCTS":
      return { counter: 0 };
    default:
      return state;
  }
}
