import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { CheckCircle2, XCircle, Award, BookCheck } from 'lucide-react';

export default function ListingPolicy() {
  return (
    <LegalLayout
      title="Listing Policy"
      subtitle="Our uncompromising standards for literary curation, condition grading, and catalogue integrity."
      lastUpdated="November 18, 2024"
    >
      <div className="space-y-8 font-serif text-ivory/90 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <section className="border-b border-burgundy/25 pb-6">
          <p className="text-base sm:text-lg italic text-ivory/80 leading-relaxed font-serif">
            <strong className="text-rose-light">QITAVRO</strong> is not a generic flea-market or automated aggregator. Every volume that earns a place on our shelves must meet strict standards of typography, translation fidelity, physical soundness, and authentic provenance. This Listing Policy outlines the criteria for new publications, independent press releases, and pre-loved editions.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            1. Standards of Literary Curation
          </h2>
          <p>
            Our catalogue is shaped by intentional reading. We actively list books across:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>The Classics & Philosophy:</strong> Canonical literature, philosophy, and enduring essays published with scholarly integrity.</li>
            <li><strong>Independent & Small Press Literature:</strong> Hand-crafted translations, poetry, and fiction from boutique publishers and author-led releases (such as <em>Darling in Red's</em> by Ace).</li>
            <li><strong>Pre-Loved & Vintage Volumes:</strong> Well-preserved secondhand books seeking new guardians.</li>
            <li><strong>Fine Bookmaking:</strong> Editions printed on acid-free or deckle-edge paper, sewn bindings, and aesthetic jacket artwork.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            2. Condition Grading System for Pre-Loved Books
          </h2>
          <p>
            To ensure absolute trust and transparency, all pre-loved editions listed on QITAVRO are graded against our 4-tier Archival Condition Scale:
          </p>

          <div className="space-y-3 my-4 font-sans text-xs sm:text-sm">
            <div className="p-3.5 bg-[#181015] rounded border-l-4 border-burgundy">
              <span className="font-serif font-bold text-sm text-rose-light block">
                As New / Mint
              </span>
              <p className="text-ivory/80 mt-1">
                An unread, pristine copy with flawless spine, immaculate page edges, and no owner inscriptions or blemishes.
              </p>
            </div>

            <div className="p-3.5 bg-[#181015] rounded border-l-4 border-gold">
              <span className="font-serif font-bold text-sm text-gold block">
                Near Mint / Fine
              </span>
              <p className="text-ivory/80 mt-1">
                Minimal shelf wear on cover corners. Clean, crisp leaves with tight binding and zero highlighting or interior markings.
              </p>
            </div>

            <div className="p-3.5 bg-[#181015] rounded border-l-4 border-burgundy-dark">
              <span className="font-serif font-bold text-sm text-ivory-light block">
                Very Good
              </span>
              <p className="text-ivory/80 mt-1">
                Shows gentle signs of previous reading: faint spine creasing or mild age toning along page edges. Text is 100% complete, clean, and fully legible.
              </p>
            </div>

            <div className="p-3.5 bg-[#181015] rounded border-l-4 border-burgundy/40">
              <span className="font-serif font-bold text-sm text-ivory/70 block">
                Good (Reading Copy)
              </span>
              <p className="text-ivory/80 mt-1">
                A well-loved book that remains intact and structurally sound. May exhibit modest foxing, minor cover scuffs, or an antique ex-libris bookplate, but no missing pages.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            3. Authenticity & Zero-Counterfeit Mandate
          </h2>
          <div className="bg-[#181015] p-4 rounded border-l-2 border-rose-light font-sans text-xs sm:text-sm text-ivory/80 space-y-2">
            <strong className="text-rose-light">Zero Tolerance for Bootleg or Pirated Photocopies:</strong>
            <p>
              QITAVRO enforces a strict zero-counterfeit policy. We actively reject low-resolution pirated reprints, unauthorized laser photocopies, and counterfeit paperbacks. Every book listed must be an authorized publisher edition or legally released author edition carrying a valid ISBN or verifiable bibliographic imprint.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            4. Prohibited & Excluded Items
          </h2>
          <p>The following categories are strictly barred from being listed on QITAVRO:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-sans text-ivory/80">
            <li>Unsanitary, water-rotted, mold-damaged, or insect-damaged books.</li>
            <li>Defective copies with missing chapters, loose signatures, or unreadable pages.</li>
            <li>Unauthorized digital book leaks or unlicensed print-on-demand knockoffs.</li>
            <li>Promotional advance reading copies (ARCs) marked strictly "Not For Resale".</li>
            <li>Plagiarized manuscripts or works violating international copyright laws.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            5. Price Transparency
          </h2>
          <p>
            Every listing must clearly state:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The final selling price in INR (₹).</li>
            <li>Original publisher MRP or fair pre-loved market benchmark where applicable.</li>
            <li>Condition badge (e.g. <em>Pre-loved</em>, <em>Collector's Edition</em>, or <em>eBook</em>).</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-2 pt-4 border-t border-burgundy/25 text-xs font-sans text-ivory/70">
          <p>
            If you represent a publisher or author wishing to list curated volumes on QITAVRO, please submit your proposal to:
            <a href="mailto:curate@qitavro.com" className="text-gold font-semibold ml-1 hover:underline">
              curate@qitavro.com
            </a>
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
