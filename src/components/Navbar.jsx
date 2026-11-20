import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchOverlay from './SearchOverlay';
import MobileBottomNav from './MobileBottomNav';

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative py-1 font-serif text-base tracking-wide transition-colors ${isActive
      ? 'text-rose-light font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-rose-light'
      : 'text-ivory/80 hover:text-rose-light'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-black-obsidian/95 backdrop-blur-md shadow-lg shadow-black/80 border-b border-black-border'
          : 'bg-black-obsidian border-b border-black-border'
          }`}
      >
        {/* Subtle Announcement / Curator Note Bar */}
        <div className="bg-[#200A11] border-b border-burgundy/30 text-ivory-light text-[10px] sm:text-[11px] font-sans py-1.5 px-3 text-center tracking-wider font-light flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span>QITAVRO Literary Sanctuary</span>
          <span className="text-gold">•</span>
          <span>Acquire Any Book via WhatsApp</span>
          <span className="text-gold">•</span>
          <Link to="/sell" className="hover:text-gold text-rose-light font-medium underline">
            List your book for sale (₹99) →
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Logo & Wordmark (Clean & minimal on mobile, no hamburger) */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
                {/* Official QITAVRO Logo */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[4px] p-0.5 bg-[#181015] border border-burgundy/40 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                  <img
                    src="/logo.svg"
                    alt="QITAVRO Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] sm:tracking-[0.18em] text-ivory-light uppercase leading-none group-hover:text-rose-light transition-colors">
                    QITAVRO
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] sm:tracking-[0.28em] font-sans text-burgundy-rose font-medium mt-1 leading-none">
                    Literary Bookstore
                  </span>
                </div>
              </Link>
            </div>

            {/* Centre: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/shop" className={navLinkClass}>
                Shop
              </NavLink>
              <NavLink to="/sell" className={navLinkClass}>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-burgundy/60 text-gold border border-gold/40 text-xs font-semibold shadow-xs">
                  Sell Book (₹99)
                </span>
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/disclaimer" className={navLinkClass}>
                Disclaimer
              </NavLink>
            </nav>

            {/* Right: Search, Wishlist, Cart (Desktop only, hidden on mobile since it is in the bottom dock) */}
            <div className="hidden lg:flex items-center space-x-2 sm:space-x-4">
              {/* Search trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-ivory/80 hover:text-rose-light rounded hover:bg-[#1E1117] transition-colors"
                aria-label="Open search catalogue"
                title="Search books, authors, genres"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-ivory/80 hover:text-rose-light rounded hover:bg-[#1E1117] transition-colors"
                aria-label="View Saved Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-burgundy text-ivory text-[10px] font-sans font-bold flex items-center justify-center border border-burgundy-rose/40">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag */}
              <Link
                to="/cart"
                className="relative p-2 text-ivory/80 hover:text-rose-light rounded hover:bg-[#1E1117] transition-colors"
                aria-label="View Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-burgundy text-ivory text-[10px] font-sans font-bold flex items-center justify-center border border-burgundy-rose/40 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Floating Bottom Dock Navigation */}
      <MobileBottomNav onOpenSearch={() => setIsSearchOpen(true)} />
    </>
  );
}
