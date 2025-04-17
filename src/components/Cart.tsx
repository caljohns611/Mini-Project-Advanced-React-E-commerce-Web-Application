import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { removeFromCart, clearCart } from './cartSlice';

export default function Cart(): JSX.Element {
    const cart = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();

    const totalPrice = cart.reduceRight((sum, item) => sum + item.price * item.count, 0);

    return (
        <div style={{ marginTop: '32px', borderTop: '1px solid #ddd', paddingTop: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Shopping Cart</h2>

            {cart.length === 0 ? <p>Your cart is empty</p> : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                <img src={item.image} alt={item.title} style={{ height: '50px', marginRight: '16px' }} />
                                <div style={{ flex: 1 }}>
                                    <p>{item.title}</p>
                                    <p>${item.price} x {item.count}</p>
                                </div>
                                <button onClick={() => dispatch(removeFromCart(item.id))} style={{ backgroundColor: 'red', color: 'white', padding: '4px 8px' }}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <p>Total Items: {cart.reduce((sum, item) => sum + item.count, 0)}</p>
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>

                    <button onClick={() => {
                        dispatch(clearCart());
                        alert('Checkout successful');
                    }} style={{ marginTop: '16px', backgroundColor: 'green', color: 'white', padding: '8px 16px' }}>Checkout</button>
                </>
            )}
        </div>
    );
}