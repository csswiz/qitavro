import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { CheckCircle2, XCircle, Award, BookCheck } from 'lucide-react';

export default function ListingPolicy() {
  return (
    <LegalLayout
      title="Listing Policy"
      subtitle="Curatorial standards, digital formatting criteria, and authorial integrity for the QITAVRO eBook sanctuary."
      lastUpdated="November 20, 2024"
    >
      <div className="space-y-8 font-serif text-ivory/90 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <section className="border-b border-burgundy/25 pb-6">
          <p className="text-base sm:text-lg italic text-ivory/80 leading-relaxed font-serif">
            <strong className="text-rose-light">QITAVRO</strong> is not a generic flea-market or automated aggregator. Every volume that earns a place on our shelves must meet strict standards of typography, digital formatting fidelity, clean metadata, and authentic authorial provenance. This Listing Policy outlines the criteria for independent author releases, digital publications, and curated eBook editions.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            1. Standards of Literary Curation
          </h2>
          <p>
            Our catalogue is shaped by intentional reading. We actively curate and list eBooks across:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>The Classics & Philosophy:</strong> Canonical literature, philosophy, and enduring essays published with scholarly integrity.</li>
            <li><strong>Independent & Small Press Literature:</strong> Hand-crafted translations, poetry, and evocative fiction from independent authors (such as <em>Darling in Red's</em> by Ace).</li>
            <li><strong>Contemporary Gothic & Romantic Works:</strong> Narrative depth, visceral emotion, and memorable character arcs.</li>
            <li><strong>Author-Direct Publications:</strong> Verified releases listed through our ₹99 creator program.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            2. Technical & Formatting Standards for Digital Editions
          </h2>
          <p>
            To ensure an effortless reading experience across all devices, all eBook editions listed on QITAVRO must comply with our formatting benchmark:
          </p>

          <div className="space-y-3 my-4 font-sans text-xs sm:text-sm">
            <div className="p-3.5 bg-[#181015] rounded border-l-4 border-burgundy">
              <span className="font-serif font-bold text-sm text-rose-light block">
                Reflowable EPUB Standard
              </span>
              <p className="text-ivory/80 mt-1">
                Valid EPUB 3.0 formatting with embedded metadata, scalable typography, hyperlinked table of contents, and clean chapter breaks.
              </p>
            </div>

            <div className="p-3.5 bg-[#181015] rounded border-l-4 border-gold">
              <span className="font-serif font-bold text-sm text-gold block">
                High-Resolution PDF Companion
              </span>
              <p className="text-ivory/80 mt-1">
                Faithful fixed-layout PDF companion formatted with proper margins and embedded fonts for desktop, tablet, and printable reading.
              </p>
            </div>

            <div className="p-3.5 bg-[#181015] rounded border-l-4 border-burgundy-dark">
              <span className="font-serif font-bold text-sm text-ivory-light block">
                Cover Art Fidelity
              </span>
              <p className="text-ivory/80 mt-1">
                High-resolution cover art (minimum 1600 × 2400 pixels at 300 DPI) free of pixelation, watermarks, or distorted aspect ratios.
              </p>
            </div>

            <div className="p-3.5 bg-[#181015] rounded border-l-4 border-burgundy/40">
              <span className="font-serif font-bold text-sm text-ivory/70 block">
                DRM-Free Reader Freedom
              </span>
              <p className="text-ivory/80 mt-1">
                Editions must be free of proprietary cryptographic locks, allowing legitimate purchasers to read on Kindle, Apple Books, Kobo, Android, and PC.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            3. Authenticity & Zero-Piracy Mandate
          </h2>
          <div className="bg-[#181015] p-4 rounded border-l-2 border-rose-light font-sans text-xs sm:text-sm text-ivory/80 space-y-2">
            <strong className="text-rose-light">Zero Tolerance for Bootleg, Pirated, or Scraped Files:</strong>
            <p>
              QITAVRO enforces a strict anti-piracy mandate. We actively reject low-resolution OCR rips, unauthorized text scrapes, and leaked manuscripts. Every eBook listed must be an authorized publisher release or legally submitted author edition with valid copyright ownership.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            4. Prohibited & Excluded Submissions
          </h2>
          <p>The following categories are strictly barred from being listed on QITAVRO:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-sans text-ivory/80">
            <li>Low-quality automated machine translations or raw OCR text files with uncorrected spelling defects.</li>
            <li>Defective digital files with missing chapters, broken navigation links, or unrenderable font encodings.</li>
            <li>Unauthorized digital book leaks or pirated copies of copyrighted commercial titles.</li>
            <li>Plagiarized manuscripts or public domain works uploaded without substantive editorial or typographical curation.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            5. Price Transparency & Listing Fee
          </h2>
          <p>
            Every listing must clearly state:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The final selling price in INR (₹), with 100% of the sale earnings going directly to the author/seller.</li>
            <li>The standard one-time listing fee of ₹99 (payable via UPI to <code>authorjanvi@fam</code>) to cover editorial onboarding.</li>
            <li>The digital edition format badge (e.g. <em>eBook</em>, <em>EPUB & PDF</em>).</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-2 pt-4 border-t border-burgundy/25 text-xs font-sans text-ivory/70">
          <p>
            If you represent an author or independent press wishing to list curated volumes on QITAVRO, please visit our <a href="/sell" className="text-gold font-semibold underline">Sell Book Page</a> or submit your proposal to:
            <a href="mailto:curate@qitavro.com" className="text-gold font-semibold ml-1 hover:underline">
              curate@qitavro.com
            </a>
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
