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
import FluidHeroNavbar from '../components/ui/woodpeck-hero-landing-animation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeModalBook, setActiveModalBook] = useState(null);

  // Check if first-time visit in this session for the intro splash animation
  const [shouldPlayIntro, setShouldPlayIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('qitavro_intro_seen');
    } catch {
      return true;
    }
  });

  // Singular book currently available in the bookstore
  const books = booksData;
  const featuredBook = booksData[0] || null;

  return (
    <div className="bg-black-obsidian text-ivory-light min-h-screen">
      {/* 1. CINEMATIC FLUID HERO LANDING (Burgundy Palette · "Wlcm To Qitavro" · Official Logo) */}
      <FluidHeroNavbar
        brandName="QITAVRO"
        brandLogoUrl="/logo.svg"
        theme="burgundy"
        heroImage="/images/hero/hero-library-aisle.jpg"
        headlineKicker="The Literary Sanctuary"
        headlineFirst="Wlcm To Qitavro"
        headlineSecond="A World Between the Covers."
        ctaText="Explore Store"
        ctaHref="#explore-shelf"
        showIntroAnimation={shouldPlayIntro}
        showNavbar={true}
        accentColor="#9B2C46"
        onIntroComplete={() => {
          try {
            sessionStorage.setItem('qitavro_intro_seen', 'true');
          } catch {}
        }}
      />

      <div id="explore-shelf" />

      {/* 2. BRAND PHILOSOPHY */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#10090D] border-b border-burgundy/25">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-[5px] p-1.5 bg-[#181015] border border-burgundy/40 shadow-md mx-auto mb-4 flex items-center justify-center">
            <img src="/logo.svg" alt="QITAVRO Emblem" className="w-full h-full object-contain" />
          </div>
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
