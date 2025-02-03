import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductCatalog from './Product components/ProductCatalog';
import ShoppingCart from './Shopping Cart component/ShoppingCart';
import OrderHistory from './Shopping Cart component/OrderHistory';

const App = () => {
  return (
    <Router>
      <nav className='p-4 bg-blue-500 text-white flex justify-between'>
        <Link to='/' className='text-lg font-bold'>Product Catalog</Link>
        <Link to='/cart' className='text-lg font-bold'>Shopping Cart</Link>
        <Link to='/history' className='text-lg font-bold'>Order History</Link>
      </nav>
      <div className='p-4'>
        <Routes>
          <Route path='/' element={<ProductCatalog />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path='/history' element={<OrderHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;