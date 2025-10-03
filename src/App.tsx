import React, { useState } from 'react';
import { Layout } from './components/common/Layout';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Cart } from './pages/Cart';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { animals } from './data/animals';

type Page = 'home' | 'login' | 'register' | 'animals' | 'cart';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const auth = useAuth();
  const cart = useCart();

  const handleNavigation = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleSearch = (query: string) => {
    // If user searches from header, navigate to animals page
    if (currentPage !== 'animals' && currentPage !== 'cart') {
      setCurrentPage('animals');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <Login
            onLogin={auth.login}
            onNavigate={handleNavigation}
          />
        );
      case 'register':
        return (
          <Register
            onRegister={auth.register}
            onNavigate={handleNavigation}
          />
        );
      case 'animals':
      case 'cart':
        return (
          <Cart
            animals={animals}
            cartItems={cart.cartItems}
            onAddToCart={cart.addToCart}
            onRemoveFromCart={cart.removeFromCart}
            onUpdateQuantity={cart.updateQuantity}
            onClearCart={cart.clearCart}
          />
        );
      case 'home':
      default:
        return (
          <Homepage
            onNavigate={handleNavigation}
            featuredAnimals={animals}
            onAddToCart={cart.addToCart}
          />
        );
    }
  };

  // Don't show layout for login/register pages
  if (currentPage === 'login' || currentPage === 'register') {
    return renderCurrentPage();
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigation}
      cartItemsCount={cart.getTotalItems()}
      isAuthenticated={auth.isAuthenticated}
      onLogout={auth.logout}
      onSearch={handleSearch}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;