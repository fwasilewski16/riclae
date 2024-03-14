import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], shipping: 0, total: 0 },
  reducers: {
    addToCart(state, action) {
      return {
        ...state,
        total: state.total + action.payload.price,
        cart: [...state.cart, { ...action.payload, cartQty: 1 }],
      };
    },
    removeFromCart(state, action) {
      const index = state.cart.findIndex((item) => action.payload === item.id);
      const price = state.cart[index].price;
      return {
        ...state,
        total: state.total - price,
        cart: state.cart.filter((item) => item.id != action.payload),
      };
    },
    changeCartQty(state, action) {
      const indexOld = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );
      const newArray = state.cart.map((item, index) => {
        if (index === indexOld) {
          return { ...item, cartQty: action.payload.newQty };
        }
        return item;
      });
      const price = state.cart[indexOld].price;
      if (action.payload.newQty > state.cart[indexOld].cartQty) {
        return { ...state, total: state.total + price, cart: newArray };
      }
      if (action.payload.newQty < state.cart[indexOld].cartQty) {
        return { ...state, total: state.total - price, cart: newArray };
      }
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const cartActions = cartSlice.actions;

export default store;
