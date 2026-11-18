import React from 'react';
import { Filter, X, RotateCcw, Check, Star } from 'lucide-react';

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
    <div className="flex flex-col gap-6 text-charcoal">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-burgundy" />
          <h3 className="font-serif font-bold text-lg text-charcoal">Filter Shelf</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-sans text-burgundy hover:text-wine uppercase tracking-wider font-semibold transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Genres / Categories */}
      <div>
        <h4 className="font-serif font-semibold text-sm text-charcoal mb-2.5">
          Literary Genre
        </h4>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onSelectGenre('')}
            className={`flex items-center justify-between text-xs font-sans px-2.5 py-1.5 rounded transition-colors text-left ${
              !selectedGenre
                ? 'bg-burgundy text-ivory font-medium'
                : 'text-charcoal/80 hover:bg-stone/30'
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
                  ? 'bg-burgundy text-ivory font-medium'
                  : 'text-charcoal/80 hover:bg-stone/30'
              }`}
            >
              <span>{g}</span>
              {selectedGenre === g && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Tiers */}
      <div className="pt-2 border-t border-stone/50">
        <h4 className="font-serif font-semibold text-sm text-charcoal mb-2.5">
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
                  ? 'bg-stone/60 text-wine font-medium border border-burgundy/30'
                  : 'text-charcoal/80 hover:bg-stone/30'
              }`}
            >
              <span>{item.label}</span>
              {priceFilter === item.val && <Check className="w-3.5 h-3.5 text-burgundy" />}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="pt-2 border-t border-stone/50">
        <h4 className="font-serif font-semibold text-sm text-charcoal mb-2.5">
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
                  ? 'bg-stone/60 text-wine font-medium border border-burgundy/30'
                  : 'text-charcoal/80 hover:bg-stone/30'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {r.val > 0 && <Star className="w-3.5 h-3.5 text-gold fill-gold" />}
                <span>{r.label}</span>
              </div>
              {ratingFilter === r.val && <Check className="w-3.5 h-3.5 text-burgundy" />}
            </button>
          ))}
        </div>
      </div>

      {/* Curated Toggles */}
      <div className="pt-2 border-t border-stone/50">
        <h4 className="font-serif font-semibold text-sm text-charcoal mb-2.5">
          Curation Highlights
        </h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2.5 text-xs font-sans text-charcoal/85 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyBestsellers}
              onChange={onToggleBestsellers}
              className="accent-burgundy w-4 h-4 rounded cursor-pointer"
            />
            <span>Readers' Favourites (Bestsellers)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-sans text-charcoal/85 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyFeatured}
              onChange={onToggleFeatured}
              className="accent-burgundy w-4 h-4 rounded cursor-pointer"
            />
            <span>Editor's Spotlight</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-sans text-charcoal/85 cursor-pointer select-none">
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
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white/70 p-5 rounded-[3px] border border-stone/70 shadow-subtle">
        {content}
      </aside>

      {/* Mobile drawer view */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-charcoal/70 backdrop-blur-sm">
          <div className="relative w-80 max-w-[85vw] bg-ivory h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <button
              onClick={onCloseMobile}
              className="absolute top-4 right-4 p-2 text-charcoal/70 hover:text-burgundy"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pt-4">{content}</div>
            <div className="mt-8 pt-4 border-t border-stone">
              <button
                onClick={onCloseMobile}
                className="w-full py-2.5 bg-burgundy text-ivory text-xs font-sans uppercase tracking-widest font-semibold rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
}
