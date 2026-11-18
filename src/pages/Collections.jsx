import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Feather } from 'lucide-react';
import collectionsData from '../data/collections.json';
import booksData from '../data/books.json';
import BookCoverImage from '../components/BookCoverImage';

export default function Collections() {
  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-white/60 border-b border-stone/60 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-burgundy font-semibold">
              Thematic Literature
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-charcoal mt-1">
              Curated Collections
            </h1>
            <p className="mt-2 sm:mt-3 font-serif italic text-sm sm:text-base md:text-lg text-charcoal/80 leading-relaxed">
              We group literature not by commercial categories, but by moods, philosophical depths, and seasons of life. Discover thoughtful shelves designed for intentional exploration.
            </p>
          </div>
        </div>
      </div>

      {/* Main Collections List */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8 sm:space-y-16">
        {collectionsData.map((collection, index) => {
          // Resolve matching books
          const shelfBooks = booksData.filter((b) => collection.bookIds.includes(b.id)).slice(0, 4);
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={collection.id}
              className="bg-white/70 rounded-[3px] border border-stone/70 p-4 sm:p-8 shadow-subtle hover:shadow-book transition-shadow"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Left/Right Text Info */}
                <div className={`lg:col-span-5 flex flex-col ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-widest text-burgundy font-semibold">
                      Curated Shelf #{index + 1}
                    </span>
                    <span className="text-charcoal/30">•</span>
                    <span className="text-[9px] sm:text-[10px] font-sans text-charcoal/60 uppercase tracking-wider">
                      {collection.bookIds.length} Editions
                    </span>
                  </div>

                  <h2 className="font-serif font-bold text-xl sm:text-3xl text-charcoal leading-tight">
                    {collection.title}
                  </h2>

                  <p className="font-serif italic text-xs sm:text-sm text-gold mt-1">
                    "{collection.tagline}"
                  </p>

                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-serif text-charcoal/80 leading-relaxed">
                    {collection.intro}
                  </p>

                  <p className="mt-2 text-xs font-sans text-charcoal/60 leading-relaxed hidden sm:block">
                    {collection.description}
                  </p>

                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-stone/50">
                    <Link
                      to={`/shop?collection=${collection.slug}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-burgundy hover:bg-wine active:scale-98 text-ivory text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle text-center"
                    >
                      <span>Explore Entire Shelf ({collection.bookIds.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right/Left Books Preview Grid */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}>
                  {shelfBooks.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                      {shelfBooks.map((book) => (
                        <Link
                          key={book.id}
                          to={`/book/${book.slug}`}
                          className="group/book flex flex-col"
                        >
                          <div className="transition-transform duration-300 group-hover/book:-translate-y-1">
                            <BookCoverImage
                              src={book.image}
                              alt={book.title}
                              title={book.title}
                              author={book.author}
                              category={book.category}
                              aspectRatio="aspect-[2/3]"
                            />
                          </div>
                          <h4 className="mt-2 font-serif font-semibold text-xs text-charcoal truncate group-hover/book:text-burgundy">
                            {book.title}
                          </h4>
                          <span className="font-serif italic text-[10px] sm:text-[11px] text-charcoal/70 truncate">
                            {book.author}
                          </span>
                          <span className="font-serif font-bold text-wine text-xs mt-0.5">
                            ₹{book.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] sm:aspect-[2.2/1] rounded overflow-hidden border border-stone/50 bg-stone/20 flex items-center justify-center p-6 text-center">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 filter saturate-50"
                      />
                      <div className="relative z-10 bg-ivory/95 backdrop-blur-sm border border-stone/60 px-4 py-2 rounded text-xs font-serif italic text-charcoal shadow-subtle">
                        Awaiting your curated editions for this shelf
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
