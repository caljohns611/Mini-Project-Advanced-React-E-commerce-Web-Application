import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice';

const saveToSessionStorage = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    sessionStorage.setItem('cart', JSON.stringify(state.cart));

    return result;
};

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveToSessionStorage),
});

export default store;