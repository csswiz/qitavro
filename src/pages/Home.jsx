import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Star, 
  Heart, 
  ShoppingBag, 
  Smartphone, 
  Tablet, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Feather 
} from 'lucide-react';
import booksData from '../data/books.json';
import BookGrid from '../components/BookGrid';
import Newsletter from '../components/Newsletter';
import QuickViewModal from '../components/QuickViewModal';
import HeroDragon3D from '../components/HeroDragon3D';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeModalBook, setActiveModalBook] = useState(null);

  // Singular book currently available in the bookstore
  const books = booksData;
  const featuredBook = booksData[0] || null;

  return (
    <div className="bg-black-obsidian text-ivory-light min-h-screen">
      {/* 1. HERO SECTION (QITAVRO Literary Bookstore) */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-24 border-b border-black-border">
        {/* Live 3D Mythic Guardian Dragon (Translates smoothly from top to bottom on scroll) */}
        <HeroDragon3D modelUrl="/models/dragon.glb" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Column: QITAVRO Brand & Bookstore Mission */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-5 sm:w-6 h-[1.5px] bg-rose-light" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
                  The Literary Sanctuary
                </span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-ivory-light leading-[1.12] sm:leading-[1.08] tracking-tight">
                "A World Between the Covers."
              </h1>

              <p className="mt-4 sm:mt-6 text-sm sm:text-lg font-serif italic text-ivory/80 leading-relaxed max-w-xl">
                Discover thoughtful stories, enduring literature, and rare curations. An independent bookstore crafted for the intentional reader.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light rounded font-sans text-xs uppercase tracking-widest font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-[0_8px_24px_-6px_rgba(101,46,60,0.5)] border border-burgundy-rose/40 text-center"
                >
                  <span>Explore the Store</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 bg-[#181015] hover:bg-[#20131B] text-ivory-light border border-burgundy/40 rounded font-sans text-xs uppercase tracking-widest font-semibold transition-all text-center"
                >
                  Our Philosophy
                </Link>
              </div>

              {/* Bookstore Pillar Metrics */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-burgundy/25 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg">
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">Curated</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">Handpicked</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">eBook</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">Instant Access</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">DRM-Free</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">Read Anywhere</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Discreet Book Feature Preview */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-[260px] sm:max-w-xs">
                
                {featuredBook && (
                  <div className="relative aspect-[2/3] rounded-[6px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(101,46,60,0.5)] border border-burgundy/50 bg-[#140D12] group">
                    <img
                      src={featuredBook.image}
                      alt={featuredBook.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />

                    {/* Discreet Top Shelf Badge */}
                    <div className="absolute top-3 right-3 bg-[#140C10]/95 backdrop-blur-md border border-gold/40 px-2.5 py-1 rounded text-ivory-light text-right shadow-md">
                      <span className="block font-serif text-[10px] font-bold text-gold tracking-wide">
                        CURRENT FEATURE
                      </span>
                    </div>

                    {/* Quick Link Overlay */}
                    <Link
                      to={`/book/${featuredBook.slug}`}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <span className="px-4 py-2 bg-burgundy/90 text-ivory-light rounded text-xs font-sans uppercase tracking-widest font-semibold border border-burgundy-rose/40 shadow-lg">
                        View Book
                      </span>
                    </Link>
                  </div>
                )}

                {/* Overlaid Minimal Card */}
                {featuredBook && (
                  <div className="flex absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-5 bg-[#160E13]/95 backdrop-blur-md p-3 rounded border border-burgundy/40 shadow-xl items-center justify-between gap-3 min-w-[220px] text-ivory-light">
                    <div>
                      <h4 className="font-serif font-bold text-xs text-ivory-light truncate max-w-[140px]">
                        {featuredBook.title}
                      </h4>
                      <p className="text-[10px] font-sans text-gold">
                        ₹{featuredBook.price} • {featuredBook.category}
                      </p>
                    </div>
                    <Link
                      to={`/book/${featuredBook.slug}`}
                      className="text-[10px] font-sans uppercase tracking-wider text-rose-light hover:text-gold font-semibold flex items-center gap-1 flex-shrink-0"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BRAND PHILOSOPHY */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#10090D] border-b border-burgundy/25">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
            Our Philosophy
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-ivory-light mt-2 mb-4">
            More Than Just Books.
          </h2>
          <div className="w-10 h-[2px] bg-gold mx-auto mb-6" />
          <p className="font-serif text-base sm:text-lg text-ivory/85 leading-relaxed italic max-w-2xl mx-auto">
            "In an age of relentless scrolling and algorithmic noise, reading is an act of quiet restoration. At QITAVRO, we curate stories that invite reflection, celebrate distinctive voices, and reward unhurried time."
          </p>
        </div>
      </section>

      {/* 3. CURRENTLY ON THE SHELF (Book for Sale) */}
      <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-burgundy/25">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-4 h-[1.5px] bg-gold" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-gold font-semibold">
                Available In Store
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-ivory-light">
              Current Shelf
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light transition-colors"
          >
            <span>View Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold" />
          </Link>
        </div>

        {/* The singular book available in store */}
        <BookGrid books={books} />
      </section>

      {/* 4. DIGITAL COMPATIBILITY & READING FREEDOM */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-burgundy/25">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
            Instant Digital Delivery
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light mt-1.5">
            Read On Any Screen
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-sans text-ivory/70">
            Digital editions are provided DRM-free in standard EPUB and PDF formats, allowing seamless reading across your preferred devices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-[#140D12] p-5 rounded border border-burgundy/30 text-center">
            <div className="w-9 h-9 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-ivory-light">Kindle & e-Readers</h4>
            <p className="text-[11px] font-sans text-ivory/60 mt-1">
              EPUB compatible with Send-to-Kindle or USB transfer for paper-like e-ink reading.
            </p>
          </div>

          <div className="bg-[#140D12] p-5 rounded border border-burgundy/30 text-center">
            <div className="w-9 h-9 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
              <Smartphone className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-ivory-light">Apple Books</h4>
            <p className="text-[11px] font-sans text-ivory/60 mt-1">
              One-tap import on iPhone, iPad, and Mac with automatic reading progress sync.
            </p>
          </div>

          <div className="bg-[#140D12] p-5 rounded border border-burgundy/30 text-center">
            <div className="w-9 h-9 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
              <Tablet className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-ivory-light">Android & Tablets</h4>
            <p className="text-[11px] font-sans text-ivory/60 mt-1">
              Compatible with Google Play Books, Moon+ Reader, or any Android reader.
            </p>
          </div>

          <div className="bg-[#140D12] p-5 rounded border border-burgundy/30 text-center">
            <div className="w-9 h-9 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-ivory-light">DRM-Free</h4>
            <p className="text-[11px] font-sans text-ivory/60 mt-1">
              No proprietary lock-in. Keep your personal copy safely backed up forever.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER */}
      <Newsletter />

      {/* Quick View Modal container for homepage */}
      <QuickViewModal
        book={activeModalBook}
        isOpen={!!activeModalBook}
        onClose={() => setActiveModalBook(null)}
      />
    </div>
  );
}
