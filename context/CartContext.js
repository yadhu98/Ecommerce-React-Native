import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function loadCart() {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart !== null) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadCart();
  }, []);

  useEffect(() => {
    async function saveCart() {
      try {
        const cartString = JSON.stringify(cart);
        await AsyncStorage.setItem('cart', cartString);
      } catch (error) {
        console.log(error);
      }
    }
    saveCart();
  }, [cart]);

  const addToCart = (product) => {
    const newCart = [...cart];
    let found = false;
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === product.id) {
        newCart[i].quantity = newCart[i].quantity + 1;
        found = true;
        break;
      }
    }
    if (!found) {
      const newProduct = { ...product, quantity: 1 };
      newCart.push(newProduct);
    }
    setCart(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (item.id === productId) {
        if (quantity > 0) {
          const updatedItem = { ...item, quantity: quantity };
          newCart.push(updatedItem);
        }
      } else {
        newCart.push(item);
      }
    }
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};