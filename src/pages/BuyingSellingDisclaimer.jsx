import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { AlertTriangle, Sparkles, Scale, Info } from 'lucide-react';

export default function BuyingSellingDisclaimer() {
  return (
    <LegalLayout
      title="Buying & Selling Disclaimer"
      subtitle="Important disclosures regarding pre-loved book patina, condition grading, authenticity, and inventory limits."
      lastUpdated="November 18, 2024"
    >
      <div className="space-y-8 font-serif text-charcoal/90 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <section className="border-b border-stone/40 pb-6">
          <p className="text-base sm:text-lg italic text-charcoal/80 leading-relaxed font-serif">
            This Buying & Selling Disclaimer provides clear disclosures regarding the nature of the books sold on <strong className="text-burgundy">QITAVRO</strong>, including pre-loved volumes, limited editions, transit precautions, and authorial views. Please read this notice carefully before acquiring any title from our catalogue.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            1. Nature of Pre-Loved & Vintage Literature
          </h2>
          <p>
            When you purchase a book marked with the <strong>"Pre-loved"</strong> badge, or our digital releases such as the <em>Darling in Red's</em> eBook edition:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Patina & Natural Aging:</strong> Pre-loved books carry the tactile beauty of previous lives. While we inspect each book to guarantee structural integrity and complete readability, books may possess subtle vintage characteristics—including warm paper toning, gentle spine creases, or micro-scuffs on cover foils.
            </li>
            <li>
              <strong>Sensory Characteristics:</strong> Older books and certain archival papers have an inherent, natural scent of cellulose and aged ink. This is a natural consequence of time and not a manufacturing defect.
            </li>
            <li>
              <strong>Single-Copy Scarcity:</strong> Most pre-loved and vintage editions in our collection are strictly <strong>one-of-a-kind (1-of-1) copies</strong>. If multiple patrons attempt to purchase the exact same edition simultaneously, our system fulfills the order with the earliest verified timestamp.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            2. Photography & Color Fidelity
          </h2>
          <div className="bg-ivory p-4 rounded border-l-2 border-gold font-sans text-xs sm:text-sm text-charcoal/80 space-y-1.5">
            <strong>Visual Representation Notice:</strong>
            <p>
              We photograph or render covers with faithful natural lighting. However, due to color calibration differences across monitors, mobile OLED screens, and ambient room illumination, the physical hue of clothbound covers or metallic foil stampings may vary slightly from your screen preview.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            3. Editorial Good-Faith Authentication
          </h2>
          <p>
            QITAVRO exercises rigorous good-faith diligence in inspecting editions, verifying ISBN credentials, and validating copyright imprints. However:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>We do not provide certified third-party museum appraisals or forensic chemical age verifications unless explicitly stated on rare collector certificates.</li>
            <li>Bibliographic data (such as page counts, publication dates, and translator notes) is synchronized from publisher records and historical catalogues. Occasional publisher printing variances in edition print runs remain outside our direct manufacturing control.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            4. Content & Authorial Views Disclaimer
          </h2>
          <p>
            QITAVRO is a sanctuary for diverse ideas, philosophical inquiry, romantic sagas, and historical perspectives. 
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>The perspectives, ideologies, moral decisions, and creative choices expressed in novels, essays, or poetry belong solely to their respective authors and creators.</li>
            <li>Listing a book on QITAVRO represents an acknowledgement of its literary, narrative, or historical significance; it does not constitute an institutional endorsement by QITAVRO of any character's conduct, philosophical dogma, or political doctrine.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            5. In-Transit Courier Liability
          </h2>
          <p>
            We deploy reinforced, corner-padded archival parcels to safeguard your books against transit hazards. While we partner exclusively with reputed express couriers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Unforeseen regional transit delays caused by extreme weather, floods, customs inspections, or public holidays are beyond our immediate logistical control.</li>
            <li>In any confirmed instance of loss or physical transit ruin, our liability is strictly limited to providing a full refund or an equivalent replacement edition, as outlined in our Terms of Service.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-2 pt-4 border-t border-stone/40 text-xs font-sans text-charcoal/70">
          <p>
            For condition inquiries on specific individual books before placing an order, please contact our curatorial desk at:
            <a href="mailto:curate@qitavro.com" className="text-burgundy font-semibold ml-1 hover:underline">
              curate@qitavro.com
            </a>
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
