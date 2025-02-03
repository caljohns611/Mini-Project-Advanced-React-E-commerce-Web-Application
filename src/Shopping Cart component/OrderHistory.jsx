import React from 'react';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
    const orderHistory = useSelector((state) => state.cart.orderHistory);

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-6'>Order History</h1>
            {orderHistory.length === 0 ? (
                <p>No past orders found.</p>
            ) : (
                <ul className='space-y-4'>
                    {orderHistory.map((order) => (
                        <li key={order.id} className='border p-4 rounded'>
                            <h2 className='text-lg font-bold'>Order ID: {order.id}</h2>
                            <p className='text-gray-600'>Date: {order.date}</p>
                            <p className='text-gray-800 font-bold'>Total Price: ${order.totalPrice.toFixed(2)}</p>
                            <ul className='mt-2 space-y-2'>
                                {order.items.map((item) => (
                                    <li key={item.id} className='flex gap-4'>
                                        <img src={item.image} alt={item.title} className='w-12 h-12 object-contain' />
                                        <div>
                                            <p>{item.title}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;