import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, MessageSquare } from 'lucide-react';
import BookCoverImage from './BookCoverImage';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getWhatsAppBuyUrl } from '../utils/whatsapp';

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
      className="group relative flex flex-col bg-[#140D12] rounded-[4px] border border-burgundy/30 p-2.5 sm:p-3.5 transition-all duration-300 hover:border-burgundy/70 hover:shadow-[0_12px_30px_-8px_rgba(101,46,60,0.35)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Image Container */}
      <div className="relative w-full overflow-hidden bg-black-obsidian rounded-[2px]">
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
            <span className="bg-burgundy text-ivory-light text-[8px] sm:text-[9px] uppercase tracking-wider font-sans font-semibold px-1.5 sm:px-2 py-0.5 rounded shadow-sm border border-burgundy-rose/30">
              {book.badge}
            </span>
          ) : book.bestseller ? (
            <span className="bg-[#2A0E17] text-gold text-[8px] sm:text-[9px] uppercase tracking-wider font-sans font-medium px-1.5 sm:px-2 py-0.5 rounded shadow-sm border border-burgundy/40">
              Bestseller
            </span>
          ) : null}

          {discountPercent > 0 && (
            <span className="bg-[#1C0D15]/95 text-rose-light border border-burgundy/40 text-[8px] sm:text-[9px] font-sans font-semibold px-1 sm:px-1.5 py-0.5 rounded shadow-sm">
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
            ? 'bg-burgundy text-ivory-light border border-burgundy-rose/40 shadow-md'
            : 'bg-[#180E14]/85 hover:bg-[#251520] text-ivory/80 hover:text-rose-light border border-burgundy/30'
            }`}
          aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-light text-rose-light' : ''}`} />
        </button>

        {/* Desktop Quick View Overlay Button */}
        <div className="hidden sm:block absolute inset-x-2 bottom-2 z-20 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(book);
            }}
            className="w-full py-2 bg-[#1A0E15]/95 hover:bg-burgundy text-ivory-light text-[11px] font-sans uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 rounded backdrop-blur-sm transition-colors shadow border border-burgundy/40 active:scale-98"
          >
            <Eye className="w-3.5 h-3.5 text-gold" />
            Quick View
          </button>
        </div>
      </div>

      {/* Book Metadata */}
      <div className="flex flex-col flex-1 mt-2.5 sm:mt-3.5">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-widest text-burgundy-rose font-sans font-semibold">
          <span className="truncate max-w-[70%]">
            {book.condition ? `${book.category} · ${book.condition}` : book.category}
          </span>
          <div className="flex items-center text-gold flex-shrink-0">
            <Star className="w-3 h-3 fill-gold mr-0.5" />
            <span className="text-ivory-light font-medium text-[10px] sm:text-xs">{book.rating}</span>
          </div>
        </div>

        <Link to={`/book/${book.slug}`} className="mt-1 group/title">
          <h3 className="font-serif font-semibold text-ivory-light text-xs sm:text-base leading-snug line-clamp-2 min-h-[2.4em] group-hover/title:text-rose-light transition-colors">
            {book.title}
          </h3>
        </Link>

        <p className="font-serif italic text-[11px] sm:text-xs text-ivory/70 mt-0.5 truncate">
          {book.author}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-burgundy/25 flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
            <span className="font-serif font-bold text-gold text-xs sm:text-base">
              ₹{book.price}
            </span>
            {book.originalPrice && (
              <span className="font-sans text-[10px] sm:text-xs text-ivory/40 line-through">
                ₹{book.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Direct Buy via WhatsApp button */}
            <a
              href={getWhatsAppBuyUrl(book)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 rounded text-[11px] sm:text-xs font-sans font-semibold flex items-center gap-1 transition-all active:scale-95"
              title="Buy directly via WhatsApp"
            >
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Mobile quick view */}
            <button
              onClick={() => onQuickView?.(book)}
              className="sm:hidden p-1.5 text-ivory/70 hover:text-rose-light border border-burgundy/30 rounded bg-[#180E14] hover:bg-[#251520] active:bg-burgundy/20"
              aria-label="Quick View"
            >
              <Eye className="w-3 h-3 text-gold" />
            </button>

            {/* Direct Add to Cart Button */}
            <button
              onClick={() => addToCart(book, 1)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-burgundy hover:bg-burgundy-light active:scale-95 text-ivory-light rounded text-xs font-sans font-medium flex items-center gap-1 transition-colors shadow-subtle border border-burgundy-rose/30"
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
