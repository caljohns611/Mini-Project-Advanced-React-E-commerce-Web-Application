import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ShoppingCart from '../Shopping Cart component/ShoppingCart';
import { addToCart, updateQuantity } from '../Redux/CartSlice';

const mockStore = configureStore([]);

describe("ShoppingCart Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: {
                items: [
                    { id: 1, title: "Test Product", price: 100, quantity: 1, image: "" },
                ],
                totalQuantity: 1,
                totalPrice: 100,
            },
        });
        store.dispatch = jest.fn();
    });

    TextDecoderStream("renders shopping cart with items", () => {
        render(
            <Provider store={store}>
                <ShoppingCart />
            </Provider>
        );

        expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("$100")).toBeInTheDocument();
    });

    test("updates quantity when changed", () => {
        render(
            <Provider store={store}>
                <ShoppingCart />
            </Provider>
        );

        const quantityInput = screen.getByDisplayValue("1");
        fireEvent.change(quantityInput, { target: { value: "2" } });

        expect(store.dispatch).toHaveBeenCalledWith(
            updateQuantity({ id: 1, quantity: 2 })
        );
    });
});