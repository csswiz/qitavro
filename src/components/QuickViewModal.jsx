import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, ArrowRight, Check, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCoverImage from './BookCoverImage';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function QuickViewModal({ book, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setQuantity(1);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, book, onClose]);

  if (!isOpen || !book) return null;

  const isSaved = isInWishlist(book.id);
  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative bg-ivory rounded shadow-modal max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-stone p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-charcoal/60 hover:text-burgundy hover:bg-stone/30 rounded transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start pt-2 sm:pt-0">
          {/* Left: Book Cover */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[180px] sm:max-w-[260px]">
              <BookCoverImage
                src={book.image}
                alt={book.title}
                title={book.title}
                author={book.author}
                category={book.category}
                aspectRatio="aspect-[2/3]"
              />
              <div className="mt-2 text-center">
                <span className="text-[10px] sm:text-[11px] font-sans text-charcoal/60 uppercase tracking-widest">
                  {book.format || 'Hardcover Edition'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-semibold text-burgundy">
                {book.condition ? `${book.category} · ${book.condition}` : book.category}
              </span>
              {book.bestseller && (
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-gold/20 text-charcoal border border-gold/40">
                  Readers' Choice
                </span>
              )}
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-3xl text-charcoal leading-tight">
              {book.title}
            </h3>

            <p className="font-serif italic text-sm sm:text-base text-charcoal/80 mt-0.5 sm:mt-1">
              By {book.author}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2.5 sm:mt-3 pb-3 sm:pb-4 border-b border-stone">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      i < Math.floor(book.rating)
                        ? 'fill-gold'
                        : i < book.rating
                        ? 'fill-gold/50'
                        : 'text-stone'
                    }`}
                  />
                ))}
              </div>
              <span className="font-sans font-medium text-xs text-charcoal">
                {book.rating}
              </span>
              <span className="text-[11px] sm:text-xs text-charcoal/50">
                ({book.reviews?.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 sm:gap-3 my-3 sm:my-4">
              <span className="font-serif font-bold text-xl sm:text-2xl text-wine">
                ₹{book.price}
              </span>
              {book.originalPrice && (
                <>
                  <span className="text-xs sm:text-sm font-sans text-charcoal/50 line-through">
                    ₹{book.originalPrice}
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans text-burgundy bg-burgundy/10 px-1.5 sm:px-2 py-0.5 rounded font-medium">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Description excerpt */}
            <p className="text-xs sm:text-sm text-charcoal/80 font-sans leading-relaxed line-clamp-3">
              {book.description}
            </p>

            {book.curatorNote && (
              <div className="my-2.5 sm:my-3 p-2.5 sm:p-3 bg-stone/20 border-l-2 border-gold rounded-r text-xs font-serif italic text-charcoal/90">
                "{book.curatorNote}"
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-stone flex flex-col gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs font-sans uppercase tracking-wider text-charcoal/70">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone bg-white rounded">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-charcoal hover:bg-stone/30 transition-colors text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-sans text-xs font-medium text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(book.stock || 20, q + 1))}
                    className="px-3 py-1 text-charcoal hover:bg-stone/30 transition-colors text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-stone-dark font-sans">
                  ({book.stock || 15} available)
                </span>
              </div>

              <div className="flex gap-2 sm:gap-2.5 mt-1 sm:mt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-burgundy hover:bg-wine active:scale-98 text-ivory rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(book)}
                  className={`p-3 rounded border transition-colors active:scale-95 ${
                    isSaved
                      ? 'bg-rose/20 border-burgundy text-burgundy'
                      : 'border-stone hover:border-burgundy text-charcoal bg-white'
                  }`}
                  aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={isSaved ? 'Saved in Wishlist' : 'Save to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-burgundy' : ''}`} />
                </button>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <Link
                  to={`/book/${book.slug}`}
                  onClick={onClose}
                  className="text-burgundy hover:text-wine font-sans font-medium flex items-center gap-1 group text-[11px] sm:text-xs"
                >
                  Full Specifications & Reviews
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
