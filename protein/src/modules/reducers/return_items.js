const initialState = {};

export default function returnItems(state = initialState, action) {
  switch (action.type) {
    case "SHOW_PRODUCTS":
      return state;
    default:
      return state;
  }
}
