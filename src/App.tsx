import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import store from './components/store';
import Home from './components/Home';
import Cart from './components/Cart';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <div style={{ padding: '16px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Advanced React E-Commerce Web App</h1>
                    <Home />
                    <Cart />
                </div>
            </QueryClientProvider>
        </Provider>
    );
};