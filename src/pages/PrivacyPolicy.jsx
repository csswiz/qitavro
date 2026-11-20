import React from 'react';
import LegalLayout from '../components/LegalLayout';
import { Lock, EyeOff, Database, UserCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Our charter on safeguarding your personal identity, reading history, and digital sanctuary."
      lastUpdated="November 18, 2024"
    >
      <div className="space-y-8 font-serif text-ivory/90 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <section className="border-b border-burgundy/25 pb-6">
          <p className="text-base sm:text-lg italic text-ivory/80 leading-relaxed font-serif">
            At <strong className="text-rose-light">QITAVRO</strong>, we believe what a person reads is an intimate facet of their consciousness. We treat your personal information with the same reverence and discretion with which an archivist treats rare parchment. We never sell, rent, or trade your personal reading lists or identity.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            1. Information We Collect
          </h2>
          <p>We only gather data necessary to deliver your curated volumes and provide a seamless reading experience:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Reader Details:</strong> Full name, email address, and WhatsApp contact number for digital eBook access and order confirmation.
            </li>
            <li>
              <strong>Order Records:</strong> eBook titles acquired, invoice totals, order date, and digital fulfillment references.
            </li>
            <li>
              <strong>Client-Side Storage (LocalStorage):</strong> We store your Shopping Bag items and Wishlist items locally in your browser's private storage so your selections persist without tracking your identity across external sites.
            </li>
            <li>
              <strong>Technical Logs:</strong> Anonymized browser type, IP address, and page interaction timestamps used strictly to diagnose technical faults and optimize loading speed.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            2. How Your Information Is Used
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To generate, deliver, and verify your digital eBook download links and access tokens.</li>
            <li>To send order receipts, digital access backup links, and reader support communications via email and WhatsApp.</li>
            <li>To deliver our curated literary dispatch (<em>Letters for the Love of Reading</em>) only if you deliberately opt in.</li>
            <li>To maintain accounting integrity and comply with statutory tax guidelines in India.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            3. Payment Security & Financial Data
          </h2>
          <div className="bg-[#181015] p-4 rounded border-l-2 border-gold font-sans text-xs sm:text-sm text-ivory/80 space-y-1.5">
            <strong className="text-gold">Zero Storage of Financial Credentials:</strong>
            <p>
              QITAVRO does NOT store or process your credit card numbers, debit card PINs, CVVs, or UPI credentials on our servers. All transactions are securely routed through RBI-authorized, PCI-DSS Level 1 compliant payment gateways featuring 256-bit SSL encryption.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            4. Third-Party Disclosures
          </h2>
          <p>
            We do not monetize your reading habits. We only share essential details with certified partners who perform core logistics and infrastructure operations on our behalf:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Digital Delivery Infrastructure:</strong> Secure cloud file delivery networks used to transmit DRM-free EPUB and PDF download packages.</li>
            <li><strong>Transactional Communication:</strong> Verified email and messaging gateways to deliver receipts and instant download links.</li>
            <li><strong>Legal Compliance:</strong> When required by lawful court order, statutory regulation, or law enforcement within Indian jurisdiction.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-gold border-b border-burgundy/20 pb-2">
            5. Cookies & Local Browser Storage
          </h2>
          <p>
            QITAVRO avoids intrusive tracking pixels. We use minimalist browser storage to remember:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your active shopping bag state across page reloads.</li>
            <li>Your curated wishlist items so you can revisit saved editions.</li>
            <li>Lightweight session preferences for optimal performance.</li>
          </ul>
          <p className="text-xs font-sans text-ivory/70">
            You can clear your browser's LocalStorage and cookies at any time via your browser settings.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2 pt-4 border-t border-burgundy/25 text-xs font-sans text-ivory/70">
          <p>
            To exercise your rights to data access, modification, or account deletion, contact our privacy officer at:
            <a href="mailto:privacy@qitavro.com" className="text-gold font-semibold ml-1 hover:underline">
              privacy@qitavro.com
            </a>
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
