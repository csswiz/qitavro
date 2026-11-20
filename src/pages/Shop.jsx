import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, BookOpen, RotateCcw, MessageSquare, Tag, ArrowRight } from 'lucide-react';
import booksData from '../data/books.json';
import collectionsData from '../data/collections.json';
import BookGrid from '../components/BookGrid';
import FilterSidebar from '../components/FilterSidebar';
import { WHATSAPP_NUMBER, DISPLAY_WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State from URL or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [priceFilter, setPriceFilter] = useState(searchParams.get('price') || '');
  const [ratingFilter, setRatingFilter] = useState(Number(searchParams.get('rating')) || 0);
  const [onlyBestsellers, setOnlyBestsellers] = useState(searchParams.get('bestseller') === 'true');
  const [onlyFeatured, setOnlyFeatured] = useState(searchParams.get('featured') === 'true');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [visibleCount, setVisibleCount] = useState(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if URL search parameters change
  const collectionParam = searchParams.get('collection');

  useEffect(() => {
    if (searchParams.get('search')) setSearchTerm(searchParams.get('search'));
    if (searchParams.get('genre')) setSelectedGenre(searchParams.get('genre'));
    if (searchParams.get('price')) setPriceFilter(searchParams.get('price'));
    if (searchParams.get('bestseller') === 'true') setOnlyBestsellers(true);
    if (searchParams.get('featured') === 'true') setOnlyFeatured(true);
  }, [searchParams]);

  // Unique genres from data
  const genres = useMemo(() => {
    return Array.from(new Set(booksData.map((b) => b.category))).sort();
  }, []);

  // Matched collection if collection query param present
  const activeCollection = useMemo(() => {
    if (!collectionParam) return null;
    return collectionsData.find((c) => c.slug === collectionParam);
  }, [collectionParam]);

  // Filtering logic
  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      // Collection filter
      if (activeCollection && !activeCollection.bookIds.includes(book.id)) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(term);
        const matchesAuthor = book.author.toLowerCase().includes(term);
        const matchesCategory = book.category.toLowerCase().includes(term);
        const matchesPublisher = book.publisher?.toLowerCase().includes(term);
        if (!matchesTitle && !matchesAuthor && !matchesCategory && !matchesPublisher) {
          return false;
        }
      }

      // Genre
      if (selectedGenre && book.category !== selectedGenre) {
        return false;
      }

      // Price
      if (priceFilter === 'under-299' && book.price > 299) return false;
      if (priceFilter === '300-399' && (book.price < 300 || book.price > 399)) return false;
      if (priceFilter === 'above-400' && book.price < 400) return false;

      // Rating
      if (ratingFilter > 0 && book.rating < ratingFilter) return false;

      // Toggles
      if (onlyBestsellers && !book.bestseller) return false;
      if (onlyFeatured && !book.featured) return false;
      if (onlyInStock && (!book.stock || book.stock <= 0)) return false;

      return true;
    });
  }, [
    activeCollection,
    searchTerm,
    selectedGenre,
    priceFilter,
    ratingFilter,
    onlyBestsellers,
    onlyFeatured,
    onlyInStock,
  ]);

  // Sorting logic
  const sortedBooks = useMemo(() => {
    const list = [...filteredBooks];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating || (b.reviews || 0) - (a.reviews || 0));
      case 'newest':
        return list.sort((a, b) => new Date(b.publicationDate || 0) - new Date(a.publicationDate || 0));
      case 'popularity':
      default:
        return list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
  }, [filteredBooks, sortBy]);

  // Paginated books for Load More
  const visibleBooks = useMemo(() => {
    return sortedBooks.slice(0, visibleCount);
  }, [sortedBooks, visibleCount]);

  const activeFiltersCount = [
    Boolean(selectedGenre),
    Boolean(priceFilter),
    Boolean(ratingFilter > 0),
    Boolean(onlyBestsellers),
    Boolean(onlyFeatured),
    Boolean(onlyInStock),
    Boolean(activeCollection),
    Boolean(searchTerm),
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0;

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setPriceFilter('');
    setRatingFilter(0);
    setOnlyBestsellers(false);
    setOnlyFeatured(false);
    setOnlyInStock(false);
    setSearchParams({});
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="bg-black-obsidian text-ivory-light min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#120C10] border-b border-burgundy/25 py-8 sm:py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
              The Digital Sanctuary
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-ivory-light mt-1">
              {activeCollection ? activeCollection.title : 'The eBook Catalogue'}
            </h1>
            <p className="mt-2 sm:mt-3 font-serif italic text-sm sm:text-base md:text-lg text-ivory/80 leading-relaxed">
              {activeCollection
                ? activeCollection.intro
                : "Discover exclusive digital editions, evocative romance, and compelling stories by acclaimed independent voices. Available for instant download."}
            </p>
          </div>

          {/* Search bar inside Shop */}
          <div className="mt-6 sm:mt-8 max-w-xl relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-light pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by title, author, or keyword..."
              className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light focus:ring-1 focus:ring-rose-light rounded py-2.5 pl-10 pr-9 text-xs sm:text-sm font-sans text-ivory-light outline-none placeholder:text-ivory/40 transition-colors shadow-subtle"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ivory/40 hover:text-rose-light"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Genre Pills (Horizontally scrollable with smooth touch swiping) */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedGenre('')}
              className={`text-xs font-sans px-3 py-1.5 rounded flex-shrink-0 transition-colors ${
                !selectedGenre && !activeCollection
                  ? 'bg-burgundy text-ivory-light font-medium shadow-sm border border-burgundy-rose/40'
                  : 'bg-[#181015] hover:bg-[#20131B] text-ivory/80 hover:text-rose-light border border-burgundy/25'
              }`}
            >
              All Genres
            </button>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g === selectedGenre ? '' : g)}
                className={`text-xs font-sans px-3 py-1.5 rounded flex-shrink-0 transition-colors ${
                  selectedGenre === g
                    ? 'bg-burgundy text-ivory-light font-medium shadow-sm border border-burgundy-rose/40'
                    : 'bg-[#181015] hover:bg-[#20131B] text-ivory/80 hover:text-rose-light border border-burgundy/25'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Highlight Banner: How to Buy on WhatsApp */}
        <div className="mb-6 p-4 sm:p-5 rounded-[6px] bg-gradient-to-r from-[#181015] via-[#24101A] to-[#181015] border-2 border-burgundy/60 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center flex-shrink-0 text-[#25D366] mt-0.5">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base text-ivory-light">
                  Direct Acquisition via WhatsApp
                </span>
                <span className="text-[9px] uppercase tracking-wider font-sans font-semibold px-2 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30">
                  Instant Team Support
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-ivory/80 mt-1 leading-relaxed max-w-2xl">
                To acquire any book from our catalogue, simply connect with our curatorial desk on WhatsApp. We provide verified UPI / card payment coordination and immediate digital delivery straight to your email and WhatsApp!
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hi QITAVRO Team! 👋 I would like to inquire about purchasing books from your collection. Please guide me.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black font-sans text-xs uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-all shadow-md flex-shrink-0 text-center"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
          </a>
        </div>

        {/* Sell Your Book on QITAVRO for ₹99 Promotion */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-[6px] bg-[#140D12] border border-gold/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#201018] flex items-center justify-center text-gold border border-gold/40 flex-shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-xs sm:text-sm text-ivory-light block">
                Have books to sell? List them on QITAVRO for ₹99
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans text-ivory/60">
                Flat one-time fee • 0% sales commission • Inquiries routed directly to your WhatsApp.
              </span>
            </div>
          </div>
          <Link
            to="/sell"
            className="px-4 py-2 bg-burgundy hover:bg-burgundy-light text-ivory-light rounded text-xs font-sans uppercase tracking-wider font-semibold border border-burgundy-rose/40 flex items-center gap-1.5 transition-colors flex-shrink-0"
          >
            <span>List Book (₹99)</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold" />
          </Link>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-burgundy/25 gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-3 py-2 bg-[#160E13] border border-burgundy/40 rounded text-xs font-sans font-medium flex items-center gap-2 hover:border-burgundy transition-colors text-ivory-light active:bg-[#20131B]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-rose-light" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-4 h-4 rounded-full bg-burgundy text-ivory-light text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <span className="text-xs font-sans text-ivory/70">
              Showing <strong className="text-ivory-light font-semibold">{visibleBooks.length}</strong> of{' '}
              <strong className="text-ivory-light font-semibold">{sortedBooks.length}</strong> editions
            </span>
          </div>

          {/* Sorting */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <span className="text-xs font-sans text-ivory/60 uppercase tracking-wider hidden sm:inline">
              Sort By:
            </span>
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-[#160E13] border border-burgundy/40 text-xs font-sans py-2 pl-3 pr-8 rounded text-ivory-light focus:border-rose-light outline-none cursor-pointer"
              >
                <option value="popularity">Popularity (Readers' Choice)</option>
                <option value="rating">Highest Literary Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="mb-5 flex items-center gap-2 flex-wrap bg-[#160E13] p-2 sm:p-2.5 rounded border border-burgundy/30">
            <span className="text-[11px] font-sans text-ivory/60">Active:</span>
            {activeCollection && (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans bg-[#2A0E17] text-rose-light border border-burgundy/40 px-2 py-0.5 rounded">
                Shelf: {activeCollection.title}
                <button
                  onClick={() => {
                    const next = new URLSearchParams(searchParams);
                    next.delete('collection');
                    setSearchParams(next);
                  }}
                  className="hover:text-gold p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedGenre && (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans bg-burgundy text-ivory-light border border-burgundy-rose/40 px-2 py-0.5 rounded">
                Genre: {selectedGenre}
                <button onClick={() => setSelectedGenre('')} className="hover:text-gold p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceFilter && (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans bg-[#201018] text-gold border border-burgundy/40 px-2 py-0.5 rounded">
                Price: {priceFilter === 'under-299' ? 'Under ₹299' : priceFilter}
                <button onClick={() => setPriceFilter('')} className="hover:text-rose-light p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {ratingFilter > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans bg-[#201018] text-gold border border-burgundy/40 px-2 py-0.5 rounded">
                ★ {ratingFilter}+
                <button onClick={() => setRatingFilter(0)} className="hover:text-rose-light p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {onlyBestsellers && (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans bg-[#2A0E17] text-gold border border-burgundy/40 px-2 py-0.5 rounded">
                Bestsellers
                <button onClick={() => setOnlyBestsellers(false)} className="hover:text-rose-light p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {onlyFeatured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans bg-[#2A0E17] text-rose-light border border-burgundy/40 px-2 py-0.5 rounded">
                Editor's Picks
                <button onClick={() => setOnlyFeatured(false)} className="hover:text-gold p-0.5">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="ml-auto text-[11px] font-sans text-rose-light hover:underline uppercase tracking-wider font-semibold"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">
          <FilterSidebar
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
            priceFilter={priceFilter}
            onSelectPrice={setPriceFilter}
            ratingFilter={ratingFilter}
            onSelectRating={setRatingFilter}
            onlyBestsellers={onlyBestsellers}
            onToggleBestsellers={() => setOnlyBestsellers(!onlyBestsellers)}
            onlyFeatured={onlyFeatured}
            onToggleFeatured={() => setOnlyFeatured(!onlyFeatured)}
            onlyInStock={onlyInStock}
            onToggleInStock={() => setOnlyInStock(!onlyInStock)}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            isMobileOpen={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          <div className="flex-1 min-w-0">
            <BookGrid
              books={visibleBooks}
              columns="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3"
              emptyTitle="No Editions Match Your Criteria"
              emptyMessage="We could not find any books matching this combination of filters. Try clearing specific filters or explore our complete library."
              onResetFilters={handleResetFilters}
            />

            {/* Load More Button */}
            {visibleCount < sortedBooks.length && (
              <div className="mt-10 sm:mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="w-full sm:w-auto px-8 py-3 bg-[#181015] hover:bg-[#20131B] border border-burgundy/40 hover:border-burgundy text-ivory-light hover:text-rose-light text-xs font-sans uppercase tracking-widest font-semibold rounded transition-all shadow-subtle active:scale-98"
                >
                  Load More Editions ({sortedBooks.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
