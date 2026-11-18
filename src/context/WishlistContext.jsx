import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useLocalStorage('qitavro_wishlist', []);
  const { addToast } = useToast();

  const isInWishlist = (bookId) => {
    return wishlist.some((item) => item.id === bookId);
  };

  const addToWishlist = (book) => {
    if (!isInWishlist(book.id)) {
      setWishlist((prev) => [...prev, book]);
      addToast(`"${book.title}" added to your saved shelf.`, 'success', 'Saved to Wishlist');
    }
  };

  const removeFromWishlist = (bookId) => {
    const item = wishlist.find((b) => b.id === bookId);
    setWishlist((prev) => prev.filter((b) => b.id !== bookId));
    if (item) {
      addToast(`"${item.title}" removed from your saved shelf.`, 'info');
    }
  };

  const toggleWishlist = (book) => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    addToast('Your wishlist has been cleared.', 'info');
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
