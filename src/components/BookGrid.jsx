import React, { useState } from 'react';
import BookCard from './BookCard';
import QuickViewModal from './QuickViewModal';
import { BookOpen } from 'lucide-react';

export default function BookGrid({
  books = [],
  columns = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  emptyTitle = 'No Books Found',
  emptyMessage = 'Try adjusting your filters or search term to discover other works in our catalogue.',
  onResetFilters = null,
}) {
  const [activeQuickViewBook, setActiveQuickViewBook] = useState(null);

  if (!books || books.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-[#140D12] border border-burgundy/30 rounded-[4px] my-6 text-ivory-light">
        <BookOpen className="w-12 h-12 mx-auto text-ivory/20 mb-3 stroke-[1.2]" />
        <h3 className="font-serif text-xl text-ivory-light font-semibold">{emptyTitle}</h3>
        <p className="font-sans text-xs sm:text-sm text-ivory/70 mt-1 max-w-md mx-auto">
          {emptyMessage}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-4 px-4 py-2 bg-burgundy hover:bg-burgundy-light text-ivory-light text-xs font-sans rounded transition-colors border border-burgundy-rose/30"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className={`grid ${columns} gap-4 sm:gap-6`}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onQuickView={(b) => setActiveQuickViewBook(b)}
          />
        ))}
      </div>

      <QuickViewModal
        book={activeQuickViewBook}
        isOpen={!!activeQuickViewBook}
        onClose={() => setActiveQuickViewBook(null)}
      />
    </>
  );
}
