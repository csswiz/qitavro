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
      <section className="relative overflow-hidden min-h-[600px] sm:min-h-[660px] md:min-h-[720px] lg:min-h-[780px] flex items-center pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 border-b border-burgundy/30">
        
        {/* Cinematic Atmospheric Classical Library Background */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/images/hero/hero-library-aisle.jpg"
            alt="Grand Classical Library Sanctuary"
            className="w-full h-full object-cover object-[center_36%] sm:object-[center_32%] scale-105 motion-safe:transition-transform motion-safe:duration-1000"
          />

          {/* Deep Obsidian & Velvet Tinting Layer */}
          <div className="absolute inset-0 bg-[#080306]/75 mix-blend-multiply" />

          {/* Directional Horizontal Vignette: Deep black-burgundy on left for 100% typography contrast, atmospheric vanishing corridor on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black-obsidian via-black-obsidian/95 via-45% sm:via-[#12060E]/90 lg:via-[#140610]/80 to-black-obsidian/70" />

          {/* Top and Bottom Fades: Seamless transition from header and into the next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black-obsidian/95 via-transparent via-50% to-black-obsidian" />

          {/* Mobile Specific Soft Veil for pristine readability across all handheld screen sizes */}
          <div className="absolute inset-0 bg-black-obsidian/40 sm:bg-transparent" />

          {/* Velvet Burgundy & Warm Amber Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(131,52,73,0.18),transparent)]" />
        </div>

        {/* Live 3D Mythic Guardian Dragon (Translates smoothly from top to bottom on scroll) */}
        <HeroDragon3D modelUrl="/models/dragon.glb" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: QITAVRO Brand & Bookstore Mission */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-2.5 py-1 rounded bg-[#180A12]/80 backdrop-blur-md border border-burgundy/40 shadow-sm">
                <span className="w-4 sm:w-5 h-[1.5px] bg-rose-light" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
                  The Literary Sanctuary
                </span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-ivory-light leading-[1.12] sm:leading-[1.08] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                "A World Between the Covers."
              </h1>

              <p className="mt-4 sm:mt-6 text-sm sm:text-lg font-serif italic text-ivory/85 leading-relaxed max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                Discover thoughtful stories, enduring literature, and rare curations. An independent bookstore crafted for the intentional reader.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light rounded font-sans text-xs uppercase tracking-widest font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-[0_8px_24px_-4px_rgba(101,46,60,0.65)] border border-burgundy-rose/40 text-center"
                >
                  <span>Explore the Store</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 bg-[#181015]/90 hover:bg-[#20131B] text-ivory-light border border-burgundy/50 backdrop-blur-md rounded font-sans text-xs uppercase tracking-widest font-semibold transition-all text-center shadow-md"
                >
                  Our Philosophy
                </Link>
              </div>

              {/* Bookstore Pillar Metrics */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-7 border-t border-burgundy/30 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg bg-[#140810]/65 backdrop-blur-md p-3.5 sm:p-5 rounded-[4px] border border-burgundy/35 shadow-lg">
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold drop-shadow-sm">Curated</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/70 uppercase tracking-wider">Handpicked</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold drop-shadow-sm">eBook</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/70 uppercase tracking-wider">Instant Access</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold drop-shadow-sm">DRM-Free</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/70 uppercase tracking-wider">Read Anywhere</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Discreet Book Feature Preview */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-[260px] sm:max-w-xs">
                
                {featuredBook && (
                  <div className="relative aspect-[2/3] rounded-[6px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(101,46,60,0.6)] border border-burgundy/60 bg-[#140D12] group">
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
                      className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <span className="px-4 py-2 bg-burgundy/95 text-ivory-light rounded text-xs font-sans uppercase tracking-widest font-semibold border border-burgundy-rose/40 shadow-xl">
                        View Book
                      </span>
                    </Link>
                  </div>
                )}

                {/* Overlaid Minimal Card */}
                {featuredBook && (
                  <div className="flex absolute -bottom-5 -left-3 sm:-bottom-6 sm:-left-5 bg-[#160E13]/95 backdrop-blur-md p-3.5 rounded border border-burgundy/50 shadow-2xl items-center justify-between gap-3 min-w-[220px] text-ivory-light">
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
          <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap">
            <Link
              to="/sell"
              className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold px-3 py-1.5 rounded bg-[#181015] hover:bg-burgundy text-gold border border-gold/40 transition-colors"
            >
              <span>Sell on QITAVRO (₹99)</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
            <Link
              to="/shop"
              className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light transition-colors"
            >
              <span>View Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>
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
