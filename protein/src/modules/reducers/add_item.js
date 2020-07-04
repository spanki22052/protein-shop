const initialState = { counter: 0 };

export default function addItem(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      let whatToReturn = { ...state };

      whatToReturn[action.payload.title] = action.payload;
      whatToReturn.counter += 1;
      return whatToReturn;
    case "GET_PRODUCT":
      return state;
    default:
      return state;
  }
}
