import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight, BookOpen } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import BookCoverImage from '../components/BookCoverImage';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (book) => {
    addToCart(book, 1);
    removeFromWishlist(book.id);
  };

  return (
    <div className="bg-black-obsidian min-h-screen pb-24 text-ivory-light">
      {/* Header Banner */}
      <div className="bg-[#120C10] border-b border-burgundy/25 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
              Personal Archive
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-4xl text-ivory-light mt-1">
              Your Saved Shelf
            </h1>
            <p className="mt-1 font-serif italic text-xs sm:text-base text-ivory/70">
              Volumes set aside for future contemplation and acquisition.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-sans text-ivory/60 hover:text-rose-light flex items-center gap-1.5 transition-colors self-start md:self-end"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Saved Shelf</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="bg-[#140D12] rounded-[4px] border border-burgundy/30 p-2.5 sm:p-4 shadow-subtle hover:border-burgundy/70 hover:shadow-[0_12px_30px_-8px_rgba(101,46,60,0.35)] flex flex-col justify-between transition-all"
              >
                <div>
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

                  <div className="mt-2.5 sm:mt-3">
                    <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-rose-light font-semibold truncate block">
                      {book.category}
                    </span>
                    <Link to={`/book/${book.slug}`}>
                      <h3 className="font-serif font-bold text-ivory-light text-xs sm:text-base hover:text-rose-light transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="font-serif italic text-[11px] sm:text-xs text-gold truncate">
                      {book.author}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 sm:pt-3 border-t border-burgundy/25">
                  <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                    <span className="font-serif font-bold text-gold text-xs sm:text-base">
                      ₹{book.price}
                    </span>
                    {book.originalPrice && (
                      <span className="font-sans text-[10px] sm:text-xs text-ivory/40 line-through">
                        ₹{book.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-1.5 sm:gap-2">
                    <button
                      onClick={() => handleMoveToCart(book)}
                      className="flex-1 py-1.5 sm:py-2 bg-burgundy hover:bg-burgundy-light active:scale-95 text-ivory-light rounded font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1 transition-colors shadow-subtle border border-burgundy-rose/30"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold" />
                      <span>Move</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(book.id)}
                      className="p-1.5 sm:p-2 border border-burgundy/30 rounded bg-[#181015] hover:border-burgundy text-ivory/60 hover:text-rose-light transition-colors active:scale-95"
                      aria-label="Remove from Wishlist"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Wishlist State */
          <div className="py-12 sm:py-16 text-center max-w-md mx-auto bg-[#140D12] p-6 sm:p-8 rounded-[4px] border border-burgundy/30 text-ivory-light shadow-subtle">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1C0D15] mx-auto flex items-center justify-center text-rose-light mb-4 border border-burgundy/40">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.2]" />
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-ivory-light">
              Your Saved Shelf is Empty
            </h2>
            <p className="mt-2 font-serif italic text-xs sm:text-sm text-ivory/70">
              Whenever you encounter a volume you wish to read in the future, click the heart icon on any book card.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle border border-burgundy-rose/40"
              >
                <span>Browse the Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
