import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Heart, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Editorial Header with Official Brand Seal */}
      <div className="bg-white/60 border-b border-stone/60 py-12 sm:py-20 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Brand Seal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 p-2.5 rounded-[6px] bg-white border border-gold/40 shadow-book flex items-center justify-center">
            <img src="/logo.svg" alt="QITAVRO Official Logo" className="w-full h-full object-contain" />
          </div>

          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-burgundy font-semibold">
              The QITAVRO Manifesto
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-charcoal leading-tight">
            "A World Between the Covers."
          </h1>

          <p className="mt-4 sm:mt-6 font-serif italic text-base sm:text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            Founded on the quiet conviction that books are not disposable consumer goods, but sanctuaries of human consciousness and timeless conversation.
          </p>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        
        {/* Section 1: Why QITAVRO Exists */}
        <section className="space-y-4 sm:space-y-6 font-serif text-base sm:text-lg text-charcoal/85 leading-[1.8]">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-charcoal">
            Why QITAVRO Exists
          </h2>
          <div className="w-10 h-[2px] bg-gold mb-4" />
          
          <p className="drop-cap">
            In modern retail, books have been reduced to algorithmic inventory—shuffled into high-speed warehouses, discounted for clicks, and sold alongside kitchen appliances and cleaning detergents. In this transaction, the romance of discovering an unexpected voice, the tactile wonder of deckle-edged paper, and the sacred intimacy of reading are quietly extinguished.
          </p>

          <p>
            QITAVRO was born as an antidote to this digital commodification. Named with an homage to the ancient root for the written word and the Mediterranean harbor where trade in illuminated manuscripts once flourished, QITAVRO is an independent online bookstore designed with the reverence of a luxury literary publication and the warmth of a neighborhood bookdealer.
          </p>
        </section>

        {/* Visual Break / Quote Highlight */}
        <div className="my-10 sm:my-14 p-6 sm:p-8 bg-wine text-ivory rounded-[3px] border border-gold/40 text-center shadow-book">
          <p className="font-serif italic text-lg sm:text-2xl leading-relaxed text-stone-light">
            "When you hold a truly extraordinary book in your hands, you hold the distilled lifetime, suffering, and epiphany of another human being."
          </p>
          <span className="block font-sans text-xs uppercase tracking-widest text-gold mt-4 font-semibold">
            — The Editorial Directors, QITAVRO
          </span>
        </div>

        {/* Section 2: Our Three Pillars */}
        <section className="space-y-6 sm:space-y-8 pt-4 sm:pt-6">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-charcoal">
            Our Guiding Commitments
          </h2>
          <div className="w-10 h-[2px] bg-gold" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
            <div className="bg-white p-5 sm:p-6 rounded border border-stone/70 shadow-subtle">
              <div className="w-10 h-10 rounded bg-ivory flex items-center justify-center text-burgundy mb-4 border border-stone/50">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal mb-2">
                Curatorial Intention
              </h3>
              <p className="text-xs font-sans text-charcoal/70 leading-relaxed">
                We reject endless catalogs of mediocre filler. Every volume must earn its place through exceptional prose, moral courage, or timeless intellectual insight.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded border border-stone/70 shadow-subtle">
              <div className="w-10 h-10 rounded bg-ivory flex items-center justify-center text-burgundy mb-4 border border-stone/50">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal mb-2">
                Physical Craftsmanship
              </h3>
              <p className="text-xs font-sans text-charcoal/70 leading-relaxed">
                We champion clothbound hardcovers, deckle edges, archival paper, and faithful translations that honor the author's original linguistic melody.
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded border border-stone/70 shadow-subtle">
              <div className="w-10 h-10 rounded bg-ivory flex items-center justify-center text-burgundy mb-4 border border-stone/50">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-charcoal mb-2">
                Protective Packaging
              </h3>
              <p className="text-xs font-sans text-charcoal/70 leading-relaxed">
                We believe a book should arrive as a treasured gift. Double-boxed in reinforced archival cardboard so corners remain crisp and unbent.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Vision for Thoughtful Discovery */}
        <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-stone/60 space-y-4 sm:space-y-6 font-serif text-base sm:text-lg text-charcoal/85 leading-[1.8]">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-charcoal">
            The Vision of Meaningful Reading
          </h2>

          <p>
            We dream of a world where readers read fewer books, but read them with infinitely greater depth. Where an evening spent with Marcus Aurelius or John Williams replaces an evening of anxious digital exhaustion.
          </p>

          <p>
            Whether you are curating your first bookshelf or adding to a lifelong private library, we are honored to be your quiet companions on this journey.
          </p>

          <div className="pt-6 sm:pt-8 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-burgundy hover:bg-wine active:scale-98 text-ivory text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle"
            >
              <span>Explore The Curated Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
