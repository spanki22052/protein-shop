const initialState = [];

export default function returnItems(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.payload];
    default:
      return state;
  }
}
