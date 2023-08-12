import { createSlice } from "@reduxjs/toolkit"; //'apiSlice' se usa para peticiones asincronas. 'createSlice'
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")) //primero revisa el localStorage para cargar mas rapido
  : { cartItems: [], shippingAddress: {}, paymentMethod: null }; //si no hay nada en el localStorage crea un array vacio
/* const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")) //primero revisa el localStorage para cargar mas rapido
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }; //si no hay nada en el localStorage crea un array vacio */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id); //Existe otro elemento con el mismo id en el carrito?

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        //si no, lo agrega
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload); //filtra todos los elementos que no coincida con el id que le pasas

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    }
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
