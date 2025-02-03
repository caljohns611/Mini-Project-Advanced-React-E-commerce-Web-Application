import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ShoppingCart from '../Shopping Cart component/ShoppingCart';
import { checkout } from '../Redux/CartSlice';

const mockStore = configureStore([]);

describe("ShoppingCart Intergration Test", () => {
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

    test("allows user to complete checkout", () => {
        render(
            <Provider store={store}>
                <ShoppingCart />
            </Provider>
        );

        const checkoutButton = screen.getByText("Checkout");
        fireEvent.click(checkoutButton);

        expect(store.dispatch).toHaveBeenCalledWith(checkout());
        expect(window.alert).toHaveBeenCalledWith("Order placed successfully");
    });
});