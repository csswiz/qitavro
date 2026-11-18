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
    <div className="bg-ivory min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-white/60 border-b border-stone/60 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-burgundy font-semibold">
              Personal Archive
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-4xl text-charcoal mt-1">
              Your Saved Shelf
            </h1>
            <p className="mt-1 font-serif italic text-xs sm:text-base text-charcoal/70">
              Volumes set aside for future contemplation and acquisition.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs font-sans text-charcoal/60 hover:text-burgundy flex items-center gap-1.5 transition-colors self-start md:self-end"
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
                className="bg-white rounded border border-stone/70 p-2.5 sm:p-4 shadow-subtle hover:shadow-book flex flex-col justify-between transition-all"
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
                    <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-burgundy font-semibold truncate block">
                      {book.category}
                    </span>
                    <Link to={`/book/${book.slug}`}>
                      <h3 className="font-serif font-bold text-charcoal text-xs sm:text-base hover:text-burgundy transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="font-serif italic text-[11px] sm:text-xs text-charcoal/70 truncate">
                      {book.author}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 sm:pt-3 border-t border-stone/40">
                  <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                    <span className="font-serif font-bold text-wine text-xs sm:text-base">
                      ₹{book.price}
                    </span>
                    {book.originalPrice && (
                      <span className="font-sans text-[10px] sm:text-xs text-charcoal/40 line-through">
                        ₹{book.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-1.5 sm:gap-2">
                    <button
                      onClick={() => handleMoveToCart(book)}
                      className="flex-1 py-1.5 sm:py-2 bg-burgundy hover:bg-wine active:scale-95 text-ivory rounded font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1 transition-colors shadow-subtle"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Move</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(book.id)}
                      className="p-1.5 sm:p-2 border border-stone rounded hover:border-burgundy text-charcoal/60 hover:text-burgundy transition-colors active:scale-95"
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
          <div className="py-12 sm:py-16 text-center max-w-md mx-auto bg-white/70 p-6 sm:p-8 rounded border border-stone/70">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-ivory mx-auto flex items-center justify-center text-charcoal/30 mb-4 border border-stone/50">
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.2]" />
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-charcoal">
              Your Saved Shelf is Empty
            </h2>
            <p className="mt-2 font-serif italic text-xs sm:text-sm text-charcoal/70">
              Whenever you encounter a volume you wish to read in the future, click the heart icon on any book card.
            </p>
            <div className="mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 bg-burgundy hover:bg-wine active:scale-98 text-ivory text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle"
              >
                <span>Browse the Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
