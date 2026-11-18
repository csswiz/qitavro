import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Search, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function MobileBottomNav({ onOpenSearch }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  const navItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex flex-col items-center justify-center py-2 px-1 relative text-[10px] font-sans font-medium transition-all active:scale-90 ${
      isActive ? 'text-burgundy font-semibold' : 'text-charcoal/70 hover:text-burgundy'
    }`;
  };

  return (
    <nav 
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-stone/80 shadow-[0_-4px_20px_rgba(39,35,33,0.08)]"
      aria-label="Mobile Navigation Dock"
    >
      <div className="grid grid-cols-5 h-14 max-w-md mx-auto items-center px-1">
        {/* Home */}
        <NavLink to="/" className={() => navItemClass('/')}>
          <Home className="w-4 h-4 mb-0.5 stroke-[1.8]" />
          <span>Home</span>
        </NavLink>

        {/* Shop */}
        <NavLink to="/shop" className={() => navItemClass('/shop')}>
          <BookOpen className="w-4 h-4 mb-0.5 stroke-[1.8]" />
          <span>Shop</span>
        </NavLink>

        {/* Search trigger */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-2 px-1 relative text-[10px] font-sans font-medium text-charcoal/70 hover:text-burgundy transition-all active:scale-90"
          aria-label="Search bookstore"
        >
          <Search className="w-4 h-4 mb-0.5 text-burgundy stroke-[1.8]" />
          <span>Search</span>
        </button>

        {/* Saved Wishlist */}
        <NavLink to="/wishlist" className={() => navItemClass('/wishlist')}>
          <div className="relative">
            <Heart className="w-4 h-4 mb-0.5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-1 rounded-full bg-rose text-wine text-[9px] font-bold flex items-center justify-center border border-white">
                {wishlistCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </NavLink>

        {/* Shopping Bag */}
        <NavLink to="/cart" className={() => navItemClass('/cart')}>
          <div className="relative">
            <ShoppingBag className="w-4 h-4 mb-0.5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-1 rounded-full bg-burgundy text-ivory text-[9px] font-bold flex items-center justify-center border border-white shadow-sm">
                {cartCount}
              </span>
            )}
          </div>
          <span>Bag</span>
        </NavLink>
      </div>
    </nav>
  );
}
