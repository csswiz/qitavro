import React from 'react';
import { Filter, X, RotateCcw, Check, Star, ArrowLeft } from 'lucide-react';

export default function FilterSidebar({
  genres = [],
  selectedGenre,
  onSelectGenre,
  priceFilter,
  onSelectPrice,
  ratingFilter,
  onSelectRating,
  onlyBestsellers,
  onToggleBestsellers,
  onlyFeatured,
  onToggleFeatured,
  onlyInStock,
  onToggleInStock,
  onResetFilters,
  hasActiveFilters,
  isMobileOpen = false,
  onCloseMobile = () => {},
}) {
  const content = (
    <div className="flex flex-col gap-6 text-ivory-light">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-burgundy/25">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-rose-light" />
          <h3 className="font-serif font-bold text-lg text-ivory-light">Filter Shelf</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-sans text-rose-light hover:text-ivory-light uppercase tracking-wider font-semibold transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Genres / Categories */}
      <div>
        <h4 className="font-serif font-semibold text-sm text-gold mb-2.5">
          Literary Genre
        </h4>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onSelectGenre('')}
            className={`flex items-center justify-between text-xs font-sans px-2.5 py-1.5 rounded transition-colors text-left ${
              !selectedGenre
                ? 'bg-burgundy text-ivory-light font-medium border border-burgundy-rose/40'
                : 'text-ivory/80 hover:bg-[#20131B] hover:text-rose-light'
            }`}
          >
            <span>All Literature</span>
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => onSelectGenre(g === selectedGenre ? '' : g)}
              className={`flex items-center justify-between text-xs font-sans px-2.5 py-1.5 rounded transition-colors text-left ${
                selectedGenre === g
                  ? 'bg-burgundy text-ivory-light font-medium border border-burgundy-rose/40'
                  : 'text-ivory/80 hover:bg-[#20131B] hover:text-rose-light'
              }`}
            >
              <span>{g}</span>
              {selectedGenre === g && <Check className="w-3.5 h-3.5 text-gold" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Tiers */}
      <div className="pt-2 border-t border-burgundy/25">
        <h4 className="font-serif font-semibold text-sm text-gold mb-2.5">
          Price Range
        </h4>
        <div className="flex flex-col gap-1.5 text-xs font-sans">
          {[
            { label: 'All Prices', val: '' },
            { label: 'Under ₹299 (Pocket Editions)', val: 'under-299' },
            { label: '₹300 – ₹399', val: '300-399' },
            { label: '₹400 and Above (Clothbound)', val: 'above-400' },
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => onSelectPrice(item.val === priceFilter ? '' : item.val)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors ${
                priceFilter === item.val
                  ? 'bg-[#2A0E17] text-gold font-medium border border-burgundy/40'
                  : 'text-ivory/80 hover:bg-[#20131B] hover:text-rose-light'
              }`}
            >
              <span>{item.label}</span>
              {priceFilter === item.val && <Check className="w-3.5 h-3.5 text-rose-light" />}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="pt-2 border-t border-burgundy/25">
        <h4 className="font-serif font-semibold text-sm text-gold mb-2.5">
          Critical Acclaim
        </h4>
        <div className="flex flex-col gap-1.5 text-xs font-sans">
          {[
            { label: 'Any Rating', val: 0 },
            { label: '4.8★ & Above (Masterpieces)', val: 4.8 },
            { label: '4.5★ & Above (Highly Acclaimed)', val: 4.5 },
          ].map((r) => (
            <button
              key={r.val}
              onClick={() => onSelectRating(r.val === ratingFilter ? 0 : r.val)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors ${
                ratingFilter === r.val
                  ? 'bg-[#2A0E17] text-gold font-medium border border-burgundy/40'
                  : 'text-ivory/80 hover:bg-[#20131B] hover:text-rose-light'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {r.val > 0 && <Star className="w-3.5 h-3.5 text-gold fill-gold" />}
                <span>{r.label}</span>
              </div>
              {ratingFilter === r.val && <Check className="w-3.5 h-3.5 text-rose-light" />}
            </button>
          ))}
        </div>
      </div>

      {/* Curated Toggles */}
      <div className="pt-2 border-t border-burgundy/25">
        <h4 className="font-serif font-semibold text-sm text-gold mb-2.5">
          Curation Highlights
        </h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-xs font-sans text-ivory/85 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyBestsellers}
              onChange={onToggleBestsellers}
              className="accent-burgundy w-4 h-4 rounded cursor-pointer"
            />
            <span>Readers' Favourites (Bestsellers)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-sans text-ivory/85 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyFeatured}
              onChange={onToggleFeatured}
              className="accent-burgundy w-4 h-4 rounded cursor-pointer"
            />
            <span>Editor's Spotlight</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-sans text-ivory/85 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={onToggleInStock}
              className="accent-burgundy w-4 h-4 rounded cursor-pointer"
            />
            <span>In Stock Editions Only</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop view */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-[#140D12] p-5 rounded-[4px] border border-burgundy/30 shadow-subtle">
        {content}
      </aside>

      {/* Mobile drawer view */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/85 backdrop-blur-sm">
          <div className="relative w-80 max-w-[85vw] bg-[#140D12] border-r border-burgundy/40 h-full p-5 sm:p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              {/* Mobile Drawer Top Bar with Back and Cross */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-burgundy/30">
                <button
                  onClick={onCloseMobile}
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-rose-light hover:text-ivory-light p-1 -ml-1 rounded active:scale-95"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-4 h-4 text-gold" />
                  <span className="font-semibold">Back</span>
                </button>

                <button
                  onClick={onCloseMobile}
                  className="p-1.5 bg-[#1C0D15] border border-burgundy/40 text-ivory/70 hover:text-rose-light rounded-full transition-all active:scale-90"
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>{content}</div>
            </div>

            <div className="mt-8 pt-4 border-t border-burgundy/25 flex gap-2">
              <button
                onClick={onCloseMobile}
                className="flex-1 py-2.5 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded border border-burgundy-rose/30 transition-all text-center"
              >
                Apply Filters
              </button>
              <button
                onClick={onCloseMobile}
                className="px-3 py-2.5 bg-[#181015] border border-burgundy/30 text-ivory/70 hover:text-rose-light rounded text-xs font-sans"
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
}
