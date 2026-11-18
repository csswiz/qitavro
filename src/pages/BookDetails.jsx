import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, ArrowLeft, Check, ShieldCheck, Truck, RotateCcw, BookOpen, Share2 } from 'lucide-react';
import booksData from '../data/books.json';
import BookCoverImage from '../components/BookCoverImage';
import BookGrid from '../components/BookGrid';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function BookDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const book = booksData.find((b) => b.slug === slug || String(b.id) === slug);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [slug]);

  if (!book) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <BookOpen className="w-16 h-16 text-charcoal/20 mb-4 stroke-[1.2]" />
        <h2 className="font-serif text-3xl font-bold text-charcoal">Edition Not Found</h2>
        <p className="font-sans text-sm text-charcoal/70 mt-2 max-w-md">
          The requested book is either out of print or the reference is invalid.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-6 py-2.5 bg-burgundy hover:bg-wine text-ivory text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(book.id);
  const discountPercent = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  // Related books from same category (excluding current book)
  const relatedBooks = booksData
    .filter((b) => b.id !== book.id && (b.category === book.category || b.featured))
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Book link copied to clipboard.', 'info');
    }
  };

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Breadcrumb Navigation (Horizontally swipeable on mobile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 border-b border-stone/50 text-xs font-sans text-charcoal/60 flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link to="/" className="hover:text-burgundy transition-colors flex-shrink-0">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-burgundy transition-colors flex-shrink-0">Shop</Link>
        <span>/</span>
        <Link to={`/shop?genre=${encodeURIComponent(book.category)}`} className="hover:text-burgundy transition-colors flex-shrink-0">
          {book.category}
        </Link>
        <span>/</span>
        <span className="text-charcoal font-medium truncate">{book.title}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Book Cover Display */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[260px] sm:max-w-[340px] shadow-2xl relative">
              <BookCoverImage
                src={book.image}
                alt={book.title}
                title={book.title}
                author={book.author}
                category={book.category}
                aspectRatio="aspect-[2/3]"
              />
              {book.badge && (
                <div className="absolute top-3 left-3 bg-burgundy text-ivory font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  {book.badge}
                </div>
              )}
            </div>

            {/* Quick trust cues under cover */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[260px] sm:max-w-[340px] text-[10px] sm:text-[11px] font-sans text-charcoal/70">
              <div className="flex items-center gap-2 p-2 sm:p-2.5 bg-white/70 rounded border border-stone/60">
                <ShieldCheck className="w-4 h-4 text-burgundy flex-shrink-0" />
                <span>Original Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 p-2 sm:p-2.5 bg-white/70 rounded border border-stone/60">
                <Truck className="w-4 h-4 text-burgundy flex-shrink-0" />
                <span>Dispatched in 24h</span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Specifications & Purchasing */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-semibold text-burgundy">
                  {book.condition ? `${book.category} · ${book.condition}` : book.category}
                </span>
                {book.bestseller && (
                  <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-gold/20 text-charcoal border border-gold/40">
                    Bestseller
                  </span>
                )}
              </div>
              <button
                onClick={handleShare}
                className="p-1.5 text-charcoal/50 hover:text-burgundy rounded hover:bg-stone/30 transition-colors flex items-center gap-1 text-xs font-sans"
                title="Share this book"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-charcoal mt-1.5 sm:mt-2 leading-[1.12]">
              {book.title}
            </h1>

            <p className="font-serif italic text-base sm:text-xl text-charcoal/80 mt-1">
              By {book.author}
            </p>

            {book.tagline && (
              <p className="font-serif italic text-xs sm:text-sm text-burgundy mt-1.5 font-medium tracking-wide">
                "{book.tagline}"
              </p>
            )}

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 pb-3 sm:pb-4 border-b border-stone/60">
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
              <span className="font-sans font-medium text-xs sm:text-sm text-charcoal">
                {book.rating}
              </span>
              <span className="text-[11px] sm:text-xs text-charcoal/60">
                ({book.reviews?.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-2.5 sm:gap-3 my-4 sm:my-5">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-wine">
                ₹{book.price}
              </span>
              {book.originalPrice && (
                <>
                  <span className="font-sans text-sm sm:text-base text-charcoal/50 line-through">
                    ₹{book.originalPrice}
                  </span>
                  <span className="text-xs font-sans text-burgundy bg-burgundy/10 px-2 py-0.5 rounded font-semibold">
                    Save ₹{book.originalPrice - book.price} ({discountPercent}%)
                  </span>
                </>
              )}
            </div>

            {/* Curator Quote Note */}
            {book.curatorNote && (
              <div className="p-3.5 sm:p-4 bg-white/70 border-l-2 border-gold rounded-r text-xs sm:text-sm font-serif italic text-charcoal/90 mb-4 sm:mb-5 leading-relaxed">
                "{book.curatorNote}"
                <span className="block not-italic font-sans text-[9px] sm:text-[10px] text-charcoal/50 uppercase tracking-widest mt-1">
                  — QITAVRO Editorial Note
                </span>
              </div>
            )}

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs font-sans text-charcoal/80 mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
              <span>In Stock — {book.stock || 18} archival copies ready for dispatch</span>
            </div>

            {/* Quantity Selector & Add to Bag */}
            <div className="pt-4 sm:pt-5 border-t border-stone/60 flex flex-col gap-3.5 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs font-sans uppercase tracking-wider text-charcoal/70">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone bg-white rounded">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-charcoal hover:bg-stone/30 transition-colors text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-sans text-xs font-semibold text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(book.stock || 20, q + 1))}
                    className="px-3 py-1.5 text-charcoal hover:bg-stone/30 transition-colors text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3">
                <button
                  onClick={() => addToCart(book, quantity)}
                  className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 bg-burgundy hover:bg-wine active:scale-98 text-ivory rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-subtle hover:shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag ({quantity})</span>
                </button>

                <button
                  onClick={() => toggleWishlist(book)}
                  className={`p-3 sm:p-3.5 rounded border transition-colors active:scale-95 ${
                    isSaved
                      ? 'bg-rose/20 border-burgundy text-burgundy'
                      : 'border-stone hover:border-burgundy text-charcoal bg-white'
                  }`}
                  aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={isSaved ? 'In your wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-burgundy' : ''}`} />
                </button>
              </div>
            </div>

            {/* Archival Packaging Notice */}
            <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 bg-stone/20 rounded border border-stone/40 text-[11px] sm:text-xs font-sans text-charcoal/75 leading-relaxed">
              <strong className="text-charcoal font-semibold block mb-0.5">QITAVRO Archival Standard:</strong>
              Protected in moisture-barrier paper, acid-free bookmarks included, shipped in rigid bookfold cartons to prevent edge wear.
            </div>

          </div>
        </div>

        {/* Tabbed / Detailed Specifications */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-stone/60">
          <div className="flex border-b border-stone/60 gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 font-serif text-base sm:text-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'description'
                  ? 'text-burgundy font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-burgundy'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('author')}
              className={`pb-3 font-serif text-base sm:text-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'author'
                  ? 'text-burgundy font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-burgundy'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              About the Author
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-serif text-base sm:text-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'specs'
                  ? 'text-burgundy font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-burgundy'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-serif text-base sm:text-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'reviews'
                  ? 'text-burgundy font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-burgundy'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Reader Reflections ({book.reviews || 0})
            </button>
          </div>

          <div className="py-6 sm:py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl font-serif text-base text-charcoal/85 leading-relaxed space-y-4">
                <p className="drop-cap">{book.description}</p>
                <p>
                  At QITAVRO, every edition is vetted for literary voice and translation fidelity. Whether you are coming to this volume for the first time or returning after a season of life, its pages hold timeless contemplation.
                </p>
              </div>
            )}

            {activeTab === 'author' && (
              <div className="max-w-3xl">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-charcoal mb-2">
                  {book.author}
                </h4>
                <p className="font-serif text-sm sm:text-base text-charcoal/80 leading-relaxed">
                  {book.aboutAuthor || `${book.author} is celebrated for profound contributions to world literature and thoughtful storytelling.`}
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl bg-white/70 p-4 sm:p-6 rounded border border-stone/60">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-4 text-xs font-sans">
                  <div>
                    <dt className="text-charcoal/50 uppercase tracking-wider">Publisher</dt>
                    <dd className="font-serif font-semibold text-charcoal text-sm mt-0.5">{book.publisher}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal/50 uppercase tracking-wider">ISBN</dt>
                    <dd className="font-mono text-charcoal text-sm mt-0.5">{book.isbn}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal/50 uppercase tracking-wider">Language</dt>
                    <dd className="font-serif text-charcoal text-sm mt-0.5">{book.language}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal/50 uppercase tracking-wider">Page Count</dt>
                    <dd className="font-serif text-charcoal text-sm mt-0.5">{book.pages} pages</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal/50 uppercase tracking-wider">Publication Date</dt>
                    <dd className="font-serif text-charcoal text-sm mt-0.5">{book.publicationDate}</dd>
                  </div>
                  <div>
                    <dt className="text-charcoal/50 uppercase tracking-wider">Format</dt>
                    <dd className="font-serif text-charcoal text-sm mt-0.5">{book.format || 'Hardcover Archive'}</dd>
                  </div>
                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-5 bg-white/70 rounded border border-stone/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-charcoal">Julian M. — Mumbai</span>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                    "The paper quality and typography of this QITAVRO copy are exceptional. You can genuinely feel the craftsmanship in your hands while turning the pages."
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-white/70 rounded border border-stone/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-charcoal">Ananya S. — Bengaluru</span>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                    "I ordered this for a quiet weekend read and couldn't put it down. The curatorial note captured the exact emotional essence of the book."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedBooks.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-stone/60">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-burgundy font-semibold">
                  Complementary Reading
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-3xl text-charcoal mt-1">
                  You May Also Like
                </h3>
              </div>
              <Link
                to={`/shop?genre=${encodeURIComponent(book.category)}`}
                className="text-xs font-sans uppercase tracking-widest font-semibold text-burgundy hover:text-wine"
              >
                Category →
              </Link>
            </div>

            <BookGrid books={relatedBooks} />
          </div>
        )}

      </div>
    </div>
  );
}
