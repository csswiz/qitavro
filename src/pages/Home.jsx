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
import MacbookScrollDemo from '../components/macbook-scroll-demo';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeModalBook, setActiveModalBook] = useState(null);

  // Derived book sets
  const bestsellers = booksData.filter((b) => b.bestseller).slice(0, 8);
  const featuredBook = booksData.find((b) => b.slug === 'the-shadow-of-the-wind') || booksData[0] || null;
  const editorsPicks = booksData
    .filter((b) => b.featured && b.id !== featuredBook?.id)
    .slice(0, 4);

  const featuredCollections = collectionsData.slice(0, 6);
  const latestArticles = articlesData.slice(0, 3);

  return (
    <div className="bg-ivory text-charcoal min-h-screen">
      {/* 4.A HERO SECTION - Aceternity UI Macbook Scroll */}
      <MacbookScrollDemo />

      {/* 4.B BRAND INTRODUCTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-ivory-light border-b border-stone/60">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-burgundy">
            Our Literary Philosophy
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-charcoal mt-2 mb-4 sm:mb-6">
            More Than Just Books.
          </h2>
          <div className="w-10 sm:w-12 h-[2px] bg-gold mx-auto mb-4 sm:mb-6" />
          <p className="font-serif text-base sm:text-xl text-charcoal/85 leading-relaxed italic">
            "In an age of relentless scrolling and algorithmic noise, reading is an act of radical restoration. At QITAVRO, we do not warehouse thousands of fleeting commodities. We curate volumes that invite slow contemplation, books that become steadfast companions, and editions crafted to endure upon your private shelves."
          </p>
          <div className="mt-6 sm:mt-8 flex items-center justify-center">
            <Link
              to="/about"
              className="text-xs font-sans uppercase tracking-widest font-semibold text-burgundy hover:text-wine inline-flex items-center gap-1.5 transition-colors"
            >
              Read Our Full Curatorial Manifesto <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4.C FEATURED COLLECTIONS */}
      <section className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-4 h-[1.5px] bg-burgundy" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-burgundy font-semibold">
                Curated Themes
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-charcoal">
              Explore the World of Literature.
            </h2>
          </div>
          <Link
            to="/collections"
            className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-burgundy hover:text-wine transition-colors"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
      <section className="py-12 sm:py-16 md:py-20 bg-white/50 border-y border-stone/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 px-1 sm:px-0">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-4 h-[1.5px] bg-gold" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-wine font-semibold">
                  Most Beloved Works
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-charcoal">
                Readers' Favourites
              </h2>
            </div>
            <Link
              to="/shop?bestseller=true"
              className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-burgundy hover:text-wine transition-colors"
            >
              <span>Explore All Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <BookGrid books={bestsellers} />
        </div>
      </section>

      {/* 4.E FEATURED BOOK (Distinctive Editorial Feature in Burgundy) */}
      {featuredBook && (
        <section className="bg-burgundy text-ivory py-12 sm:py-16 md:py-20 relative overflow-hidden border-y border-burgundy-dark">
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
                  <div className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 bg-gold text-charcoal font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded shadow">
                    Book of the Season
                  </div>
                </div>
              </div>

              {/* Right: Editorial Story & Recommendation */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
                  Editorial Spotlight
                </span>

                <h2 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-ivory mt-1.5 sm:mt-2 leading-tight">
                  {featuredBook.title}
                </h2>

                <p className="font-serif italic text-base sm:text-lg text-gold-light mt-1">
                  By {featuredBook.author}
                </p>

                <div className="flex items-center gap-2.5 sm:gap-3 my-3 sm:my-4">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-gold" />
                    ))}
                  </div>
                  <span className="text-xs font-sans text-stone-light">
                    {featuredBook.rating} Rating • ({featuredBook.reviews?.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Editorial Recommendation Quote */}
                <div className="my-2.5 sm:my-3 p-3.5 sm:p-4 bg-wine/50 border-l-2 border-gold rounded-r text-xs sm:text-sm font-serif italic text-stone-light leading-relaxed">
                  "{featuredBook.curatorNote || featuredBook.description}"
                </div>

                {/* Why We Recommend This Book */}
                <div className="mt-2 text-xs sm:text-sm font-sans text-stone-light/90 leading-relaxed space-y-1 sm:space-y-2">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-ivory">
                    Why We Recommend This Book
                  </h4>
                  <p>
                    {featuredBook.whyRecommend || featuredBook.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-ivory">
                      ₹{featuredBook.price}
                    </span>
                    {featuredBook.originalPrice && (
                      <span className="font-sans text-xs sm:text-sm text-stone-light/60 line-through">
                        ₹{featuredBook.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => addToCart(featuredBook, 1)}
                      className="flex-1 sm:flex-none px-5 sm:px-6 py-3 bg-gold hover:bg-gold-light active:scale-98 text-charcoal font-sans text-xs uppercase tracking-widest font-semibold rounded inline-flex items-center justify-center gap-2 transition-colors shadow text-center"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>

                    <Link
                      to={`/book/${featuredBook.slug}`}
                      className="flex-1 sm:flex-none px-5 sm:px-6 py-3 bg-white/10 hover:bg-white/20 text-ivory border border-stone-light/40 rounded font-sans text-xs uppercase tracking-widest font-semibold transition-colors text-center"
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
      <section className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 px-1 sm:px-0">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-4 h-[1.5px] bg-burgundy" />
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-burgundy font-semibold">
                Rare Gems & Curated Volumes
              </span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-charcoal">
              Chosen With Intention.
            </h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-serif italic text-charcoal/70">
              Underrated masterpieces, quiet revelations, and literary gems curated by our editorial desk.
            </p>
          </div>
          <Link
            to="/shop?featured=true"
            className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-burgundy hover:text-wine transition-colors"
          >
            <span>Browse All Editor's Picks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <BookGrid books={editorsPicks} />
      </section>

      {/* 4.G THE READING ROOM (Magazine-style platform) */}
      <section className="py-12 sm:py-16 md:py-24 bg-ivory-light border-t border-stone/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-4 h-[1.5px] bg-wine" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest text-wine font-semibold">
                  The Editorial Platform
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-charcoal">
                The Reading Room
              </h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-serif italic text-charcoal/70">
                Reading guides, literary essays, and thoughtful examinations of the contemplative life.
              </p>
            </div>
            <Link
              to="/reading-room"
              className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold text-burgundy hover:text-wine transition-colors"
            >
              <span>Enter The Reading Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Magazine Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col bg-white rounded border border-stone/60 overflow-hidden shadow-subtle hover:shadow-book transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-wine/10">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-charcoal/80 backdrop-blur-sm text-gold-light text-[8px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-sans">
                    {article.category}
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="text-[10px] sm:text-[11px] font-sans text-charcoal/50 mb-1.5 sm:mb-2 flex items-center gap-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link to={`/reading-room/${article.slug}`}>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-charcoal group-hover:text-burgundy transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-charcoal/70 font-sans mt-2.5 line-clamp-3 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>

                  <div className="mt-4 sm:mt-5 pt-3 border-t border-stone/40 flex items-center justify-between">
                    <span className="font-serif italic text-xs text-charcoal/60 truncate max-w-[60%]">
                      By {article.author}
                    </span>
                    <Link
                      to={`/reading-room/${article.slug}`}
                      className="text-xs font-sans font-semibold text-burgundy group-hover:text-wine inline-flex items-center gap-1 flex-shrink-0"
                    >
                      Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
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
