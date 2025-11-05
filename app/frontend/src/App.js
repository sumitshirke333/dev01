import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductStoryPage from './pages/ProductStoryPage';
import OurEthosPage from './pages/OurEthosPage';
import ConnectPage from './pages/ConnectPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

function App() {
  // Log environment variable to confirm .env is working
  console.log('✅ REACT_APP_API_URL =', process.env.REACT_APP_API_URL);

  // Check backend health status when app loads
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/health`);
        if (!response.ok) {
          throw new Error('Backend not responding');
        }
        const data = await response.json();
        console.log('✅ Backend health:', data);
      } catch (error) {
        console.error('❌ Backend connection failed:', error);
      }
    };

    checkBackendHealth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="products/:id" element={<ProductStoryPage />} />
        <Route path="our-ethos" element={<OurEthosPage />} />
        <Route path="connect" element={<ConnectPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-confirmation" element={<OrderConfirmationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
