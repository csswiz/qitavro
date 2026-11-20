import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { ShieldCheck, BookOpen, RefreshCw } from 'lucide-react';

export default function TermsOfService() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The foundational charter governing your patronage, reading orders, and use of the QITAVRO literary platform."
      lastUpdated="November 18, 2024"
    >
      <div className="space-y-8 font-serif text-ivory/90 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <section className="border-b border-burgundy/25 pb-6">
          <p className="text-base sm:text-lg italic text-ivory/80 leading-relaxed font-serif">
            Welcome to <strong className="text-rose-light">QITAVRO</strong> ("A World Between the Covers"). By accessing our online bookstore, browsing our collections, creating a wishlist, or completing an order, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our services.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            1. Nature of the Literary Platform
          </h2>
          <p>
            QITAVRO is an independent, curated digital bookstore offering eBooks, independent press publications, and authentic literary works. Every book displayed in our catalogue is vetted for authenticity, legible typesetting, and editorial merit.
          </p>
          <div className="bg-[#181015] p-4 rounded border-l-2 border-gold font-sans text-xs sm:text-sm text-ivory/80">
            <strong className="text-gold">Editorial Standard:</strong> We do not operate an open marketplace for unverified mass-scraping. Books presented on QITAVRO are curated and authenticated by our team before listing.
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            2. Orders, Invoicing & Pricing
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Currency:</strong> All prices listed on QITAVRO are in Indian Rupees (INR ₹) and are inclusive of applicable taxes unless explicitly stated.
            </li>
            <li>
              <strong>Price Accuracy:</strong> While we strive for absolute typographical precision, in the rare event that an edition is mispriced due to an error, we reserve the right to cancel or adjust the order, with immediate written notification and full refund.
            </li>
            <li>
              <strong>Order Confirmation:</strong> An order confirmation email or WhatsApp notification signifies receipt of your purchase intent. A binding digital transaction is formed once download links are issued.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            3. Digital Editions & eBook Licensing
          </h2>
          <p>
            When purchasing an eBook or Digital Edition (such as <em>Darling in Red's</em> by Ace):
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Instant Digital Delivery:</strong> eBooks are delivered immediately upon checkout completion via on-screen download links and sent directly to your email address and WhatsApp with zero shipping delays.</li>
            <li><strong>Formats & Compatibility:</strong> Our digital volumes are provided in standard DRM-free EPUB and PDF formats, compatible with Kindle, Apple Books, Kobo, Android, iOS, PC, and Mac reading apps.</li>
            <li><strong>Personal License:</strong> The acquisition of an eBook grants you a personal, perpetual, non-exclusive license for personal reading. Redistribution, unauthorized file sharing, or reproduction is strictly prohibited under copyright laws.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            4. Digital Delivery & eBook Access Charter
          </h2>
          <p>
            QITAVRO is exclusively an eBook and digital publication bookstore. We eliminate physical shipping delays, parcel handling damage, and courier transit fees.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Zero Shipping Fees:</strong> Because all publications are digital, no shipping, courier, or packaging fees are ever charged.</li>
            <li><strong>Immediate Fulfillment:</strong> Download links generate on-screen instantly upon order confirmation, with an encrypted backup sent to your email.</li>
            <li><strong>Permanent Re-Download Guarantee:</strong> If you switch devices or inadvertently delete your download file, contact our team with your Order ID or email for a complimentary replacement download token.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            5. Refund & Digital File Guarantee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3 font-sans text-xs">
            <div className="p-3 bg-[#181015] rounded border border-burgundy/30">
              <span className="font-bold text-rose-light block mb-1">File Integrity Guarantee</span>
              If a file download is interrupted or fails to render properly on your verified device, we provide an immediate fresh link or alternate format within 24 hours.
            </div>
            <div className="p-3 bg-[#181015] rounded border border-burgundy/30">
              <span className="font-bold text-rose-light block mb-1">Refund Considerations</span>
              Because eBooks are non-returnable digital goods, refunds are honored for accidental duplicate orders or unresolvable technical incompatibility.
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            6. Intellectual Property & The Reading Room
          </h2>
          <p>
            All original editorial essays, reading guides, design graphics, typography arrangements, and 3D web interactive assets (including the Sanctuary Guardian) on QITAVRO are the proprietary intellectual property of QITAVRO. Book cover imagery and excerpts remain the copyright of their respective authors and publishers, reproduced under fair dealing for literary critique and cataloguing.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            7. Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of the Republic of India. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2 pt-4 border-t border-burgundy/25 text-xs font-sans text-ivory/70">
          <p>
            For questions or formal legal notices regarding these Terms of Service, please write to our legal team at:
            <a href="mailto:legal@qitavro.com" className="text-gold font-semibold ml-1 hover:underline">
              legal@qitavro.com
            </a>
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
