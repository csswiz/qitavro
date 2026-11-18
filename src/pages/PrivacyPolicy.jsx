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
      <div className="space-y-8 font-serif text-charcoal/90 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <section className="border-b border-stone/40 pb-6">
          <p className="text-base sm:text-lg italic text-charcoal/80 leading-relaxed font-serif">
            At <strong className="text-burgundy">QITAVRO</strong>, we believe what a person reads is an intimate facet of their consciousness. We treat your personal information with the same reverence and discretion with which an archivist treats rare parchment. We never sell, rent, or trade your personal reading lists or identity.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            1. Information We Collect
          </h2>
          <p>We only gather data necessary to deliver your curated volumes and provide a seamless reading experience:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Patron Details:</strong> Full name, email address, telephone contact, and delivery street address for parcel dispatch.
            </li>
            <li>
              <strong>Order Records:</strong> Books purchased, invoice totals, order date, and shipping tracking references.
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
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            2. How Your Information Is Used
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To process, pack, and courier your book orders directly to your doorstep.</li>
            <li>To send digital order confirmations, courier tracking links, and customer care responses.</li>
            <li>To deliver our curated literary dispatch (<em>Letters for the Love of Reading</em>) only if you deliberately opt in.</li>
            <li>To maintain accounting integrity and comply with statutory tax guidelines in India.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            3. Payment Security & Financial Data
          </h2>
          <div className="bg-ivory p-4 rounded border-l-2 border-gold font-sans text-xs sm:text-sm text-charcoal/80 space-y-1.5">
            <strong className="text-burgundy">Zero Storage of Financial Credentials:</strong>
            <p>
              QITAVRO does NOT store or process your credit card numbers, debit card PINs, CVVs, or UPI credentials on our servers. All transactions are securely routed through RBI-authorized, PCI-DSS Level 1 compliant payment gateways featuring 256-bit SSL encryption.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            4. Third-Party Disclosures
          </h2>
          <p>
            We do not monetize your reading habits. We only share essential details with certified partners who perform core logistics and infrastructure operations on our behalf:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Logistics Partners:</strong> Regulated courier services (e.g., Blue Dart, Delhivery, India Post) to physically transport and deliver your books.</li>
            <li><strong>Transactional Communication:</strong> Email and SMS notification delivery providers to send real-time tracking numbers.</li>
            <li><strong>Legal Compliance:</strong> When required by lawful court order, statutory regulation, or law enforcement within Indian jurisdiction.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
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
          <p className="text-xs font-sans text-charcoal/70">
            You can clear your browser's LocalStorage and cookies at any time via your browser settings.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-wine border-b border-stone/30 pb-2">
            6. Your Privacy Rights & Data Erasure
          </h2>
          <p>
            You have full ownership of your personal data. At any time, you may request:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>A full summary of the personal information stored in your customer record.</li>
            <li>Correction of misspelled names or updated delivery addresses.</li>
            <li>Permanent erasure of your customer account and contact history ("Right to be Forgotten"), subject only to statutory tax retention periods.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-2 pt-4 border-t border-stone/40 text-xs font-sans text-charcoal/70">
          <h3 className="font-serif font-bold text-sm text-wine">Grievance & Privacy Officer</h3>
          <p>
            In accordance with the Information Technology Act, 2000 and rules made thereunder, any concerns regarding data privacy may be addressed to:
          </p>
          <p className="font-medium text-charcoal">
            Privacy Desk, QITAVRO Editorial Bookstore<br />
            Email: <a href="mailto:privacy@qitavro.com" className="text-burgundy hover:underline">privacy@qitavro.com</a>
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
