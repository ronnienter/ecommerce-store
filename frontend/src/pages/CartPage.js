import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  // This would eventually come from localStorage or state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://via.placeholder.com/100',
      quantity: 1
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 699.99,
      image: 'https://via.placeholder.com/100',
      quantity: 1
    }
  ]);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-4">
            {cartItems.map(item => (
              <div 
                key={item.id} 
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="border rounded w-16 px-2 py-1 mr-4"
                  />
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <div>
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            </div>
            <div>
              <Link 
                to="/checkout"
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;