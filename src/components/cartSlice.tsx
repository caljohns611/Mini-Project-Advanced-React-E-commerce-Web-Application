import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    count: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        
        addToCart(state, action: PayloadAction<Omit<CartItem, 'count'>>) {
            const existing = state.items.find(item => item.id === action.payload.id);
            if(existing) {
                existing.count += 1;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            sessionStorage.setItem('cart', JSON.stringify(state.items));
        },
        
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
            sessionStorage.setItem('cart', JSON.stringify(state.items));
        },
        
        clearCart(state) {
            state.items = [];
            sessionStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;