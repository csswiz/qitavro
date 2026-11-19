import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Search, Heart, ShoppingBag } from 'lucide-react';
import Dock from './Dock';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function MobileBottomNav({ onOpenSearch }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeActive = location.pathname === '/';
  const isShopActive =
    location.pathname.startsWith('/shop') ||
    location.pathname.startsWith('/book') ||
    location.pathname === '/collections';
  const isWishlistActive = location.pathname === '/wishlist';
  const isCartActive = location.pathname === '/cart' || location.pathname === '/checkout';

  const items = [
    {
      icon: <Home className="w-5 h-5 text-rose-light group-hover:text-gold" strokeWidth={1.8} />,
      label: 'Home',
      active: isHomeActive,
      onClick: () => navigate('/'),
      menu: [
        { label: 'QITAVRO Sanctuary', onClick: () => navigate('/') },
        { separator: true },
        { label: 'About QITAVRO', onClick: () => navigate('/about') },
        { label: 'Disclaimer & Policies', onClick: () => navigate('/disclaimer') }
      ]
    },
    {
      icon: <BookOpen className="w-5 h-5 text-rose-light group-hover:text-gold" strokeWidth={1.8} />,
      label: 'Shop',
      active: isShopActive,
      onClick: () => navigate('/shop'),
      menu: [
        { label: 'Browse Catalogue', onClick: () => navigate('/shop') },
        { separator: true },
        { label: 'Saved Books', onClick: () => navigate('/wishlist') }
      ]
    },
    {
      icon: <Search className="w-5 h-5 text-rose-light group-hover:text-gold" strokeWidth={1.8} />,
      label: 'Search',
      onClick: onOpenSearch
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-light group-hover:text-gold" strokeWidth={1.8} />,
      label: 'Saved',
      active: isWishlistActive,
      badge: wishlistCount > 0 ? wishlistCount : undefined,
      onClick: () => navigate('/wishlist'),
      menu: [
        { label: 'View Saved Shelf', onClick: () => navigate('/wishlist') }
      ]
    },
    {
      icon: <ShoppingBag className="w-5 h-5 text-rose-light group-hover:text-gold" strokeWidth={1.8} />,
      label: 'Bag',
      active: isCartActive,
      badge: cartCount > 0 ? cartCount : undefined,
      onClick: () => navigate('/cart'),
      menu: [
        { label: 'View Shopping Bag', onClick: () => navigate('/cart') },
        { separator: true },
        { label: 'Proceed to Checkout', onClick: () => navigate('/checkout') }
      ]
    }
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 pointer-events-none pb-2 flex justify-center"
      aria-label="Mobile Navigation Dock"
    >
      <div className="relative w-full max-w-sm h-16 pointer-events-auto">
        <Dock
          items={items}
          theme="qitavro"
          baseItemSize={44}
          magnification={58}
          distance={120}
          panelHeight={56}
          gap={8}
          roundness={0.65}
          accentColor="#9B2C46"
          badgeColor="#833449"
          bounce={true}
          showLabels={true}
          showIndicators={true}
          showBadges={true}
        />
      </div>
    </nav>
  );
}
