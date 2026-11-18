import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function CollectionCard({ collection }) {
  return (
    <div className="group relative flex flex-col bg-white rounded-[3px] border border-stone/70 overflow-hidden shadow-subtle hover:shadow-book transition-all duration-300">
      {/* Cover / Visual Artwork */}
      <div className="relative aspect-[16/10] overflow-hidden bg-wine/10">
        <img
          src={collection.coverImage}
          alt={collection.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-ivory">
          <span className="text-[10px] uppercase tracking-widest font-sans font-medium text-gold-light bg-charcoal/60 px-2 py-0.5 rounded backdrop-blur-sm border border-gold/30">
            {collection.bookIds?.length || 0} Curated Editions
          </span>
          <span className="text-xs font-serif italic text-stone-light">
            {collection.tagline}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-xl font-bold text-charcoal group-hover:text-burgundy transition-colors">
          {collection.title}
        </h3>
        
        <p className="font-sans text-xs text-charcoal/70 mt-2 leading-relaxed flex-1 line-clamp-3">
          {collection.description}
        </p>

        <div className="mt-5 pt-3 border-t border-stone/50 flex items-center justify-between">
          <Link
            to={`/shop?collection=${collection.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider font-semibold text-burgundy group-hover:text-wine transition-colors"
          >
            Explore Collection
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
