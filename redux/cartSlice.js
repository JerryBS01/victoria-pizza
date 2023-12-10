import { createSlice } from "@reduxjs/toolkit";

// Check if the code is running on the server
const isServer = typeof window === "undefined";

const loadState = () => {
  try {
    if (!isServer && window.localStorage) {
      const serializedState = localStorage.getItem("cartState");
      return serializedState ? JSON.parse(serializedState) : undefined;
    }
  } catch (err) {
    console.error("Error loading state from local storage:", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    if (!isServer && window.localStorage) {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("cartState", serializedState);
    }
  } catch (err) {
    console.error("Error saving state to local storage:", err);
  }
};

const initialState = loadState() || {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
      saveState(state);
    },
    deleteProduct: (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload.id);

      if (index !== -1) {
        const deletedProduct = state.products.splice(index, 1)[0];
        state.quantity -= deletedProduct.quantity;
        state.total -= deletedProduct.price * deletedProduct.quantity;
        saveState(state);
      }
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      saveState(state);
    },
  },
});

export const { addProduct, deleteProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;