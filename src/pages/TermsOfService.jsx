import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { ShieldCheck, BookOpen, Truck, RefreshCw } from 'lucide-react';

export default function TermsOfService() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The foundational charter governing your patronage, reading orders, and use of the QITAVRO literary platform."
      lastUpdated="November 18, 2024"
    >
      <div className="space-y-8 font-serif text-charcoal/90 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <section className="border-b border-stone/40 pb-6">
          <p className="text-base sm:text-lg italic text-charcoal/80 leading-relaxed font-serif">
            Welcome to <strong className="text-burgundy">QITAVRO</strong> ("A World Between the Covers"). By accessing our online bookstore, browsing our collections, creating a wishlist, or completing an order, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            1. Nature of the Literary Platform
          </h2>
          <p>
            QITAVRO is an independent, curated online bookstore offering new editions, clothbound classics, independent press publications, and authentic pre-loved literary works. Every book displayed in our catalogue is vetted for authenticity, legible typesetting, and editorial merit.
          </p>
          <div className="bg-ivory p-4 rounded border-l-2 border-gold font-sans text-xs sm:text-sm text-charcoal/80">
            <strong>Editorial Standard:</strong> We do not operate an open marketplace for unverified mass-scraping. Books presented on QITAVRO are curated or authenticated by our team before dispatch.
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            2. Orders, Invoicing & Pricing
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Currency:</strong> All prices listed on QITAVRO are in Indian Rupees (INR ₹) and are inclusive of applicable goods and service taxes unless explicitly stated.
            </li>
            <li>
              <strong>Price Accuracy:</strong> While we strive for absolute typographical precision, in the rare event that an edition is mispriced due to an error, we reserve the right to cancel or adjust the order before dispatch, with immediate written notification and full refund.
            </li>
            <li>
              <strong>Order Confirmation:</strong> An order confirmation email or receipt signifies receipt of your purchase intent. A binding contract is formed once the book has been packed and handed to our logistics partner.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            3. Pre-Loved & Curated Editions
          </h2>
          <p>
            QITAVRO takes pride in finding new homes for pre-loved books (such as <em>Darling in Red's</em> and classic paperbacks). When purchasing a pre-loved edition:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>You acknowledge that pre-loved copies may show gentle signs of previous readership, mild foxing, or natural paper patina that do not impair readability.</li>
            <li>Each pre-loved listing indicates its condition grade (e.g., <em>Near Mint</em>, <em>Very Good</em>, or <em>Good</em>). Please review the condition before checkout.</li>
            <li>Pre-loved volumes are frequently single-stock copies (1-of-1); orders are fulfilled strictly on a first-come, first-served basis.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            4. Archival Shipping & Packaging
          </h2>
          <p>
            We treat every book like a fragile cultural heirloom. All parcels are packaged with rigid protective corners and moisture-resistant archival paper to prevent spine bruising or edge crushing during transit.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Dispatch Time:</strong> Orders are typically inspected and dispatched within 24 to 48 business hours.</li>
            <li><strong>Transit Timelines:</strong> Standard domestic delivery in India ranges from 3 to 7 business days depending on delivery pincode.</li>
            <li><strong>Risk of Loss:</strong> We partner with premier tracked couriers. In the rare event of in-transit damage or total loss, QITAVRO provides full replacement or refund upon photographic verification.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            5. Cancellation, Return & Replacement Charter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3 font-sans text-xs">
            <div className="p-3 bg-stone/20 rounded border border-stone/40">
              <span className="font-bold text-burgundy block mb-1">Before Dispatch</span>
              You may cancel any order before it is dispatched by writing to us with your Order ID for a 100% refund.
            </div>
            <div className="p-3 bg-stone/20 rounded border border-stone/40">
              <span className="font-bold text-burgundy block mb-1">Damaged on Arrival</span>
              If a parcel arrives torn or water-damaged, notify us within 48 hours with photos for an immediate replacement or full refund.
            </div>
          </div>
          <p>
            Due to the rare and irreplaceable nature of certain pre-loved single-copy editions, returns for buyer's remorse (e.g., changed reading preference) are not accepted once the seal is broken, unless the book differs significantly from its listed condition grade.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            6. Intellectual Property & The Reading Room
          </h2>
          <p>
            All original editorial essays, reading guides, design graphics, typography arrangements, and 3D web interactive assets (including the Sanctuary Guardian) on QITAVRO are the proprietary intellectual property of QITAVRO. Book cover imagery and excerpts remain the copyright of their respective authors and publishers, reproduced under fair dealing for literary critique and cataloguing.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            7. Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of the Republic of India. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2 pt-4 border-t border-stone/40 text-xs font-sans text-charcoal/70">
          <p>
            For questions or formal legal notices regarding these Terms of Service, please write to our legal team at:
            <a href="mailto:legal@qitavro.com" className="text-burgundy font-semibold ml-1 hover:underline">
              legal@qitavro.com
            </a>
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
