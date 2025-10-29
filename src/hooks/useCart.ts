import { useState, useEffect } from 'react';
import { CartItem, Animal } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (animal: Animal) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.animal.id === animal.id);
      let newCart;
      
      if (existingItem) {
        newCart = prev.map(item =>
          item.animal.id === animal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prev, { animal, quantity: 1 }];
      }
      
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (animalId: string) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.animal.id !== animalId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (animalId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(animalId);
      return;
    }

    setCartItems(prev => {
      const newCart = prev.map(item =>
        item.animal.id === animalId
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.animal.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
};