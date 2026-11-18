import React, { createContext, useContext, useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CartContext = createContext();

const VALID_COUPONS = {
  'READ10': { type: 'percent', value: 10, description: '10% off your entire order' },
  'QITAVRO': { type: 'flat', value: 150, minOrder: 500, description: '₹150 off orders above ₹500' },
  'LITERARY': { type: 'percent', value: 15, description: '15% literary collector discount' },
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('qitavro_cart', []);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { addToast } = useToast();

  const addToCart = (book, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity) || 1);
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === book.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + qty;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [...prev, { ...book, quantity: qty }];
      }
    });

    addToast(`"${book.title}" added to your bag (${qty} ${qty === 1 ? 'copy' : 'copies'}).`, 'success', 'Bag Updated');
  };

  const removeFromCart = (bookId) => {
    const item = cart.find((i) => i.id === bookId);
    setCart((prev) => prev.filter((i) => i.id !== bookId));
    if (item) {
      addToast(`"${item.title}" removed from your bag.`, 'info');
    }
  };

  const updateQuantity = (bookId, quantity) => {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === bookId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  }, [cart]);

  const shippingFee = useMemo(() => {
    if (cart.length === 0) return 0;
    // Digital eBooks require no physical courier dispatch
    const isAllEbooks = cart.every(
      (item) => item.isEbook || item.format?.toLowerCase().includes('ebook') || item.condition?.toLowerCase() === 'ebook'
    );
    if (isAllEbooks) return 0;
    return subtotal >= 499 ? 0 : 49;
  }, [subtotal, cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || cart.length === 0) return 0;
    if (appliedCoupon.type === 'percent') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.type === 'flat') {
      return Math.min(subtotal, appliedCoupon.value);
    }
    return 0;
  }, [appliedCoupon, subtotal, cart.length]);

  const total = useMemo(() => {
    if (cart.length === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shippingFee);
  }, [subtotal, discountAmount, shippingFee, cart.length]);

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      addToast('Please enter a coupon code.', 'error');
      return { success: false, message: 'Please enter a coupon code' };
    }

    const coupon = VALID_COUPONS[cleanCode];
    if (!coupon) {
      addToast('Invalid coupon code. Try "READ10" or "QITAVRO".', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      addToast(`This code requires a minimum order of ₹${coupon.minOrder}.`, 'error');
      return { success: false, message: `Minimum order of ₹${coupon.minOrder} required` };
    }

    setAppliedCoupon({ code: cleanCode, ...coupon });
    addToast(`Coupon "${cleanCode}" applied! ${coupon.description}`, 'success', 'Coupon Applied');
    return { success: true };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        discountAmount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponCode,
        setCouponCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
