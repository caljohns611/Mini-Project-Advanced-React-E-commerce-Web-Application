import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OrderHistory from '../Shopping Cart component/OrderHistory';

const mockStore = configureStore([]);

describe("OrderHistory Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: {
                OrderHistory: [
                    {
                        id: 123,
                        date: "2024-01-28",
                        items: [{ id: 1, title: "Test Product", quantity: 2 }],
                        totalPrice: 200,
                    },
                ],
            },
        });
    });

    test("renders order history", () => {
        render(
            <Provider store={store}>
                <OrderHistory />
            </Provider>
        );

        expect(screen.getByText("Order ID: 123")).toBeInTheDocument();
        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("Total Price: $200.00")).toBeInTheDocument();
    });

    test("shows message if no orders exist", () => {
        store = mockStore({ cart: { OrderHistory: [] } });

        render(
            <Provider store={store}>
                <OrderHistory />
            </Provider>
        );

        expect(screen.getByText("No past orders found.")).toBeInTheDocument();
    });
});