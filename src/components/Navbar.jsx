import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchOverlay from './SearchOverlay';
import MobileBottomNav from './MobileBottomNav';
import collectionsData from '../data/collections.json';

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
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
    `relative py-1 font-serif text-base tracking-wide transition-colors ${
      isActive
        ? 'text-burgundy font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-burgundy'
        : 'text-charcoal/85 hover:text-burgundy'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-stone'
            : 'bg-ivory border-b border-stone/60'
        }`}
      >
        {/* Subtle Announcement / Curator Note Bar */}
        <div className="bg-wine text-ivory text-[10px] sm:text-[11px] font-sans py-1.5 px-3 text-center tracking-wider font-light flex items-center justify-center gap-2 sm:gap-3">
          <span>Complimentary delivery across India on orders above ₹499</span>
          <span className="hidden sm:inline text-gold">•</span>
          <span className="hidden md:inline text-stone-light">Use code <strong className="text-gold font-medium">READ10</strong> for 10% off</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Logo & Wordmark (Clean & minimal on mobile, no hamburger) */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
                {/* Official QITAVRO Logo */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[4px] p-0.5 bg-white/80 border border-gold/40 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                  <img
                    src="/logo.svg"
                    alt="QITAVRO Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] sm:tracking-[0.18em] text-charcoal uppercase leading-none group-hover:text-burgundy transition-colors">
                    QITAVRO
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] sm:tracking-[0.28em] font-sans text-burgundy font-medium mt-1 leading-none">
                    Literary Bookstore
                  </span>
                </div>
              </Link>
            </div>

            {/* Centre: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/shop" className={navLinkClass}>
                Shop
              </NavLink>

              {/* Collections with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCollectionsHovered(true)}
                onMouseLeave={() => setIsCollectionsHovered(false)}
              >
                <NavLink
                  to="/collections"
                  className={({ isActive }) =>
                    `flex items-center gap-1 font-serif text-base tracking-wide transition-colors ${
                      isActive
                        ? 'text-burgundy font-semibold'
                        : 'text-charcoal/85 hover:text-burgundy'
                    }`
                  }
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isCollectionsHovered ? 'rotate-180 text-burgundy' : 'text-charcoal/50'
                    }`}
                  />
                </NavLink>

                {/* Dropdown Menu */}
                {isCollectionsHovered && (
                  <div className="absolute top-full -left-6 w-72 bg-white rounded-[2px] shadow-modal border border-stone/80 p-2.5 pt-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-2 pb-2 mb-2 border-b border-stone/40 text-[10px] uppercase tracking-widest font-sans font-semibold text-burgundy">
                      Curated Shelves
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {collectionsData.map((col) => (
                        <Link
                          key={col.id}
                          to={`/shop?collection=${col.slug}`}
                          className="px-2.5 py-1.5 rounded hover:bg-ivory text-left text-xs font-serif text-charcoal hover:text-burgundy transition-colors flex items-center justify-between group"
                        >
                          <span className="font-medium">{col.title}</span>
                          <span className="text-[10px] text-charcoal/40 font-sans group-hover:text-burgundy">
                            {col.bookIds.length} books
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-stone/40 px-2">
                      <Link
                        to="/collections"
                        className="text-[11px] font-sans text-burgundy hover:text-wine font-semibold uppercase tracking-wider block text-center"
                      >
                        View All Collections →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/reading-room" className={navLinkClass}>
                The Reading Room
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </nav>

            {/* Right: Search, Wishlist, Cart */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal/80 hover:text-burgundy rounded hover:bg-stone/30 transition-colors"
                aria-label="Open search catalogue"
                title="Search books, authors, genres"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-charcoal/80 hover:text-burgundy rounded hover:bg-stone/30 transition-colors"
                aria-label="View Saved Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose text-wine text-[10px] font-sans font-bold flex items-center justify-center border border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag */}
              <Link
                to="/cart"
                className="relative p-2 text-charcoal/80 hover:text-burgundy rounded hover:bg-stone/30 transition-colors"
                aria-label="View Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-burgundy text-ivory text-[10px] font-sans font-bold flex items-center justify-center border border-white shadow-sm">
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
