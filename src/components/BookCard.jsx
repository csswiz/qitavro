import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import BookCoverImage from './BookCoverImage';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function BookCard({ book, onQuickView }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = isInWishlist(book.id);
  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-[3px] border border-stone/60 p-2.5 sm:p-3.5 transition-all duration-300 hover:border-burgundy/40 hover:shadow-book"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image Container */}
      <div className="relative w-full overflow-hidden bg-ivory-light rounded-[2px]">
        <Link to={`/book/${book.slug}`} className="block">
          <BookCoverImage
            src={book.image}
            alt={book.title}
            title={book.title}
            author={book.author}
            category={book.category}
            aspectRatio="aspect-[2/3]"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-20 pointer-events-none">
          {book.badge ? (
            <span className="bg-burgundy text-ivory text-[8px] sm:text-[9px] uppercase tracking-wider font-sans font-semibold px-1.5 sm:px-2 py-0.5 rounded shadow-sm">
              {book.badge}
            </span>
          ) : book.bestseller ? (
            <span className="bg-wine text-ivory text-[8px] sm:text-[9px] uppercase tracking-wider font-sans font-medium px-1.5 sm:px-2 py-0.5 rounded shadow-sm">
              Bestseller
            </span>
          ) : null}

          {discountPercent > 0 && (
            <span className="bg-white/95 text-burgundy border border-burgundy/20 text-[8px] sm:text-[9px] font-sans font-semibold px-1 sm:px-1.5 py-0.5 rounded shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Always accessible top right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(book);
          }}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 ${isSaved
            ? 'bg-white text-burgundy shadow'
            : 'bg-white/80 hover:bg-white text-charcoal/70 hover:text-burgundy'
            }`}
          aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-burgundy text-burgundy' : ''}`} />
        </button>

        {/* Desktop Quick View Overlay Button */}
        <div className="hidden sm:block absolute inset-x-2 bottom-2 z-20 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(book);
            }}
            className="w-full py-2 bg-charcoal/90 hover:bg-burgundy text-ivory text-[11px] font-sans uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 rounded backdrop-blur-sm transition-colors shadow active:scale-98"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Book Metadata */}
      <div className="flex flex-col flex-1 mt-2.5 sm:mt-3.5">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-widest text-burgundy font-sans font-semibold">
          <span className="truncate max-w-[70%]">
            {book.condition ? `${book.category} · ${book.condition}` : book.category}
          </span>
          <div className="flex items-center text-gold flex-shrink-0">
            <Star className="w-3 h-3 fill-gold mr-0.5" />
            <span className="text-charcoal font-medium text-[10px] sm:text-xs">{book.rating}</span>
          </div>
        </div>

        <Link to={`/book/${book.slug}`} className="mt-1 group/title">
          <h3 className="font-serif font-semibold text-charcoal text-xs sm:text-base leading-snug line-clamp-2 min-h-[2.4em] group-hover/title:text-burgundy transition-colors">
            {book.title}
          </h3>
        </Link>

        <p className="font-serif italic text-[11px] sm:text-xs text-charcoal/70 mt-0.5 truncate">
          {book.author}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-stone/40 flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
            <span className="font-serif font-bold text-wine text-xs sm:text-base">
              ₹{book.price}
            </span>
            {book.originalPrice && (
              <span className="font-sans text-[10px] sm:text-xs text-charcoal/40 line-through">
                ₹{book.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Mobile quick view */}
            <button
              onClick={() => onQuickView?.(book)}
              className="sm:hidden p-1.5 text-charcoal/70 hover:text-burgundy border border-stone rounded hover:bg-stone/20 active:bg-stone/40"
              aria-label="Quick View"
            >
              <Eye className="w-3 h-3" />
            </button>

            {/* Direct Add to Cart Button */}
            <button
              onClick={() => addToCart(book, 1)}
              className="p-1.5 sm:px-3 sm:py-1.5 bg-burgundy hover:bg-wine active:scale-95 text-ivory rounded text-xs font-sans font-medium flex items-center gap-1 transition-colors shadow-subtle"
              aria-label="Add to Bag"
              title="Add to Shopping Bag"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
