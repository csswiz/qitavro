import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import booksData from '../data/books.json';
import BookCoverImage from './BookCoverImage';

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setSearchTerm('');
      setResults([]);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setResults([]);
      return;
    }

    const filtered = booksData.filter((book) => {
      const matchTitle = book.title.toLowerCase().includes(term);
      const matchAuthor = book.author.toLowerCase().includes(term);
      const matchCategory = book.category.toLowerCase().includes(term);
      const matchPublisher = book.publisher?.toLowerCase().includes(term);
      return matchTitle || matchAuthor || matchCategory || matchPublisher;
    });

    setResults(filtered);
  }, [searchTerm]);

  const handleSelectTag = (genre) => {
    setSearchTerm(genre);
  };

  const handleBookClick = (slug) => {
    onClose();
    navigate(`/book/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-charcoal/80 backdrop-blur-sm transition-all duration-300">
      <div 
        className="w-full bg-ivory border-b border-stone/50 shadow-2xl pt-3 sm:pt-4 pb-5 sm:pb-6 px-3 sm:px-8 max-h-[92vh] sm:max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-stone">
            <span className="font-serif italic text-xs sm:text-sm text-wine tracking-wide">
              Search the QITAVRO Catalogue
            </span>
            <button
              onClick={onClose}
              className="p-1 sm:p-1.5 text-charcoal/70 hover:text-burgundy rounded hover:bg-stone/30 transition-colors flex items-center gap-1.5 text-xs font-sans font-medium"
              aria-label="Close search"
            >
              <span className="hidden sm:inline text-charcoal/50">Press ESC or</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-3 sm:mt-4 flex items-center">
            <Search className="absolute left-3.5 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-burgundy pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search title, author, genre..."
              className="w-full bg-white border border-stone focus:border-burgundy focus:ring-1 focus:ring-burgundy rounded py-2.5 sm:py-3.5 pl-10 sm:pl-12 pr-9 sm:pr-10 text-charcoal text-sm sm:text-base font-serif placeholder:font-sans placeholder:text-stone-dark placeholder:text-xs sm:placeholder:text-sm outline-none transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 p-1 text-charcoal/40 hover:text-burgundy transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Suggestions Pill Tags (Swipeable on mobile) */}
          <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] sm:text-xs text-charcoal/60 font-sans flex-shrink-0">Curations:</span>
            {['Classics', 'Philosophy', 'Fiction', 'Self Help', 'Carlos Ruiz Zafón', 'Under ₹299'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag === 'Under ₹299' ? '299' : tag)}
                className="text-[11px] sm:text-xs font-sans px-2.5 py-1 rounded bg-stone/40 hover:bg-burgundy hover:text-ivory text-charcoal transition-colors border border-stone flex-shrink-0"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Container */}
          <div className="mt-4 sm:mt-6 overflow-y-auto max-h-[55vh] sm:max-h-[50vh] pr-1 sm:pr-2 divide-y divide-stone/40">
            {searchTerm.trim() ? (
              results.length > 0 ? (
                <div>
                  <div className="pb-2 text-[10px] sm:text-xs font-sans text-charcoal/60 uppercase tracking-widest font-semibold flex justify-between items-center">
                    <span>{results.length} Editions Discovered</span>
                    <Link
                      to={`/shop?search=${encodeURIComponent(searchTerm)}`}
                      onClick={onClose}
                      className="text-burgundy hover:underline flex items-center gap-1 normal-case tracking-normal text-xs"
                    >
                      View all in Shop <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                    {results.slice(0, 6).map((book) => (
                      <div
                        key={book.id}
                        onClick={() => handleBookClick(book.slug)}
                        className="group flex gap-3 p-2 sm:p-2.5 rounded bg-white/70 hover:bg-white border border-stone/50 hover:border-burgundy/40 cursor-pointer transition-all shadow-subtle hover:shadow"
                      >
                        <div className="w-12 sm:w-14 flex-shrink-0">
                          <BookCoverImage
                            src={book.image}
                            alt={book.title}
                            title={book.title}
                            author={book.author}
                            category={book.category}
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <span className="text-[9px] uppercase font-sans tracking-widest text-burgundy font-medium">
                            {book.category}
                          </span>
                          <h4 className="font-serif font-semibold text-charcoal text-xs sm:text-sm leading-snug group-hover:text-burgundy transition-colors truncate">
                            {book.title}
                          </h4>
                          <p className="font-serif italic text-[11px] text-charcoal/70 truncate">
                            {book.author}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="font-serif font-bold text-wine text-xs">
                              ₹{book.price}
                            </span>
                            {book.originalPrice && (
                              <span className="text-[10px] text-charcoal/50 line-through">
                                ₹{book.originalPrice}
                              </span>
                            )}
                            <div className="flex items-center text-gold text-[10px] ml-auto">
                              <Star className="w-3 h-3 fill-gold mr-0.5" />
                              <span>{book.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 sm:py-12 text-center">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-charcoal/30 mb-2 stroke-[1.2]" />
                  <p className="font-serif text-base sm:text-lg text-charcoal">No editions found matching "{searchTerm}"</p>
                  <p className="font-sans text-xs text-charcoal/60 mt-1 max-w-sm mx-auto">
                    Try browsing by genre, author surname, or explore our curated collections on the shop page.
                  </p>
                  <div className="mt-4">
                    <Link
                      to="/shop"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-burgundy hover:bg-wine text-ivory text-xs font-sans rounded transition-colors"
                    >
                      Browse Entire Catalogue
                    </Link>
                  </div>
                </div>
              )
            ) : (
              <div className="py-6 text-center text-charcoal/60 font-serif italic text-xs sm:text-sm">
                Begin typing to search our curated literature, authors, and philosophical editions.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Background click to close */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />
    </div>
  );
}
