import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Star, 
  Heart, 
  ShoppingBag, 
  Download, 
  Smartphone, 
  Tablet, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Feather 
} from 'lucide-react';
import booksData from '../data/books.json';
import Newsletter from '../components/Newsletter';
import QuickViewModal from '../components/QuickViewModal';
import HeroDragon3D from '../components/HeroDragon3D';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeModalBook, setActiveModalBook] = useState(null);

  // The featured eBook
  const featuredBook = booksData[0] || null;

  return (
    <div className="bg-black-obsidian text-ivory-light min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-24 border-b border-black-border">
        {/* Live 3D Mythic Guardian Dragon (Translates smoothly from top to bottom on scroll) */}
        <HeroDragon3D modelUrl="/models/dragon.glb" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Column: Author, Title, Tagline & Direct eBook Actions */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-5 sm:w-6 h-[1.5px] bg-rose-light" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
                  Exclusive Digital Edition • Dark Romance
                </span>
              </div>

              <div className="mb-2">
                <span className="font-serif italic text-base sm:text-lg text-gold font-medium">
                  By {featuredBook?.author || 'Ace'}
                </span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-ivory-light leading-[1.12] sm:leading-[1.08] tracking-tight">
                "{featuredBook?.tagline || 'Some hearts are meant to bleed together.'}"
              </h1>

              <p className="mt-4 sm:mt-6 text-sm sm:text-lg font-serif italic text-ivory/80 leading-relaxed max-w-xl">
                {featuredBook?.description || "An evocative dark romance enveloped in mystery, devotion, and a bond forged through crimson passion. When love demands everything, two souls discover that even thorns cannot break what destiny has carved in blood."}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {featuredBook && (
                  <button
                    onClick={() => addToCart(featuredBook, 1)}
                    className="px-6 py-3.5 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light rounded font-sans text-xs uppercase tracking-widest font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-[0_8px_24px_-6px_rgba(101,46,60,0.5)] border border-burgundy-rose/40 text-center group"
                  >
                    <ShoppingBag className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                    <span>Get Instant eBook — ₹{featuredBook.price}</span>
                  </button>
                )}

                <Link
                  to={`/book/${featuredBook?.slug || 'darling-in-reds'}`}
                  className="px-6 py-3.5 bg-[#181015] hover:bg-[#20131B] text-ivory-light border border-burgundy/40 rounded font-sans text-xs uppercase tracking-widest font-semibold transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Story & Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>

              {/* Verified Product Spec Badges */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-burgundy/25 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg">
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">₹{featuredBook?.price || 149}</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">Instant Access</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">EPUB & PDF</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">DRM-Free Files</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">4.9 ★</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">Acclaimed Romance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Real Book Cover Presentation */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-[280px] sm:max-w-xs md:max-w-sm">
                
                {/* Book Frame with Ambient Burgundy Glow and Shadow */}
                <div className="relative aspect-[2/3] rounded-[6px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(101,46,60,0.6)] border-2 border-burgundy/60 bg-[#140D12] group">
                  <img
                    src={featuredBook?.image || '/images/books/darling-in-reds.jpg'}
                    alt={featuredBook?.title || "Darling in Red's by Ace"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />

                  {/* Top-Right Badge: Official eBook Edition */}
                  <div className="absolute top-3 right-3 bg-[#140C10]/95 backdrop-blur-md border border-gold/50 px-2.5 py-1 rounded text-ivory-light text-right shadow-md">
                    <span className="block font-serif text-[11px] font-bold text-gold tracking-wide">
                      ROMANCE • PRE-LOVED
                    </span>
                    <span className="text-[8px] font-sans uppercase tracking-widest text-ivory/70">
                      OFFICIAL EBOOK
                    </span>
                  </div>

                  {/* Bottom Wishlist Button */}
                  {featuredBook && (
                    <button
                      onClick={() => toggleWishlist(featuredBook)}
                      aria-label="Save to Wishlist"
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-[#140C10]/90 border border-burgundy/50 text-ivory-light hover:text-gold transition-colors backdrop-blur-md"
                    >
                      <Heart
                        className={`w-4 h-4 ${isInWishlist(featuredBook.id) ? 'fill-rose-light text-rose-light' : ''}`}
                      />
                    </button>
                  )}
                </div>

                {/* Overlaid Floating Card: Instant Download Info */}
                <div className="flex absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-[#160E13]/95 backdrop-blur-md p-3.5 sm:p-4 rounded border border-burgundy/50 shadow-2xl items-center gap-3 max-w-[260px] sm:max-w-xs text-ivory-light">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#201018] rounded flex items-center justify-center flex-shrink-0 border border-burgundy/50 text-gold">
                    <Download className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-ivory-light">
                      Instant Digital Download
                    </h4>
                    <p className="text-[10px] sm:text-[11px] font-sans text-ivory/70 mt-0.5 leading-snug">
                      EPUB & PDF ready immediately post-checkout & emailed instantly.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE STORY & ATMOSPHERE */}
      <section className="py-14 sm:py-18 md:py-24 bg-[#10090D] border-b border-burgundy/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
            The Story & Atmosphere
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-ivory-light mt-2 mb-4">
            Where Love Demands Everything.
          </h2>
          <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
          <p className="font-serif text-base sm:text-xl text-ivory/90 leading-relaxed italic max-w-3xl mx-auto">
            "Some hearts are meant to bleed together. An evocative dark romance enveloped in mystery, devotion, and a bond forged through crimson passion. When love demands everything, two souls discover that even thorns cannot break what destiny has carved in blood."
          </p>

          {/* Three Narrative Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-[#140D12] p-6 rounded border border-burgundy/30 shadow-subtle">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mb-4 border border-burgundy/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-ivory-light mb-1.5">
                Crimson Devotion
              </h3>
              <p className="text-xs font-sans text-ivory/70 leading-relaxed">
                A dark romance exploring the raw vulnerability and unconditional devotion that arises when two souls refuse to surrender to circumstance.
              </p>
            </div>

            <div className="bg-[#140D12] p-6 rounded border border-burgundy/30 shadow-subtle">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mb-4 border border-burgundy/40">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-ivory-light mb-1.5">
                Atmospheric Prose
              </h3>
              <p className="text-xs font-sans text-ivory/70 leading-relaxed">
                Penned with gothic undertones, Ace's evocative writing pulls you into an intoxicating world of shadows, longing, and unforgettable tension.
              </p>
            </div>

            <div className="bg-[#140D12] p-6 rounded border border-burgundy/30 shadow-subtle">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mb-4 border border-burgundy/40">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-ivory-light mb-1.5">
                Complete Digital Journey
              </h3>
              <p className="text-xs font-sans text-ivory/70 leading-relaxed">
                312 pages of gripping romance, formatted cleanly for seamless reading across all phones, tablets, e-readers, and computers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL SPOTLIGHT & INSTANT BUY BOX */}
      {featuredBook && (
        <section className="bg-gradient-to-r from-[#200A11] via-[#35121D] to-[#16070D] text-ivory-light py-14 sm:py-20 relative overflow-hidden border-b border-burgundy/40 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

              {/* Left: Large Book Cover */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[240px] sm:max-w-[320px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-[6px] overflow-hidden border-2 border-gold/40 relative group">
                  <img
                    src={featuredBook.image}
                    alt={featuredBook.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                  <div className="absolute -top-3 -right-3 bg-gold text-[#140D12] font-sans text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-lg">
                    Featured Edition
                  </div>
                </div>
              </div>

              {/* Right: Editorial Story & Recommendation */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
                  Editorial Spotlight
                </span>

                <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ivory-light mt-1.5 leading-tight">
                  {featuredBook.title}
                </h2>

                <p className="font-serif italic text-base sm:text-lg text-gold mt-1">
                  By {featuredBook.author}
                </p>

                <div className="flex items-center gap-2.5 sm:gap-3 my-3 sm:my-4">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold" />
                    ))}
                  </div>
                  <span className="text-xs font-sans text-ivory/70">
                    {featuredBook.rating} Rating • ({featuredBook.reviews} reader reviews)
                  </span>
                </div>

                {/* Editorial Recommendation Quote */}
                <div className="my-2.5 sm:my-3 p-4 bg-[#14070D]/85 border-l-2 border-gold rounded-r text-xs sm:text-sm font-serif italic text-ivory/90 leading-relaxed">
                  "{featuredBook.curatorNote || featuredBook.description}"
                </div>

                {/* Why We Recommend This Book */}
                <div className="mt-2 text-xs sm:text-sm font-sans text-ivory/80 leading-relaxed space-y-1.5">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-ivory-light">
                    Why We Recommend This Book
                  </h4>
                  <p>
                    {featuredBook.whyRecommend || featuredBook.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-gold">
                      ₹{featuredBook.price}
                    </span>
                    {featuredBook.originalPrice && (
                      <span className="font-sans text-xs sm:text-sm text-ivory/50 line-through">
                        ₹{featuredBook.originalPrice}
                      </span>
                    )}
                    <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-burgundy/40 text-rose-light border border-burgundy/50">
                      50% OFF
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => addToCart(featuredBook, 1)}
                      className="flex-1 sm:flex-none px-6 py-3.5 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light font-sans text-xs uppercase tracking-widest font-semibold rounded inline-flex items-center justify-center gap-2 transition-all shadow border border-burgundy-rose/40 text-center"
                    >
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>Get Instant eBook</span>
                    </button>

                    <Link
                      to={`/book/${featuredBook.slug}`}
                      className="flex-1 sm:flex-none px-6 py-3.5 bg-[#1C0D15]/80 hover:bg-[#2A1420] text-ivory-light border border-burgundy/40 rounded font-sans text-xs uppercase tracking-widest font-semibold transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mt-5 flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] font-sans text-ivory/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold" /> DRM-Free EPUB & PDF
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold" /> Instant Delivery
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold" /> Lifetime Access
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4. DIGITAL COMPATIBILITY & READING FREEDOM */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-burgundy/25">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
            Seamless Reading Experience
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-ivory-light mt-1.5">
            Read Anywhere, On Any Device.
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-sans text-ivory/70">
            Your purchase includes DRM-free EPUB and PDF editions, allowing you complete freedom to read on your favorite screen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#140D12] p-5 rounded border border-burgundy/30 text-center">
            <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-ivory-light">Kindle & e-Readers</h4>
            <p className="text-[11px] font-sans text-ivory/60 mt-1">
              Easily send the EPUB file to your Kindle via email or USB for paper-like e-ink reading.
            </p>
          </div>

          <div className="bg-[#140D12] p-5 rounded border border-burgundy/30 text-center">
            <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-ivory-light">Apple Books (iOS/Mac)</h4>
            <p className="text-[11px] font-sans text-ivory/60 mt-1">
              One-tap import straight into Apple Books with automatic iCloud sync across iPhone and iPad.
            </p>
          </div>

          <div className="bg-[#140D12] p-5 rounded border border-burgundy/30 text-center">
            <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
              <Tablet className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-ivory-light">Android & Tablets</h4>
            <p className="text-[11px] font-sans text-ivory/60 mt-1">
              Read comfortably on Google Play Books, Moon+ Reader, or any Android reading application.
            </p>
          </div>

          <div className="bg-[#140D12] p-5 rounded border border-burgundy/30 text-center">
            <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-ivory-light">DRM-Free Freedom</h4>
            <p className="text-[11px] font-sans text-ivory/60 mt-1">
              No restrictive proprietary lock-in. Keep your book files safely backed up forever.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ABOUT THE AUTHOR: ACE */}
      <section className="py-14 sm:py-20 bg-[#100A0E] border-b border-burgundy/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#140D12] rounded-[4px] border border-burgundy/30 p-6 sm:p-10 shadow-subtle flex flex-col md:flex-row items-center gap-6 sm:gap-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#201018] border-2 border-gold/40 flex items-center justify-center text-gold font-serif text-3xl font-bold flex-shrink-0 shadow-lg">
              Ace
            </div>
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[10px] uppercase font-sans tracking-widest text-rose-light font-semibold">
                About the Author
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light mt-1">
                Ace
              </h3>
              <p className="font-serif italic text-sm text-gold mt-0.5">
                Acclaimed Independent Author
              </p>
              <p className="text-xs sm:text-sm font-sans text-ivory/80 mt-3 leading-relaxed">
                Ace is an independent author acclaimed for gothic-tinged romances, creating heartfelt emotional arcs and poignant explorations of fierce, unwavering devotion. With a distinct atmospheric voice, Ace crafts stories where vulnerable characters discover strength in the deepest shadows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER */}
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
