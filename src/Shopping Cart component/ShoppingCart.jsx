import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, checkout } from "../Redux/CartSlice";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    dispatch(checkout());
    alert("Order placed successfully!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border p-4 rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 border p-1 text-center"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold mb-2">Cart Summary</h2>
            <p>Total Items: {cart.totalQuantity}</p>
            <p>Total Price: ${cart.totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 text-white p-3 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;