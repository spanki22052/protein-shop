var initialState = {
  categories: [],
  products: {},
};

export default function shopStore(state = initialState, action) {
  switch (action.type) {
    case "ADD_CATEGORIES":
      let categoriesState = { ...state };
      categoriesState.categories = action.payload;
      return categoriesState;
    case "ADD_PRODUCTS":
      let productsState = { ...state };
      productsState.products = action.payload;
      return productsState;
    default:
      return state;
  }
}
