import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, Feather, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-wine text-ivory border-t border-stone/20 pt-16 pb-28 sm:pb-24 lg:pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone/15">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-wine-deep border border-gold/30 text-gold flex-shrink-0">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-ivory">Editorial Curation</h4>
              <p className="text-xs text-stone-light/80 mt-1 leading-relaxed">
                Every title hand-selected for literary merit, enduring insight, and timeless resonance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-wine-deep border border-gold/30 text-gold flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-ivory">Craftsmanship & Editions</h4>
              <p className="text-xs text-stone-light/80 mt-1 leading-relaxed">
                Acid-free paper, archival cloth bindings, deckle edges, and fine typography worth keeping.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded bg-wine-deep border border-gold/30 text-gold flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-ivory">Protective Book Packaging</h4>
              <p className="text-xs text-stone-light/80 mt-1 leading-relaxed">
                Double-wrapped with organic kraft paper and reinforced corners to arrive in collector condition.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-stone/15">
          {/* Brand Col with Official Logo */}
          <div className="md:col-span-4 flex flex-col">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-[4px] p-1 bg-white/95 border border-gold/50 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                <img src="/logo.svg" alt="QITAVRO Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-ivory uppercase leading-none">
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
            <p className="mt-2 text-xs text-stone-light/75 font-sans leading-relaxed max-w-sm">
              An independent literary bookstore combining the thoughtful curation of a storied bookseller with the aesthetic devotion of a luxury print publication.
            </p>
            <div className="mt-5 text-xs text-stone-light/60 font-sans">
              Founded on the belief that what you read quietly shapes who you become.
            </div>
          </div>

          {/* Shop Shelves */}
          <div className="md:col-span-2">
            <h5 className="font-serif font-bold text-sm text-gold tracking-wider uppercase mb-4">
              Catalogue
            </h5>
            <ul className="space-y-2 text-xs text-stone-light/80">
              <li>
                <Link to="/shop" className="hover:text-gold transition-colors">
                  All Editions
                </Link>
              </li>
              <li>
                <Link to="/shop?genre=Fiction" className="hover:text-gold transition-colors">
                  Modern Fiction
                </Link>
              </li>
              <li>
                <Link to="/shop?genre=Classics" className="hover:text-gold transition-colors">
                  Timeless Classics
                </Link>
              </li>
              <li>
                <Link to="/shop?genre=Philosophy" className="hover:text-gold transition-colors">
                  Philosophy & Stoics
                </Link>
              </li>
              <li>
                <Link to="/shop?price=under-299" className="hover:text-gold transition-colors">
                  Under ₹299 Shelf
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-gold transition-colors">
                  Curated Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Reading Room */}
          <div className="md:col-span-3">
            <h5 className="font-serif font-bold text-sm text-gold tracking-wider uppercase mb-4">
              The Reading Room
            </h5>
            <ul className="space-y-2 text-xs text-stone-light/80">
              <li>
                <Link to="/reading-room" className="hover:text-gold transition-colors">
                  The Editorial Journal
                </Link>
              </li>
              <li>
                <Link to="/reading-room/the-art-of-unhurried-reading" className="hover:text-gold transition-colors">
                  The Art of Unhurried Reading
                </Link>
              </li>
              <li>
                <Link to="/reading-room/on-building-a-personal-library" className="hover:text-gold transition-colors">
                  On the Personal Sanctuary
                </Link>
              </li>
              <li>
                <Link to="/reading-room/rediscovering-stoner" className="hover:text-gold transition-colors">
                  Why John Williams' Stoner Endures
                </Link>
              </li>
              <li>
                <Link to="/reading-room/essential-reading-list-solitude" className="hover:text-gold transition-colors">
                  Readings for Solitude
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Ethos */}
          <div className="md:col-span-3">
            <h5 className="font-serif font-bold text-sm text-gold tracking-wider uppercase mb-4">
              The Bookstore
            </h5>
            <ul className="space-y-2 text-xs text-stone-light/80">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-gold transition-colors">
                  Your Saved Shelf
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gold transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/listing-policy" className="hover:text-gold transition-colors">
                  Listing & Grading Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-gold transition-colors">
                  Buying & Selling Disclaimer
                </Link>
              </li>
              <li>
                <span className="text-stone-light/60">Reading Queries: curate@qitavro.com</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-stone/15">
              <span className="text-[11px] font-sans text-rose">
                Literary Sanctuary • New Delhi & Global Post
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-light/60 gap-3 sm:gap-4 mb-3 sm:mb-0">
          <p className="font-sans text-center sm:text-left">
            © {new Date().getFullYear()} QITAVRO. All rights reserved. Thoughtfully crafted for curious minds.
          </p>
          <div className="flex items-center gap-3.5 sm:gap-5 flex-wrap justify-center text-[11px] font-sans">
            <Link to="/terms" className="hover:text-stone-light transition-colors">
              Terms of Service
            </Link>
            <span className="text-stone-light/30">•</span>
            <Link to="/privacy" className="hover:text-stone-light transition-colors">
              Privacy Policy
            </Link>
            <span className="text-stone-light/30">•</span>
            <Link to="/listing-policy" className="hover:text-stone-light transition-colors">
              Listing Policy
            </Link>
            <span className="text-stone-light/30">•</span>
            <Link to="/disclaimer" className="hover:text-stone-light transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
