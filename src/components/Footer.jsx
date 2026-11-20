import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, Feather, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060405] text-ivory-light border-t border-black-border pt-16 pb-28 sm:pb-24 lg:pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-burgundy/20">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-[#140C10] border border-burgundy/40 text-gold flex-shrink-0">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-ivory-light">Editorial Devotion</h4>
              <p className="text-xs text-ivory/70 mt-1 leading-relaxed">
                Hand-selected dark romance celebrating visceral emotion, heartfelt tension, and authentic prose.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-[#140C10] border border-burgundy/40 text-gold flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-ivory-light">DRM-Free Freedom</h4>
              <p className="text-xs text-ivory/70 mt-1 leading-relaxed">
                Complete EPUB & PDF formats compatible with Kindle, Apple Books, Kobo, Android, iOS & PC.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-[#140C10] border border-burgundy/40 text-gold flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-ivory-light">Instant Digital Delivery</h4>
              <p className="text-xs text-ivory/70 mt-1 leading-relaxed">
                Direct download immediately post-checkout, with a permanent backup copy emailed straight to you.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-burgundy/20">
          {/* Brand Col with Official Logo */}
          <div className="md:col-span-4 flex flex-col">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-[4px] p-1 bg-[#160E13] border border-burgundy/40 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                <img src="/logo.svg" alt="QITAVRO Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-ivory-light uppercase leading-none group-hover:text-rose-light transition-colors">
                  QITAVRO
                </span>
                <span className="text-[9px] uppercase tracking-[0.28em] font-sans text-gold font-medium mt-1 leading-none">
                  Literary Bookstore
                </span>
              </div>
            </Link>
            <p className="mt-4 font-serif italic text-sm text-gold-light leading-relaxed">
              "A World Between the Covers."
            </p>
            <p className="mt-2 text-xs text-ivory/70 font-sans leading-relaxed max-w-sm">
              An independent literary bookstore and curated digital sanctuary designed for intentional readers.
            </p>
            <div className="mt-5 text-xs text-ivory/50 font-sans">
              Dedicated to bringing exceptional literature and distinctive voices to your private library.
            </div>
          </div>

          {/* Shop Shelves */}
          <div className="md:col-span-2">
            <h5 className="font-serif font-bold text-sm text-gold tracking-wider uppercase mb-4">
              Catalogue
            </h5>
            <ul className="space-y-2 text-xs text-ivory/70">
              <li>
                <Link to="/shop" className="hover:text-rose-light transition-colors">
                  All Editions
                </Link>
              </li>
              <li>
                <Link to="/shop?genre=Romance" className="hover:text-rose-light transition-colors">
                  Romance
                </Link>
              </li>
              <li>
                <Link to="/shop?bestseller=true" className="hover:text-rose-light transition-colors">
                  Featured Reads
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-gold text-rose-light font-semibold transition-colors">
                  Sell Your Book (₹99)
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Ethos */}
          <div className="md:col-span-3">
            <h5 className="font-serif font-bold text-sm text-gold tracking-wider uppercase mb-4">
              The Sanctuary
            </h5>
            <ul className="space-y-2 text-xs text-ivory/70">
              <li>
                <Link to="/about" className="hover:text-rose-light transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/listing-policy" className="hover:text-rose-light transition-colors">
                  Listing & Curation Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-rose-light transition-colors">
                  Buying & Selling Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Ethos */}
          <div className="md:col-span-3">
            <h5 className="font-serif font-bold text-sm text-gold tracking-wider uppercase mb-4">
              The Bookstore
            </h5>
            <ul className="space-y-2 text-xs text-ivory/70">
              <li>
                <Link to="/about" className="hover:text-rose-light transition-colors">
                  About Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-rose-light transition-colors">
                  Your Saved Shelf
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-rose-light transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/listing-policy" className="hover:text-rose-light transition-colors">
                  Listing & Grading Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-rose-light transition-colors">
                  Buying & Selling Disclaimer
                </Link>
              </li>
              <li>
                <span className="text-ivory/50">Reading Queries: curate@qitavro.com</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-burgundy/20">
              <span className="text-[11px] font-sans text-burgundy-rose">
                Literary Sanctuary • New Delhi & Global Post
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-3 sm:gap-4 mb-3 sm:mb-0">
          <p className="font-sans text-center sm:text-left">
            © {new Date().getFullYear()} QITAVRO. All rights reserved. Thoughtfully crafted for curious minds.
          </p>
          <div className="flex items-center gap-3.5 sm:gap-5 flex-wrap justify-center text-[11px] font-sans">
            <Link to="/terms" className="hover:text-rose-light transition-colors">
              Terms of Service
            </Link>
            <span className="text-ivory/30">•</span>
            <Link to="/privacy" className="hover:text-rose-light transition-colors">
              Privacy Policy
            </Link>
            <span className="text-ivory/30">•</span>
            <Link to="/listing-policy" className="hover:text-rose-light transition-colors">
              Listing Policy
            </Link>
            <span className="text-ivory/30">•</span>
            <Link to="/disclaimer" className="hover:text-rose-light transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
