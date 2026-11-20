import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, ArrowLeft, Check, ShieldCheck, RotateCcw, BookOpen, Share2, Download, Sparkles, Smartphone, MessageSquare } from 'lucide-react';
import booksData from '../data/books.json';
import BookCoverImage from '../components/BookCoverImage';
import BookGrid from '../components/BookGrid';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { getWhatsAppBuyUrl, DISPLAY_WHATSAPP_NUMBER } from '../utils/whatsapp';

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
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-black-obsidian text-ivory-light">
        <BookOpen className="w-16 h-16 text-ivory/20 mb-4 stroke-[1.2]" />
        <h2 className="font-serif text-3xl font-bold text-ivory-light">Edition Not Found</h2>
        <p className="font-sans text-sm text-ivory/70 mt-2 max-w-md">
          The requested book is either out of print or the reference is invalid.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors border border-burgundy-rose/30"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(book.id);
  const isEbook = Boolean(book.isEbook || book.format?.toLowerCase().includes('ebook') || book.condition?.toLowerCase() === 'ebook');
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
    <div className="bg-black-obsidian min-h-screen pb-24 text-ivory-light">
      {/* Breadcrumb Navigation (Horizontally swipeable on mobile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 border-b border-burgundy/25 text-xs font-sans text-ivory/60 flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link to="/" className="hover:text-rose-light transition-colors flex-shrink-0">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-rose-light transition-colors flex-shrink-0">Shop</Link>
        <span>/</span>
        <Link to={`/shop?genre=${encodeURIComponent(book.category)}`} className="hover:text-rose-light transition-colors flex-shrink-0">
          {book.category}
        </Link>
        <span>/</span>
        <span className="text-ivory-light font-medium truncate">{book.title}</span>
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
                <div className="absolute top-3 left-3 bg-burgundy text-ivory-light font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded shadow border border-burgundy-rose/40">
                  {book.badge}
                </div>
              )}
            </div>

            {/* Quick trust cues under cover */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[260px] sm:max-w-[340px] text-[10px] sm:text-[11px] font-sans text-ivory/70">
              <div className="flex items-center gap-2 p-2 sm:p-2.5 bg-[#140D12] rounded border border-burgundy/30">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Original Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 p-2 sm:p-2.5 bg-[#140D12] rounded border border-burgundy/30">
                <Download className="w-4 h-4 text-rose-light flex-shrink-0" />
                <span>Instant Download</span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Specifications & Purchasing */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-sans font-semibold text-rose-light">
                  {book.condition ? `${book.category} · ${book.condition}` : book.category}
                </span>
                {book.bestseller && (
                  <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-[#200A11] text-gold border border-burgundy/40">
                    Bestseller
                  </span>
                )}
              </div>
              <button
                onClick={handleShare}
                className="p-1.5 text-ivory/60 hover:text-rose-light rounded hover:bg-[#20131B] transition-colors flex items-center gap-1 text-xs font-sans"
                title="Share this book"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>

            <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-ivory-light mt-1.5 sm:mt-2 leading-[1.12]">
              {book.title}
            </h1>

            <p className="font-serif italic text-base sm:text-xl text-gold mt-1">
              By {book.author}
            </p>

            {book.tagline && (
              <p className="font-serif italic text-xs sm:text-sm text-rose-light mt-1.5 font-medium tracking-wide">
                "{book.tagline}"
              </p>
            )}

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 pb-3 sm:pb-4 border-b border-burgundy/25">
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
              <span className="font-sans font-medium text-xs sm:text-sm text-ivory-light">
                {book.rating}
              </span>
              <span className="text-[11px] sm:text-xs text-ivory/60">
                ({book.reviews?.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-2.5 sm:gap-3 my-4 sm:my-5">
              <span className="font-serif font-bold text-2xl sm:text-3xl text-gold">
                ₹{book.price}
              </span>
              {book.originalPrice && (
                <>
                  <span className="font-sans text-sm sm:text-base text-ivory/50 line-through">
                    ₹{book.originalPrice}
                  </span>
                  <span className="text-xs font-sans text-rose-light bg-[#2A0E17] border border-burgundy/40 px-2 py-0.5 rounded font-semibold">
                    Save ₹{book.originalPrice - book.price} ({discountPercent}%)
                  </span>
                </>
              )}
            </div>

            {/* Curator Quote Note */}
            {book.curatorNote && (
              <div className="p-3.5 sm:p-4 bg-[#140D12] border-l-2 border-gold rounded-r text-xs sm:text-sm font-serif italic text-ivory/90 mb-4 sm:mb-5 leading-relaxed">
                "{book.curatorNote}"
                <span className="block not-italic font-sans text-[9px] sm:text-[10px] text-ivory/50 uppercase tracking-widest mt-1">
                  — QITAVRO Editorial Note
                </span>
              </div>
            )}

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs font-sans text-ivory/80 mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-rose-light flex-shrink-0 animate-pulse" />
              <span>Digital Edition Available — Instant Download & Email Delivery</span>
            </div>

            {/* WhatsApp Direct Buying Highlight */}
            <div className="p-3.5 sm:p-4 rounded-[4px] bg-[#181015] border border-[#25D366]/40 flex items-start gap-3 my-4">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-xs font-sans text-ivory/80 leading-relaxed">
                <strong className="text-ivory-light font-medium block">
                  Purchases Handled Directly on WhatsApp ({DISPLAY_WHATSAPP_NUMBER}):
                </strong>
                To buy this book, message our team on WhatsApp. We provide instant order verification, secure UPI / card payment, and immediate download links.
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-2 sm:pt-3 border-t border-burgundy/25 flex flex-col gap-3.5 sm:gap-4">
              {!isEbook && (
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs font-sans uppercase tracking-wider text-ivory/70">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-burgundy/40 bg-[#160E13] rounded">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-ivory-light hover:bg-[#20131B] transition-colors text-sm"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-9 text-center font-sans text-xs font-semibold text-ivory-light">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(book.stock || 20, q + 1))}
                      className="px-3 py-1.5 text-ivory-light hover:bg-[#20131B] transition-colors text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Primary Buy on WhatsApp + Secondary Add to Bag */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <a
                  href={getWhatsAppBuyUrl(book)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black rounded font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buy Now via WhatsApp (₹{book.price})</span>
                </a>

                <button
                  onClick={() => addToCart(book, quantity)}
                  className="py-3.5 px-5 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-subtle border border-burgundy-rose/40"
                  title="Add to Shopping Bag"
                >
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  <span>{isEbook ? 'Add to Bag' : `Bag (${quantity})`}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(book)}
                  className={`p-3.5 rounded border transition-colors active:scale-95 flex items-center justify-center ${
                    isSaved
                      ? 'bg-burgundy border-burgundy-rose/40 text-ivory-light'
                      : 'border-burgundy/35 hover:border-burgundy text-ivory/80 bg-[#140D12]'
                  }`}
                  aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={isSaved ? 'In your wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-light text-rose-light' : ''}`} />
                </button>
              </div>
            </div>

            {/* Digital Delivery Notice */}
            <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 bg-[#140D12] rounded border border-burgundy/30 text-[11px] sm:text-xs font-sans text-ivory/75 leading-relaxed">
              <strong className="text-gold font-semibold block mb-0.5">
                QITAVRO Digital eBook Delivery:
              </strong>
              <span>
                Immediate digital delivery after checkout. You will receive an instant download link on screen and via email containing DRM-free EPUB and PDF formats. Compatible with Apple Books, Kindle, Kobo, Android, iOS, PC, and Mac.
              </span>
            </div>

          </div>
        </div>

        {/* Tabbed / Detailed Specifications */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-burgundy/25">
          <div className="flex border-b border-burgundy/25 gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 font-serif text-base sm:text-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'description'
                  ? 'text-rose-light font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-rose-light'
                  : 'text-ivory/60 hover:text-ivory-light'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('author')}
              className={`pb-3 font-serif text-base sm:text-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'author'
                  ? 'text-rose-light font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-rose-light'
                  : 'text-ivory/60 hover:text-ivory-light'
              }`}
            >
              About the Author
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-serif text-base sm:text-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'specs'
                  ? 'text-rose-light font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-rose-light'
                  : 'text-ivory/60 hover:text-ivory-light'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-serif text-base sm:text-lg transition-colors whitespace-nowrap relative ${
                activeTab === 'reviews'
                  ? 'text-rose-light font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-rose-light'
                  : 'text-ivory/60 hover:text-ivory-light'
              }`}
            >
              Reader Reflections ({book.reviews || 0})
            </button>
          </div>

          <div className="py-6 sm:py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl font-serif text-base text-ivory/85 leading-relaxed space-y-4">
                <p className="drop-cap">{book.description}</p>
                <p>
                  At QITAVRO, every edition is vetted for literary voice and emotional intensity. Whether you are coming to this volume for the first time or returning after a season of life, its pages hold dark devotion and enduring contemplation.
                </p>
              </div>
            )}

            {activeTab === 'author' && (
              <div className="max-w-3xl">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-ivory-light mb-2">
                  {book.author}
                </h4>
                <p className="font-serif text-sm sm:text-base text-ivory/80 leading-relaxed">
                  {book.aboutAuthor || `${book.author} is celebrated for profound contributions to world literature and thoughtful storytelling.`}
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl bg-[#140D12] p-4 sm:p-6 rounded border border-burgundy/30">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-4 text-xs font-sans">
                  <div>
                    <dt className="text-ivory/50 uppercase tracking-wider">Publisher</dt>
                    <dd className="font-serif font-semibold text-ivory-light text-sm mt-0.5">{book.publisher}</dd>
                  </div>
                  <div>
                    <dt className="text-ivory/50 uppercase tracking-wider">ISBN</dt>
                    <dd className="font-mono text-gold text-sm mt-0.5">{book.isbn}</dd>
                  </div>
                  <div>
                    <dt className="text-ivory/50 uppercase tracking-wider">Language</dt>
                    <dd className="font-serif text-ivory-light text-sm mt-0.5">{book.language}</dd>
                  </div>
                  <div>
                    <dt className="text-ivory/50 uppercase tracking-wider">Page Count</dt>
                    <dd className="font-serif text-ivory-light text-sm mt-0.5">{book.pages} pages</dd>
                  </div>
                  <div>
                    <dt className="text-ivory/50 uppercase tracking-wider">Publication Date</dt>
                    <dd className="font-serif text-ivory-light text-sm mt-0.5">{book.publicationDate}</dd>
                  </div>
                  <div>
                    <dt className="text-ivory/50 uppercase tracking-wider">Format</dt>
                    <dd className="font-serif text-gold text-sm mt-0.5">{book.format || 'Digital Edition (eBook • EPUB & PDF)'}</dd>
                  </div>
                  {isEbook && (
                    <>
                      <div>
                        <dt className="text-ivory/50 uppercase tracking-wider">File Formats</dt>
                        <dd className="font-serif text-ivory-light text-sm mt-0.5">{book.fileFormats || 'EPUB & PDF (DRM-Free)'}</dd>
                      </div>
                      <div>
                        <dt className="text-ivory/50 uppercase tracking-wider">File Size</dt>
                        <dd className="font-serif text-ivory-light text-sm mt-0.5">{book.fileSize || '4.2 MB'}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-ivory/50 uppercase tracking-wider">Compatible Devices</dt>
                        <dd className="font-sans text-ivory/80 text-xs mt-0.5">{book.compatibility || 'Kindle, Apple Books, Kobo, Android, iOS, PC & Mac'}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-ivory/50 uppercase tracking-wider">Delivery Method</dt>
                        <dd className="font-sans text-gold text-xs mt-0.5 font-medium">{book.delivery || 'Instant Digital Download link sent to email & available in browser post-checkout'}</dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-4 sm:space-y-6">
                <div className="p-4 sm:p-5 bg-[#140D12] rounded border border-burgundy/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-ivory-light">Julian M. — Mumbai</span>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-ivory/80 leading-relaxed">
                    "The typography and reading experience of this QITAVRO eBook are exceptional. 'Some hearts are meant to bleed together' lingers long after the final chapter."
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#140D12] rounded border border-burgundy/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-ivory-light">Ananya S. — Bengaluru</span>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-ivory/80 leading-relaxed">
                    "I downloaded this for a late-night read and couldn't put it down. The curatorial note captured the exact gothic, passionate essence of Ace's world."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedBooks.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-burgundy/25">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-rose-light font-semibold">
                  Complementary Reading
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-3xl text-ivory-light mt-1">
                  You May Also Like
                </h3>
              </div>
              <Link
                to={`/shop?genre=${encodeURIComponent(book.category)}`}
                className="text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light"
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
