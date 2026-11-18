import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Feather, Star, Heart, Eye, ShoppingBag } from 'lucide-react';
import booksData from '../data/books.json';
import collectionsData from '../data/collections.json';
import articlesData from '../data/articles.json';
import BookGrid from '../components/BookGrid';
import BookCoverImage from '../components/BookCoverImage';
import CollectionCard from '../components/CollectionCard';
import Newsletter from '../components/Newsletter';
import QuickViewModal from '../components/QuickViewModal';
import HeroDragon3D from '../components/HeroDragon3D';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeModalBook, setActiveModalBook] = useState(null);

  // Derived book sets
  const bestsellers = booksData.filter((b) => b.bestseller).slice(0, 8);
  const featuredBook = booksData[0] || null;
  const editorsPicks = booksData
    .filter((b) => b.featured && b.id !== featuredBook?.id)
    .slice(0, 4);

  const featuredCollections = collectionsData.slice(0, 6);
  const latestArticles = articlesData.slice(0, 3);

  return (
    <div className="bg-black-obsidian text-ivory-light min-h-screen">
      {/* 4.A HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-24 border-b border-black-border">
        {/* Live 3D Mythic Guardian Dragon (Translates smoothly from top to bottom on scroll) */}
        <HeroDragon3D modelUrl="/models/dragon.glb" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-5 sm:w-6 h-[1.5px] bg-rose-light" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
                  The Art of Reading
                </span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-ivory-light leading-[1.12] sm:leading-[1.08] tracking-tight">
                "A World Between the Covers."
              </h1>

              <p className="mt-4 sm:mt-6 text-sm sm:text-lg font-serif italic text-ivory/80 leading-relaxed max-w-xl">
                Discover stories, timeless classics and extraordinary ideas, thoughtfully curated for curious minds.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light rounded font-sans text-xs uppercase tracking-widest font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-subtle hover:shadow border border-burgundy-rose/40 text-center"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 bg-[#181015] hover:bg-[#20131B] text-ivory-light border border-burgundy/40 rounded font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-subtle text-center"
                >
                  Discover Our Story
                </Link>
              </div>

              {/* Sub-feature stats & promise */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-burgundy/25 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg">
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">eBook</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">Instant Access</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">Ace</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">Acclaimed Author</span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-xl sm:text-2xl text-gold">100%</span>
                  <span className="text-[9px] sm:text-[11px] font-sans text-ivory/60 uppercase tracking-wider">Literary Devotion</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Editorial Photography / Visual */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-[280px] sm:max-w-md lg:max-w-none">
                {/* Book Frame with Shadow and Glow */}
                <div className="relative aspect-[4/5] rounded-[4px] overflow-hidden shadow-book-hover border-2 sm:border-2 border-burgundy/50 bg-[#140D12]">
                  <img
                    src="/images/hero/hero-reading.svg"
                    alt="QITAVRO Reading Sanctuary"
                    className="w-full h-full object-cover"
                  />

                  {/* Subtle Corner Foil Accent */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#140C10]/90 backdrop-blur-md border border-gold/40 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded text-ivory-light text-right shadow-sm">
                    <span className="block font-serif italic text-[11px] sm:text-xs text-gold">
                      "Stories worth keeping."
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-sans uppercase tracking-widest text-ivory/70">
                      QITAVRO EDITORIAL
                    </span>
                  </div>
                </div>

                {/* Overlaid Floating Card Accent */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-[#160E13] p-4 rounded border border-burgundy/40 shadow-2xl items-center gap-3.5 max-w-xs text-ivory-light">
                  <div className="w-12 h-12 bg-[#201018] rounded flex items-center justify-center flex-shrink-0 border border-burgundy/40">
                    <Feather className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-ivory-light">
                      Hand-Selected Editions
                    </h4>
                    <p className="text-[11px] font-sans text-ivory/70 mt-0.5 leading-snug">
                      Deckle-edge paper, archival cloths, and translations that honor the author's soul.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4.B BRAND INTRODUCTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#10090D] border-b border-burgundy/25">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
            Our Literary Philosophy
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-ivory-light mt-2 mb-4 sm:mb-6">
            More Than Just Books.
          </h2>
          <div className="w-10 sm:w-12 h-[2px] bg-gold mx-auto mb-4 sm:mb-6" />
          <p className="font-serif text-base sm:text-xl text-ivory/90 leading-relaxed italic">
            "In an age of relentless scrolling and algorithmic noise, reading is an act of radical restoration. At QITAVRO, we do not warehouse thousands of fleeting commodities. We curate volumes that invite slow contemplation, books that become steadfast companions, and editions crafted to endure upon your private shelves."
          </p>
          <div className="mt-6 sm:mt-8 flex items-center justify-center">
            <Link
              to="/about"
              className="text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light inline-flex items-center gap-1.5 transition-colors"
            >
              Read Our Full Curatorial Manifesto <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4.C FEATURED COLLECTIONS */}
      <section className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-4 h-[1.5px] bg-rose-light" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-rose-light font-semibold">
                Curated Themes
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-ivory-light">
              Explore the World of Literature.
            </h2>
          </div>
          <Link
            to="/collections"
            className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light transition-colors"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold" />
          </Link>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* 4.D BESTSELLING BOOKS */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#100A0E] border-y border-burgundy/25">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 px-1 sm:px-0">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-4 h-[1.5px] bg-gold" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-gold font-semibold">
                  Most Beloved Works
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-ivory-light">
                Readers' Favourites
              </h2>
            </div>
            <Link
              to="/shop?bestseller=true"
              className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light transition-colors"
            >
              <span>Explore All Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>

          <BookGrid books={bestsellers} />
        </div>
      </section>

      {/* 4.E FEATURED BOOK (Velvet Burgundy & Dark Black Editorial Spotlight) */}
      {featuredBook && (
        <section className="bg-gradient-to-r from-[#200A11] via-[#35121D] to-[#16070D] text-ivory-light py-12 sm:py-16 md:py-20 relative overflow-hidden border-y border-burgundy/40 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">

              {/* Left: Large Book Cover */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[220px] sm:max-w-[320px] shadow-2xl relative">
                  <BookCoverImage
                    src={featuredBook.image}
                    alt={featuredBook.title}
                    title={featuredBook.title}
                    author={featuredBook.author}
                    category={featuredBook.category}
                    aspectRatio="aspect-[2/3]"
                  />
                  <div className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 bg-gold text-[#140D12] font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded shadow-lg">
                    Book of the Season
                  </div>
                </div>
              </div>

              {/* Right: Editorial Story & Recommendation */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
                  Editorial Spotlight
                </span>

                <h2 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-ivory-light mt-1.5 sm:mt-2 leading-tight">
                  {featuredBook.title}
                </h2>

                <p className="font-serif italic text-base sm:text-lg text-gold mt-1">
                  By {featuredBook.author}
                </p>

                <div className="flex items-center gap-2.5 sm:gap-3 my-3 sm:my-4">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold" />
                    ))}
                  </div>
                  <span className="text-xs font-sans text-ivory/70">
                    {featuredBook.rating} Rating • ({featuredBook.reviews?.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Editorial Recommendation Quote */}
                <div className="my-2.5 sm:my-3 p-3.5 sm:p-4 bg-[#14070D]/80 border-l-2 border-gold rounded-r text-xs sm:text-sm font-serif italic text-ivory/90 leading-relaxed">
                  "{featuredBook.curatorNote || featuredBook.description}"
                </div>

                {/* Why We Recommend This Book */}
                <div className="mt-2 text-xs sm:text-sm font-sans text-ivory/80 leading-relaxed space-y-1 sm:space-y-2">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-ivory-light">
                    Why We Recommend This Book
                  </h4>
                  <p>
                    {featuredBook.whyRecommend || featuredBook.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-gold">
                      ₹{featuredBook.price}
                    </span>
                    {featuredBook.originalPrice && (
                      <span className="font-sans text-xs sm:text-sm text-ivory/50 line-through">
                        ₹{featuredBook.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => addToCart(featuredBook, 1)}
                      className="flex-1 sm:flex-none px-5 sm:px-6 py-3 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light font-sans text-xs uppercase tracking-widest font-semibold rounded inline-flex items-center justify-center gap-2 transition-colors shadow border border-burgundy-rose/40 text-center"
                    >
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>{featuredBook.isEbook ? 'Get eBook Now' : 'Add to Bag'}</span>
                    </button>

                    <Link
                      to={`/book/${featuredBook.slug}`}
                      className="flex-1 sm:flex-none px-5 sm:px-6 py-3 bg-[#1C0D15]/80 hover:bg-[#2A1420] text-ivory-light border border-burgundy/40 rounded font-sans text-xs uppercase tracking-widest font-semibold transition-colors text-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4.F EDITOR'S PICKS */}
      {editorsPicks.length > 0 && (
        <section className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 px-1 sm:px-0">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-4 h-[1.5px] bg-rose-light" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-rose-light font-semibold">
                  Rare Gems & Curated Volumes
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-ivory-light">
                Chosen With Intention.
              </h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-serif italic text-ivory/70">
                Underrated masterpieces, quiet revelations, and literary gems curated by our editorial desk.
              </p>
            </div>
            <Link
              to="/shop?featured=true"
              className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light transition-colors"
            >
              <span>Browse All Editor's Picks</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>

          <BookGrid books={editorsPicks} />
        </section>
      )}

      {/* 4.G THE READING ROOM (Magazine-style platform) */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#10090D] border-t border-burgundy/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-4 h-[1.5px] bg-gold" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-gold font-semibold">
                  The Editorial Platform
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-ivory-light">
                The Reading Room
              </h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-serif italic text-ivory/70">
                Reading guides, literary essays, and thoughtful examinations of the contemplative life.
              </p>
            </div>
            <Link
              to="/reading-room"
              className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light transition-colors"
            >
              <span>Enter The Reading Room</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>

          {/* Magazine Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col bg-[#140D12] rounded-[4px] border border-burgundy/30 overflow-hidden shadow-subtle hover:border-burgundy/70 hover:shadow-[0_12px_30px_-8px_rgba(101,46,60,0.35)] transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black-obsidian">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#140C10]/85 backdrop-blur-sm text-gold text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-sans border border-burgundy/40">
                    {article.category}
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="text-[10px] sm:text-[11px] font-sans text-ivory/50 mb-1.5 sm:mb-2 flex items-center gap-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link to={`/reading-room/${article.slug}`}>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-ivory-light group-hover:text-rose-light transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-ivory/70 font-sans mt-2.5 line-clamp-3 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>

                  <div className="mt-4 sm:mt-5 pt-3 border-t border-burgundy/25 flex items-center justify-between">
                    <span className="font-serif italic text-xs text-ivory/60 truncate max-w-[60%]">
                      By {article.author}
                    </span>
                    <Link
                      to={`/reading-room/${article.slug}`}
                      className="text-xs font-sans font-semibold text-rose-light group-hover:text-ivory-light inline-flex items-center gap-1 flex-shrink-0"
                    >
                      Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-gold" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4.H NEWSLETTER */}
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
