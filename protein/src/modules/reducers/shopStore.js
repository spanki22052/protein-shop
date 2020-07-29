var initialState = {
  categories: [],
  products: [],
};

export default function shopStore(state = initialState, action) {
  switch (action.type) {
    case "ADD_CATEGORIES":
      let categoriesState = { ...state };
      categoriesState.categories = action.payload;
      return categoriesState;
    case "ADD_PRODUCTS":
      let productsState = { ...state };
      let allProducts = [];
      productsState.products = action.payload;
      for (let key in action.payload) {
        for (let element in action.payload[key]) {
          allProducts.push(action.payload[key][element]);
        }
      }
      productsState.products = allProducts;
      return productsState;
    default:
      return state;
  }
}
