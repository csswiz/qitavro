import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShieldCheck, FileText, ListChecks, AlertCircle, Mail, ArrowLeft } from 'lucide-react';

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
    <div className="bg-black-obsidian min-h-screen text-ivory-light pb-32 lg:pb-24">
      {/* Top Breadcrumb & Header */}
      <div className="border-b border-burgundy/25 bg-[#120C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 text-xs font-sans text-ivory/60">
            <Link to="/" className="hover:text-rose-light transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5 text-gold" />
              <span>Back to Bookstore</span>
            </Link>
            <span>/</span>
            <span className="text-rose-light font-medium">Legal Charters</span>
          </div>
          <span className="text-[11px] font-sans text-ivory/60">
            Last Updated: <span className="text-gold font-medium">{lastUpdated}</span>
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#200A11] via-[#35121D] to-[#16070D] text-ivory-light py-8 sm:py-14 border-b border-burgundy/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-4 sm:w-5 h-[1.5px] bg-gold" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-gold font-semibold">
              QITAVRO Governance & Trust
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-ivory-light tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 sm:mt-3 font-serif italic text-xs sm:text-base md:text-lg text-ivory/80 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-white/5 font-serif font-bold text-8xl sm:text-9xl select-none pointer-events-none">
          Q
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-10">
        
        {/* Mobile Horizontal Pill Navigation Bar (Takes only ~44px, never overlaps content) */}
        <div className="lg:hidden mb-5 -mx-3 px-3 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-2 min-w-max py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-burgundy text-ivory-light font-semibold shadow-xs border border-burgundy-rose/40'
                        : 'bg-[#181015] border border-burgundy/30 text-ivory/80 hover:bg-[#20131B] active:scale-98'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold' : 'text-rose-light'}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Desktop Left Column: Sticky Sidebar Navigation (Visible on lg screens only) */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-[#140D12] rounded-[4px] border border-burgundy/30 p-5 shadow-subtle text-ivory-light">
              <h3 className="font-serif font-bold text-sm text-gold uppercase tracking-wider mb-3 pb-2 border-b border-burgundy/25">
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
                        `flex items-start gap-3 p-3 rounded transition-all ${
                          isActive
                            ? 'bg-burgundy text-ivory-light shadow-xs font-medium border border-burgundy-rose/40'
                            : 'hover:bg-[#20131B] text-ivory/80 hover:text-rose-light'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-gold' : 'text-rose-light'}`} />
                          <div>
                            <span className="block font-serif text-sm leading-snug">
                              {item.label}
                            </span>
                            <span className={`block text-[10px] font-sans mt-0.5 ${isActive ? 'text-ivory/80' : 'text-ivory/50'}`}>
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

            {/* Desktop Contact Box */}
            <div className="bg-[#181015] rounded-[4px] border border-burgundy/35 p-4 text-xs font-sans text-ivory/80 space-y-2">
              <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-rose-light">
                <Mail className="w-4 h-4 text-gold" />
                <span>Legal & Curation Desk</span>
              </div>
              <p className="text-[11px] leading-relaxed text-ivory/70">
                Have specific queries regarding condition grading, archival shipments, or policy interpretations?
              </p>
              <a
                href="mailto:legal@qitavro.com"
                className="inline-block text-xs font-sans uppercase tracking-wider font-semibold text-gold hover:underline"
              >
                legal@qitavro.com →
              </a>
            </div>
          </aside>

          {/* Right Column: Policy Document Prose */}
          <main className="lg:col-span-8 bg-[#140D12] rounded-[4px] border border-burgundy/30 p-5 sm:p-10 shadow-subtle relative z-10 text-ivory-light">
            {children}

            {/* Mobile Contact Box (Appears at the very bottom of the document on mobile, never overlapping) */}
            <div className="lg:hidden mt-8 pt-6 border-t border-burgundy/25 bg-[#181015] -mx-5 -mb-5 p-5 rounded-b-[4px] text-xs font-sans text-ivory/80 space-y-2">
              <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-rose-light">
                <Mail className="w-4 h-4 text-gold" />
                <span>Legal & Curation Desk</span>
              </div>
              <p className="text-[11px] leading-relaxed text-ivory/70">
                Have specific queries regarding condition grading, archival shipments, or policy interpretations?
              </p>
              <a
                href="mailto:legal@qitavro.com"
                className="inline-block text-xs font-sans uppercase tracking-wider font-semibold text-gold hover:underline"
              >
                legal@qitavro.com →
              </a>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
