import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  Tag, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getWhatsAppListingUrl, WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function SellBook() {
  const { addToast } = useToast();
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    category: 'Romance',
    condition: 'Pre-loved (Very Good)',
    sellerName: '',
    phone: '',
    email: '',
    description: '',
    utrNumber: '',
  });

  const upiId = 'authorjanvi@fam';
  const accountName = 'Janvi Sethi';
  const listingFee = 99;

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      addToast('UPI ID copied to clipboard: ' + upiId, 'success');
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.price || !formData.sellerName) {
      addToast('Please complete all required fields before proceeding.', 'error');
      return;
    }

    setIsSubmitted(true);
    addToast('Book submission details recorded! Please complete ₹99 payment and confirm via WhatsApp.', 'success');
  };

  const whatsappListingUrl = getWhatsAppListingUrl(formData);

  return (
    <div className="bg-black-obsidian min-h-screen pb-24 text-ivory-light">
      {/* 1. Header Banner */}
      <div className="bg-[#120C10] border-b border-burgundy/25 py-10 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-rose-light" />
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
              Community Shelf & Author Desk
            </span>
            <span className="w-6 h-[1.5px] bg-rose-light" />
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-ivory-light leading-tight">
            Sell Your Books on QITAVRO
          </h1>

          <p className="mt-3 sm:mt-4 font-serif italic text-sm sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
            List your pre-loved volume or independent digital release on our curated literary shelf for a flat one-time listing fee of <strong className="text-gold font-sans font-bold not-italic">₹99</strong>. Keep 100% of your earnings.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-sans text-ivory/70">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" /> Flat ₹99 Listing Fee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" /> 0% Commission on Sale
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold" /> Direct WhatsApp Inquiries
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Dedicated QR Payment & Beneficiary Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-[#140D12] rounded-[6px] border-2 border-burgundy/50 p-6 sm:p-8 shadow-2xl sticky top-24">
              
              <div className="flex items-center justify-between pb-4 border-b border-burgundy/30">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-rose-light font-semibold block">
                    Listing Activation Desk
                  </span>
                  <h3 className="font-serif font-bold text-xl text-ivory-light mt-0.5">
                    Scan & Pay ₹99
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-serif font-bold text-2xl text-gold">₹99</span>
                  <span className="block text-[9px] font-sans text-ivory/50 uppercase tracking-wider">One-Time Fee</span>
                </div>
              </div>

              {/* Beneficiary Header */}
              <div className="mt-4 p-3 bg-[#181015] rounded border border-burgundy/30 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-sans text-ivory/50 uppercase tracking-wider">
                    Verified Merchant / Beneficiary
                  </span>
                  <span className="font-serif font-bold text-sm text-ivory-light">
                    {accountName}
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[9px] font-sans uppercase tracking-wider rounded bg-burgundy/40 text-gold border border-gold/30">
                  FamApp UPI
                </span>
              </div>

              {/* QR Image Display */}
              <div className="mt-5 flex flex-col items-center justify-center">
                <div className="relative p-2.5 rounded-[8px] bg-black-obsidian border-2 border-gold/50 shadow-2xl max-w-[240px] sm:max-w-[260px] w-full overflow-hidden group">
                  <img
                    src="/images/payments/listing-qr.jpg"
                    alt="Scan UPI QR Code to pay ₹99 listing fee to Janvi Sethi"
                    className="w-full h-auto rounded-[4px] object-contain transition-transform duration-300 group-hover:scale-102"
                  />
                  
                  {/* Subtle scan line indicator */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-75 animate-pulse" />
                </div>

                <p className="mt-3 text-xs font-sans text-ivory/60 text-center">
                  Scan to pay with any UPI app (GPay, PhonePe, Paytm, FamApp, CRED, BHIM)
                </p>
              </div>

              {/* Copy UPI Section */}
              <div className="mt-5 p-3.5 bg-[#181015] rounded border border-burgundy/35 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="block text-[9px] font-sans text-ivory/50 uppercase tracking-widest">
                    UPI ID (Click to Copy)
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-gold font-semibold truncate block">
                    {upiId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-3 py-1.5 bg-burgundy hover:bg-burgundy-light active:scale-95 text-ivory-light rounded text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors border border-burgundy-rose/40 flex-shrink-0"
                  title="Copy UPI ID"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-gold" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gold" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instructions checklist */}
              <div className="mt-6 pt-5 border-t border-burgundy/25 space-y-2.5 text-xs font-sans text-ivory/70">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-burgundy text-gold font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Pay <strong>₹99</strong> using the QR code or UPI ID above.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-burgundy text-gold font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Fill in your book details in the submission form.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-burgundy text-gold font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Click <strong>"Send Details on WhatsApp"</strong> to dispatch your payment screenshot & info to the curation team for instant listing!</span>
                </div>
              </div>

              {/* WhatsApp direct help link */}
              <div className="mt-5 pt-4 border-t border-burgundy/25 text-center">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Hi QITAVRO Team, I need assistance regarding listing my book for selling on the website.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-rose-light hover:text-gold transition-colors font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gold" />
                  <span>Need help? Chat with Seller Support</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Book Submission Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-[#140D12] rounded-[6px] border border-burgundy/35 p-6 sm:p-8 shadow-xl">
              
              <div className="mb-6">
                <span className="text-[10px] font-sans uppercase tracking-widest text-rose-light font-semibold block">
                  Step 1 & 2
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light mt-0.5">
                  Book & Seller Submission
                </h2>
                <p className="text-xs sm:text-sm font-sans text-ivory/70 mt-1">
                  Provide accurate details so your book can be cataloged with our signature literary elegance.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Book Title & Author */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-1.5">
                      Book Title <span className="text-rose-light">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Darling in Red's, 1984"
                      className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded py-2.5 px-3 text-xs sm:text-sm font-sans text-ivory-light placeholder:text-ivory/30 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-1.5">
                      Author Name <span className="text-rose-light">*</span>
                    </label>
                    <input
                      type="text"
                      name="author"
                      required
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="e.g. Ace, George Orwell"
                      className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded py-2.5 px-3 text-xs sm:text-sm font-sans text-ivory-light placeholder:text-ivory/30 outline-none"
                    />
                  </div>
                </div>

                {/* Selling Price & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-1.5">
                      Target Selling Price (₹) <span className="text-rose-light">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold font-serif text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="price"
                        required
                        min="1"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="e.g. 149"
                        className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded py-2.5 pl-8 pr-3 text-xs sm:text-sm font-sans text-ivory-light placeholder:text-ivory/30 outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-ivory/50 mt-1 block">
                      You keep 100% of this amount when sold.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-1.5">
                      Category / Genre <span className="text-rose-light">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded py-2.5 px-3 text-xs sm:text-sm font-sans text-ivory-light outline-none"
                    >
                      <option value="Romance">Romance & Dark Devotion</option>
                      <option value="Fiction">Modern Fiction</option>
                      <option value="Classics">Timeless Classics</option>
                      <option value="Philosophy">Philosophy & Thought</option>
                      <option value="Poetry">Poetry & Verse</option>
                      <option value="Mystery">Mystery & Thriller</option>
                      <option value="Non-Fiction">Essays & Non-Fiction</option>
                      <option value="Other">Other Literature</option>
                    </select>
                  </div>
                </div>

                {/* Format / Condition */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-1.5">
                    Format & Condition Grade <span className="text-rose-light">*</span>
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded py-2.5 px-3 text-xs sm:text-sm font-sans text-ivory-light outline-none"
                  >
                    <option value="Digital Edition (eBook)">Digital Edition (eBook - EPUB/PDF)</option>
                    <option value="Pre-loved (Like New)">Pre-loved (Like New - Pristine uncreased)</option>
                    <option value="Pre-loved (Very Good)">Pre-loved (Very Good - Gentle patina)</option>
                    <option value="Pre-loved (Good / Reading Copy)">Pre-loved (Good - Complete structural integrity)</option>
                    <option value="Rare / Collector Edition">Rare / Out-of-print Collector Copy</option>
                  </select>
                </div>

                {/* Seller Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-burgundy/25">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-1.5">
                      Your Full Name <span className="text-rose-light">*</span>
                    </label>
                    <input
                      type="text"
                      name="sellerName"
                      required
                      value={formData.sellerName}
                      onChange={handleChange}
                      placeholder="e.g. Janvi Sethi"
                      className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded py-2.5 px-3 text-xs sm:text-sm font-sans text-ivory-light placeholder:text-ivory/30 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-1.5">
                      WhatsApp Phone Number <span className="text-rose-light">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded py-2.5 px-3 text-xs sm:text-sm font-sans text-ivory-light placeholder:text-ivory/30 outline-none"
                    />
                    <span className="text-[10px] text-ivory/50 mt-1 block">
                      Buyer inquiries will be coordinated through this number.
                    </span>
                  </div>
                </div>

                {/* Book Synopsis / Seller Note */}
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-ivory/80 mb-1.5">
                    Brief Book Synopsis / Condition Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell prospective buyers what makes this edition memorable or any specific notes on cover/pages..."
                    className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded py-2.5 px-3 text-xs sm:text-sm font-sans text-ivory-light placeholder:text-ivory/30 outline-none resize-none"
                  />
                </div>

                {/* UPI UTR / Transaction Reference */}
                <div className="p-3.5 bg-[#181015] rounded border border-burgundy/30">
                  <label className="block text-xs font-sans uppercase tracking-wider text-gold mb-1">
                    UPI Transaction / UTR Number (From your ₹99 Payment)
                  </label>
                  <input
                    type="text"
                    name="utrNumber"
                    value={formData.utrNumber}
                    onChange={handleChange}
                    placeholder="e.g. 4321XXXXXXXX or last 6 digits (or attach screenshot on WhatsApp)"
                    className="w-full bg-[#140D12] border border-burgundy/35 focus:border-rose-light rounded py-2 px-3 text-xs font-mono text-ivory-light placeholder:text-ivory/30 outline-none"
                  />
                  <span className="text-[10px] text-ivory/50 mt-1 block font-sans">
                    You can also directly attach the payment screenshot on WhatsApp.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappListingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black font-sans text-xs uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-all shadow-lg text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Details on WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    className="py-3.5 px-6 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors border border-burgundy-rose/40"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                    <span>Save & Confirm Details</span>
                  </button>
                </div>

                {isSubmitted && (
                  <div className="p-4 bg-[#181015] border-l-2 border-gold rounded text-xs font-sans text-ivory/90 space-y-2 mt-4 animate-in fade-in">
                    <div className="flex items-center gap-2 text-gold font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submission Draft Saved!</span>
                    </div>
                    <p>
                      Please send your screenshot & details to the QITAVRO desk by tapping the green <strong>"Send Details on WhatsApp"</strong> button above. Our team will verify the ₹99 payment and publish your book on the shelf within 2–4 hours.
                    </p>
                  </div>
                )}

              </form>

            </div>
          </div>

        </div>

        {/* 3. Value Pillars: Why Sell on QITAVRO */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-burgundy/25">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-rose-light">
              Seller Benefits
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ivory-light mt-1">
              Why List Your Books With Us?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#140D12] p-6 rounded border border-burgundy/30 text-center">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
                <Tag className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-ivory-light">Flat ₹99 • 0% Commission</h4>
              <p className="text-xs font-sans text-ivory/70 mt-1 leading-relaxed">
                No percentage cuts, no listing renewals, no hidden marketplace charges. You keep 100% of whatever sale price you set.
              </p>
            </div>

            <div className="bg-[#140D12] p-6 rounded border border-burgundy/30 text-center">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-ivory-light">Curated Editorial Showcase</h4>
              <p className="text-xs font-sans text-ivory/70 mt-1 leading-relaxed">
                Your book receives our signature velvet burgundy book card, condition grading badge, and placement on our active shelf.
              </p>
            </div>

            <div className="bg-[#140D12] p-6 rounded border border-burgundy/30 text-center">
              <div className="w-10 h-10 rounded bg-[#201018] flex items-center justify-center text-gold mx-auto mb-3 border border-burgundy/40">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-ivory-light">Direct WhatsApp Connection</h4>
              <p className="text-xs font-sans text-ivory/70 mt-1 leading-relaxed">
                When a reader wants your book, our team routes the acquisition directly through WhatsApp for verified fulfillment and instant communication.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
