import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, ArrowRight, ArrowLeft, Check, BookOpen, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCoverImage from './BookCoverImage';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getWhatsAppBuyUrl } from '../utils/whatsapp';

export default function QuickViewModal({ book, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(book?.image);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setSelectedImage(book?.image);
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
  const isEbook = Boolean(book.isEbook || book.format?.toLowerCase().includes('ebook'));
  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(book, quantity);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative bg-[#140D12] rounded-[4px] shadow-modal max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-burgundy/40 p-4 sm:p-8 text-ivory-light"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Mobile/Desktop Header with Back and Cross Close Buttons */}
        <div className="sticky -top-4 sm:-top-8 -mx-4 sm:-mx-8 px-4 sm:px-8 py-2.5 sm:py-3 bg-[#140D12]/95 backdrop-blur-md border-b border-burgundy/30 flex items-center justify-between z-30 mb-4 sm:mb-6">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-sans text-ivory/70 hover:text-rose-light transition-colors p-1 -ml-1 rounded active:scale-95"
            aria-label="Back to browse"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center gap-2 max-w-[70%]">
            <div className="w-5 h-5 rounded-full p-0.5 bg-[#181015] border border-burgundy/40 shadow-xs flex items-center justify-center flex-shrink-0">
              <img src="/logo.svg" alt="QITAVRO" className="w-full h-full object-contain" />
            </div>
            <span className="font-serif italic text-xs text-gold/90 truncate">
              Quick Preview · {book.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-ivory/70 hover:text-rose-light hover:bg-[#20131B] border border-burgundy/30 rounded-full transition-all active:scale-90"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start pt-2 sm:pt-0">
          {/* Left: Book Cover */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[180px] sm:max-w-[260px]">
              <BookCoverImage
                src={selectedImage || book.image}
                alt={book.title}
                title={book.title}
                author={book.author}
                category={book.category}
                aspectRatio="aspect-[2/3]"
              />
              <div className="mt-2 text-center">
                <span className="text-[10px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-widest">
                  {book.format || 'Digital Edition'}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails if available */}
            {book.previewImages && book.previewImages.length > 0 && (
              <div className="mt-3 w-full max-w-[180px] sm:max-w-[260px]">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {book.previewImages.slice(0, 6).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-9 h-12 rounded overflow-hidden border transition-all flex-shrink-0 ${
                        (selectedImage || book.image) === img
                          ? 'border-gold scale-105'
                          : 'border-burgundy/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Book Details */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-semibold text-rose-light">
                {book.condition ? `${book.category} · ${book.condition}` : book.category}
              </span>
              {book.bestseller && (
                <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-[#200A11] text-gold border border-burgundy/40">
                  Readers' Choice
                </span>
              )}
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-3xl text-ivory-light leading-tight">
              {book.title}
            </h3>

            <p className="font-serif italic text-sm sm:text-base text-gold mt-0.5 sm:mt-1">
              By {book.author}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2.5 sm:mt-3 pb-3 sm:pb-4 border-b border-burgundy/25">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      i < Math.floor(book.rating)
                        ? 'fill-gold'
                        : i < book.rating
                        ? 'fill-gold/50'
                        : 'text-burgundy/40'
                    }`}
                  />
                ))}
              </div>
              <span className="font-sans font-medium text-xs text-ivory-light">
                {book.rating}
              </span>
              <span className="text-[11px] sm:text-xs text-ivory/50">
                ({book.reviews?.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 sm:gap-3 my-3 sm:my-4">
              <span className="font-serif font-bold text-xl sm:text-2xl text-gold">
                ₹{book.price}
              </span>
              {book.originalPrice && (
                <>
                  <span className="text-xs sm:text-sm font-sans text-ivory/50 line-through">
                    ₹{book.originalPrice}
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans text-rose-light bg-[#2A0E17] border border-burgundy/40 px-1.5 sm:px-2 py-0.5 rounded font-medium">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Description excerpt */}
            <p className="text-xs sm:text-sm text-ivory/80 font-sans leading-relaxed line-clamp-3">
              {book.description}
            </p>

            {book.curatorNote && (
              <div className="my-2.5 sm:my-3 p-2.5 sm:p-3 bg-[#1A0E15] border-l-2 border-gold rounded-r text-xs font-serif italic text-ivory/90">
                "{book.curatorNote}"
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-burgundy/25 flex flex-col gap-3">
              {!isEbook && (
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs font-sans uppercase tracking-wider text-ivory/70">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-burgundy/40 bg-[#160E13] rounded">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 text-ivory-light hover:bg-[#20131B] transition-colors text-sm"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-9 text-center font-sans text-xs font-medium text-ivory-light">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(book.stock || 20, q + 1))}
                      className="px-3 py-1 text-ivory-light hover:bg-[#20131B] transition-colors text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 mt-1 sm:mt-2">
                <a
                  href={getWhatsAppBuyUrl(book)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black rounded font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-md text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buy on WhatsApp</span>
                </a>

                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle border border-burgundy-rose/30"
                >
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  <span>{isEbook ? 'Add to Bag' : 'Bag'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(book)}
                  className={`p-3 rounded border transition-colors active:scale-95 flex items-center justify-center ${
                    isSaved
                      ? 'bg-burgundy border-burgundy-rose/40 text-ivory-light'
                      : 'border-burgundy/30 hover:border-burgundy text-ivory/80 bg-[#180E14]'
                  }`}
                  aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={isSaved ? 'Saved in Wishlist' : 'Save to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-light text-rose-light' : ''}`} />
                </button>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <Link
                  to={`/book/${book.slug}`}
                  onClick={onClose}
                  className="text-rose-light hover:text-ivory-light font-sans font-medium flex items-center gap-1 group text-[11px] sm:text-xs"
                >
                  Full Specifications & Reflections
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  onClick={onClose}
                  className="text-ivory/50 hover:text-rose-light text-[11px] font-sans flex items-center gap-1 transition-colors px-2.5 py-1 rounded bg-[#180E14] hover:bg-[#20131B] border border-burgundy/25"
                  aria-label="Close modal"
                >
                  <X className="w-3 h-3" />
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
