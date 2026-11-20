import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Heart, Compass, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-black-obsidian min-h-screen pb-24 text-ivory-light">
      {/* Editorial Header with Official Brand Seal */}
      <div className="bg-[#120C10] border-b border-burgundy/25 py-10 sm:py-16 md:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-start mb-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-sans text-ivory/60 hover:text-rose-light transition-colors active:scale-95 px-3 py-1.5 rounded bg-[#181015] border border-burgundy/30"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gold" />
              <span>Back to Bookstore</span>
            </Link>
          </div>

          {/* Brand Seal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 p-2.5 rounded-[6px] bg-[#181015] border border-burgundy/40 shadow-book flex items-center justify-center">
            <img src="/logo.svg" alt="QITAVRO Official Logo" className="w-full h-full object-contain" />
          </div>

          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
              The QITAVRO Manifesto
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-ivory-light leading-tight">
            "A World Between the Covers."
          </h1>

          <p className="mt-4 sm:mt-6 font-serif italic text-base sm:text-xl text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            Founded on the quiet conviction that books are not disposable consumer goods, but sanctuaries of human consciousness and timeless conversation.
          </p>
        </div>
      </div>

      {/* Main Narrative */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        
        {/* Section 1: Why QITAVRO Exists */}
        <section className="space-y-4 sm:space-y-6 font-serif text-base sm:text-lg text-ivory/85 leading-[1.8]">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light">
            Why QITAVRO Exists
          </h2>
          <div className="w-10 h-[2px] bg-gold mb-4" />
          
          <p className="drop-cap">
            In modern retail, books have been reduced to algorithmic inventory—shuffled into automated feeds, discounted for clicks, and buried under relentless digital noise. In this transaction, the romance of discovering an unforgettable story, the sacred intimacy of turning a page, and the emotional resonance of literature are quietly lost.
          </p>

          <p>
            QITAVRO was born as an antidote to this digital commodification. Named with an homage to the ancient root for the written word and the timeless devotion of classic storytelling, QITAVRO is an independent literary boutique designed with the reverence of a luxury publication and the warmth of a dedicated book lover.
          </p>
        </section>

        {/* Visual Break / Quote Highlight */}
        <div className="my-10 sm:my-14 p-6 sm:p-8 bg-gradient-to-r from-[#200A11] via-[#35121D] to-[#16070D] text-ivory-light rounded-[4px] border border-burgundy/40 text-center shadow-2xl">
          <p className="font-serif italic text-lg sm:text-2xl leading-relaxed text-ivory/90">
            "When you hold a truly extraordinary book in your hands, you hold the distilled lifetime, suffering, and epiphany of another human being."
          </p>
          <span className="block font-sans text-xs uppercase tracking-widest text-gold mt-4 font-semibold">
            — The Editorial Directors, QITAVRO
          </span>
        </div>

        {/* Section 2: Our Three Pillars */}
        <section className="space-y-6 sm:space-y-8 pt-4 sm:pt-6">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light">
            Our Guiding Commitments
          </h2>
          <div className="w-10 h-[2px] bg-gold" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
            <div className="bg-[#140D12] p-5 sm:p-6 rounded-[4px] border border-burgundy/30 shadow-subtle text-ivory-light">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mb-4 border border-burgundy/40">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ivory-light mb-2">
                Curatorial Intention
              </h3>
              <p className="text-xs font-sans text-ivory/70 leading-relaxed">
                We reject endless catalogs of mediocre filler. Every volume must earn its place through exceptional prose, moral courage, or timeless intellectual insight.
              </p>
            </div>

            <div className="bg-[#140D12] p-5 sm:p-6 rounded-[4px] border border-burgundy/30 shadow-subtle text-ivory-light">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mb-4 border border-burgundy/40">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ivory-light mb-2">
                DRM-Free Reader Freedom
              </h3>
              <p className="text-xs font-sans text-ivory/70 leading-relaxed">
                We believe you should truly own what you buy. Every digital edition arrives in universal EPUB & PDF formats, ready to read across your favorite devices forever.
              </p>
            </div>

            <div className="bg-[#140D12] p-5 sm:p-6 rounded-[4px] border border-burgundy/30 shadow-subtle text-ivory-light">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mb-4 border border-burgundy/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ivory-light mb-2">
                Instant Delivery & Care
              </h3>
              <p className="text-xs font-sans text-ivory/70 leading-relaxed">
                No shipping waits or damaged parcels. Your eBook is available immediately post-checkout, with a permanent backup download link delivered to your email.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Vision for Thoughtful Discovery */}
        <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-burgundy/25 space-y-4 sm:space-y-6 font-serif text-base sm:text-lg text-ivory/85 leading-[1.8]">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light">
            The Vision of Meaningful Reading
          </h2>

          <p>
            We believe in stories that linger long after the final sentence has dissolved. Where an evening spent immersed in a singular, evocative book replaces an hour of anxious digital exhaustion.
          </p>

          <p>
            Whether you are discovering new independent authors or finding solace in timeless themes, we are honored to curate these journeys for your reading sanctuary.
          </p>

          <div className="pt-6 sm:pt-8 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle border border-burgundy-rose/40"
            >
              <span>Explore The Curated Catalogue</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
