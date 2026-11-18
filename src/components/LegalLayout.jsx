import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, FileText, ListChecks, AlertCircle, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  {
    path: '/terms',
    label: 'Terms of Service',
    icon: FileText,
    desc: 'The charter governing reading and orders',
  },
  {
    path: '/privacy',
    label: 'Privacy Policy',
    icon: ShieldCheck,
    desc: 'How we protect your reading data',
  },
  {
    path: '/listing-policy',
    label: 'Listing Policy',
    icon: ListChecks,
    desc: 'Curated editions & condition standards',
  },
  {
    path: '/disclaimer',
    label: 'Buying & Selling Disclaimer',
    icon: AlertCircle,
    desc: 'Disclosures for pre-loved & rare works',
  },
];

export default function LegalLayout({
  title,
  subtitle,
  lastUpdated = 'November 18, 2024',
  children,
}) {
  return (
    <div className="bg-ivory min-h-screen text-charcoal pb-24">
      {/* Top Breadcrumb & Header */}
      <div className="border-b border-stone/60 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-sans text-charcoal/60">
            <Link to="/" className="hover:text-burgundy transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bookstore</span>
            </Link>
            <span>/</span>
            <span className="text-burgundy font-medium">Legal Charters</span>
          </div>
          <span className="text-[11px] font-sans text-charcoal/60">
            Last Updated: <span className="text-charcoal font-medium">{lastUpdated}</span>
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-wine text-ivory py-10 sm:py-14 border-b border-burgundy-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-5 h-[1.5px] bg-gold" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-gold-light font-semibold">
              QITAVRO Governance & Trust
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-ivory tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 sm:mt-3 font-serif italic text-sm sm:text-base md:text-lg text-stone-light/90 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-white/5 font-serif font-bold text-9xl select-none pointer-events-none">
          Q
        </div>
      </div>

      {/* Main Content Layout with Sticky Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Navigation Sidebar */}
          <aside className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-[3px] border border-stone/70 p-4 sm:p-5 shadow-subtle">
              <h3 className="font-serif font-bold text-sm text-charcoal uppercase tracking-wider mb-3 pb-2 border-b border-stone/40">
                Legal Charters & Policies
              </h3>
              <nav className="space-y-1.5" aria-label="Policy Navigation">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-start gap-3 p-2.5 sm:p-3 rounded transition-all ${
                          isActive
                            ? 'bg-burgundy text-ivory shadow-xs font-medium'
                            : 'hover:bg-stone/20 text-charcoal/80 hover:text-burgundy'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-gold' : 'text-burgundy'}`} />
                          <div>
                            <span className="block font-serif text-sm leading-snug">
                              {item.label}
                            </span>
                            <span className={`block text-[10px] font-sans mt-0.5 ${isActive ? 'text-stone-light/90' : 'text-charcoal/50'}`}>
                              {item.desc}
                            </span>
                          </div>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-burgundy/5 rounded-[3px] border border-burgundy/20 p-4 text-xs font-sans text-charcoal/80 space-y-2">
              <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-burgundy">
                <Mail className="w-4 h-4 text-gold" />
                <span>Legal & Curation Desk</span>
              </div>
              <p className="text-[11px] leading-relaxed text-charcoal/70">
                Have specific queries regarding condition grading, archival shipments, or policy interpretations?
              </p>
              <a
                href="mailto:legal@qitavro.com"
                className="inline-block text-xs font-sans uppercase tracking-wider font-semibold text-burgundy hover:underline"
              >
                legal@qitavro.com →
              </a>
            </div>
          </aside>

          {/* Right Column: Policy Document Prose */}
          <main className="lg:col-span-8 bg-white rounded-[3px] border border-stone/70 p-6 sm:p-10 shadow-subtle prose-qitavro">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}
