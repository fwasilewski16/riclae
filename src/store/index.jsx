import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], shipping: 0, total: 0 },
  reducers: {
    addToCart(state, action) {
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, cartQty: 1 }],
      };
    },
    removeFromCart(state, action) {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id != action.payload),
      };
    },
    changeCartQty(state, action) {
      const indexOld = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );
      const newArray = state.cart.map((item, index) => {
        if (index === indexOld) {
          return {
            ...item,
            cartQty:
              action.payload.newQty > 0 ? Number(action.payload.newQty) : "",
          };
        }
        return item;
      });
      if (action.payload.newQty > state.cart[indexOld].cartQty) {
        return { ...state, cart: newArray };
      }
      if (action.payload.newQty < state.cart[indexOld].cartQty) {
        return { ...state, cart: newArray };
      }
    },
    changeShipping(state, action) {
      return { ...state, shipping: action.payload };
    },
    calculateTotal(state) {
      let total = 0;
      state.cart.forEach((item) => {
        total = total + item.price * item.cartQty;
      });
      return {
        ...state,
        total: state.cart.length === 0 ? 0 : total + state.shipping,
        shipping: state.cart.length === 0 ? 0 : state.shipping,
      };
    },
  },
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  cartSlice.reducer,
);

const store = configureStore({
  reducer: { cart: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export const cartActions = cartSlice.actions;
