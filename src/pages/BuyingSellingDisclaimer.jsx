import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { AlertTriangle, Sparkles, Scale, Info } from 'lucide-react';

export default function BuyingSellingDisclaimer() {
  return (
    <LegalLayout
      title="Buying & Selling Disclaimer"
      subtitle="Important disclosures regarding digital eBook editions, device compatibility, file integrity, and curated publications."
      lastUpdated="November 20, 2024"
    >
      <div className="space-y-8 font-serif text-ivory/90 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <section className="border-b border-burgundy/25 pb-6">
          <p className="text-base sm:text-lg italic text-ivory/80 leading-relaxed font-serif">
            This Buying & Selling Disclaimer provides clear disclosures regarding the nature of the books sold and listed on <strong className="text-rose-light">QITAVRO</strong>, including digital eBook editions, formatting compatibility, and authorial views. Please read this notice carefully before acquiring any title from our catalogue.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            1. Digital Editions & eBook Formatting
          </h2>
          <p>
            When you purchase a book on QITAVRO (such as <em>Darling in Red's</em> by Ace):
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Dual Format Delivery:</strong> Every purchase includes both reflowable EPUB (optimal for Apple Books, Google Play Books, Kindle, and eReaders) and fixed-layout PDF (for high-fidelity desktop reading).
            </li>
            <li>
              <strong>Reader Customization:</strong> In reflowable EPUB format, typography, line spacing, margins, and dark/light mode are determined by your reading application settings. Page numbering dynamically adjusts to your chosen font size.
            </li>
            <li>
              <strong>DRM-Free Freedom:</strong> Our eBooks do not enforce invasive digital rights management (DRM) locks, enabling you to read your editions across all personal devices without platform lock-in.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            2. Cover Artwork & Screen Fidelity
          </h2>
          <div className="bg-[#181015] p-4 rounded border-l-2 border-gold font-sans text-xs sm:text-sm text-ivory/80 space-y-1.5">
            <strong className="text-gold">Visual Display Notice:</strong>
            <p>
              Cover artwork is designed and calibrated for high-resolution digital displays. Subtle color differences may occur depending on your screen technology (OLED, AMOLED, Retina, e-ink) and display color profile.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            3. Editorial Good-Faith Authentication
          </h2>
          <p>
            QITAVRO exercises rigorous good-faith diligence in inspecting editions, verifying ISBN credentials, and validating copyright imprints. However:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>We do not provide certified third-party appraisals unless explicitly stated.</li>
            <li>Bibliographic data (such as page counts, publication dates, and author biographies) is synchronized from author records and official releases.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            4. Content & Authorial Views Disclaimer
          </h2>
          <p>
            QITAVRO is a sanctuary for diverse ideas, philosophical inquiry, romantic sagas, and historical perspectives. 
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>The perspectives, ideologies, moral decisions, and creative choices expressed in novels, essays, or poetry belong solely to their respective authors and creators.</li>
            <li>Listing a book on QITAVRO represents an acknowledgement of its literary and narrative merit; it does not constitute an institutional endorsement by QITAVRO of any character's conduct or authorial doctrine.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            5. Digital Delivery Guarantee & Technical Assistance
          </h2>
          <p>
            Because QITAVRO delivers pure digital editions with zero physical transit delays:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Download links are generated instantly on-screen upon order confirmation and permanently archived to your registered email and WhatsApp.</li>
            <li>In any confirmed instance of file corruption or network download failure, our curatorial desk provides immediate fresh download tokens or direct file transfer via WhatsApp.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-2 pt-4 border-t border-burgundy/25 text-xs font-sans text-ivory/70">
          <p>
            For edition inquiries or reading technical assistance, please contact our curatorial desk at:
            <a href="mailto:curate@qitavro.com" className="text-gold font-semibold ml-1 hover:underline">
              curate@qitavro.com
            </a>
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
