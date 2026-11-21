import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function BookCoverImage({
  src,
  alt = 'Book Cover',
  className = '',
  title = '',
  author = '',
  category = '',
  aspectRatio = 'aspect-[2/3]',
}) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-[2px] bg-wine/10 ${aspectRatio} ${className} book-spine-effect select-none shadow-book transition-shadow duration-300 hover:shadow-book-hover`}
    >
      {!imageError && src ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#160E13] animate-pulse flex items-center justify-center">
              <div className="w-6 h-6 rounded-full p-0.5 bg-[#1C0D15] border border-burgundy/40 shadow-xs flex items-center justify-center opacity-60">
                <img src="/logo.svg" alt="QITAVRO" className="w-full h-full object-contain" />
              </div>
            </div>
          )}
        </>
      ) : (
        /* Typographic Fallback Cover in Burgundy & Gold */
        <div className="w-full h-full bg-[#421F2A] p-4 flex flex-col justify-between text-center border border-gold/30">
          <div className="border border-gold/40 h-full p-3 flex flex-col justify-between">
            <span className="text-[9px] tracking-widest uppercase font-sans text-rose font-medium">
              {category || 'Qitavro Edition'}
            </span>
            <div className="my-auto py-2">
              <h4 className="font-serif font-bold text-sm text-ivory leading-tight line-clamp-3">
                {title || alt}
              </h4>
              <p className="font-serif italic text-xs text-gold mt-1.5 line-clamp-1">
                {author || 'Literary Classic'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-1.5 opacity-80">
              <span className="w-3 h-[1px] bg-gold" />
              <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                <img src="/logo.svg" alt="QITAVRO" className="w-full h-full object-contain" />
              </div>
              <span className="text-[8px] uppercase tracking-wider text-gold font-sans font-medium">QITAVRO</span>
              <span className="w-3 h-[1px] bg-gold" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
