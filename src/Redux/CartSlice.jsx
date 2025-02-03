import { createSlice } from "@reduxjs/toolkit";

const loadCartFromSession = () => {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [], totalQuantity: 0, totalPrice: 0 };
};

const loadOrderHistory = () => {
  const history = sessionStorage.getItem("orderHistory");
  return history ? JSON.parse(history) : [];
};

const initialState = {
  ...loadCartFromSession(),
  orderHistory: loadOrderHistory(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
    checkout(state) {
      if (state.items.length > 0) {
        const newOrder = {
          id: new Date().getTime(),
          date: new Date().toLocaleString(),
          items: [...state.items],
          totalPrice: state.totalPrice,
        };
        const updatedHistory = [newOrder, ...state.orderHistory];
        state.orderHistory = updatedHistory;
        sessionStorage.setItem("orderHistory", JSON.stringify(updatedHistory));
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, checkout } =
  cartSlice.actions;
export default cartSlice.reducer;