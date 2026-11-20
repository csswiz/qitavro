import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ShieldCheck, ArrowLeft, Truck, Check, Lock, BookOpen, Download, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import BookCoverImage from '../components/BookCoverImage';
import { getWhatsAppCartUrl, WHATSAPP_NUMBER } from '../utils/whatsapp';

export default function Checkout() {
  const { cart, subtotal, shippingFee, discountAmount, total, appliedCoupon } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Alexander Sterling',
    email: 'alexander@literarysanctuary.org',
    phone: '+91 98765 43210',
    address: '42 Old Bookshop Lane, Connaught Place',
    city: 'New Delhi',
    postalCode: '110001',
    state: 'Delhi',
    notes: 'Please double-wrap corners with archival paper.',
  });

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-black-obsidian text-ivory-light">
        <h2 className="font-serif text-3xl font-bold text-ivory-light">Your Bag is Empty</h2>
        <p className="font-sans text-sm text-ivory/70 mt-2">
          There are no items to checkout.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-6 py-2.5 bg-burgundy hover:bg-burgundy-light text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded border border-burgundy-rose/40"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDemoModalOpen(true);
  };

  return (
    <div className="bg-black-obsidian min-h-screen pb-24 text-ivory-light">
      {/* Header Banner */}
      <div className="bg-[#120C10] border-b border-burgundy/25 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-sans text-ivory/60 hover:text-rose-light transition-colors mb-1">
              <ArrowLeft className="w-3.5 h-3.5 text-gold" />
              <span>Back to Bag</span>
            </Link>
            <h1 className="font-serif font-bold text-xl sm:text-3xl text-ivory-light">
              Archival Dispatch & Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans text-ivory/60">
            <Lock className="w-4 h-4 text-rose-light" />
            <span className="hidden sm:inline">256-Bit Encrypted</span>
          </div>
        </div>
      </div>

      {/* Mandatory Transparent Notice Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="p-3.5 sm:p-4 bg-[#1C0D15] border border-burgundy/50 rounded flex items-start gap-3 text-rose-light">
          <AlertCircle className="w-5 h-5 text-rose-light flex-shrink-0 mt-0.5" />
          <div className="text-xs font-sans leading-relaxed">
            <strong className="font-semibold block text-sm font-serif text-ivory-light">Demonstration Store Notice:</strong>
            QITAVRO is an interactive editorial demonstration application. Real payment processing and live fulfillment are intentionally not connected. No credit card or monetary transaction will be processed.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Left Column: Dispatch Address & Preferences */}
          <div className="lg:col-span-7 bg-[#140D12] p-5 sm:p-8 rounded-[4px] border border-burgundy/30 shadow-subtle text-ivory-light">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-ivory-light pb-3 border-b border-burgundy/25 mb-5 sm:mb-6">
              1. Delivery Coordinates
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-ivory/70 uppercase tracking-wider mb-1 font-medium">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded px-3.5 py-2.5 text-xs font-sans text-ivory-light outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-ivory/70 uppercase tracking-wider mb-1 font-medium">
                    Email for Dispatch Notices
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded px-3.5 py-2.5 text-xs font-sans text-ivory-light outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-ivory/70 uppercase tracking-wider mb-1 font-medium">
                  Delivery Postal Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded px-3.5 py-2.5 text-xs font-sans text-ivory-light outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-sans text-ivory/70 uppercase tracking-wider mb-1 font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded px-3.5 py-2.5 text-xs font-sans text-ivory-light outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-ivory/70 uppercase tracking-wider mb-1 font-medium">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded px-3.5 py-2.5 text-xs font-sans text-ivory-light outline-none"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-sans text-ivory/70 uppercase tracking-wider mb-1 font-medium">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded px-3.5 py-2.5 text-xs font-sans text-ivory-light outline-none"
                  />
                </div>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-ivory-light pt-6 pb-3 border-b border-burgundy/25 mb-4">
                2. Packaging & Delivery Style
              </h3>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3.5 rounded border border-burgundy/40 bg-[#181015] cursor-pointer">
                  <input
                    type="radio"
                    name="packaging"
                    defaultChecked
                    className="accent-burgundy mt-1"
                  />
                  <div>
                    <span className="font-serif font-bold text-sm text-ivory-light block">
                      Archival Conservation Wrapping (Complimentary)
                    </span>
                    <span className="text-xs font-sans text-ivory/70 mt-0.5 block leading-relaxed">
                      Reinforced corner protectors, acid-free bookmarks, and moisture-barrier kraft paper wrap.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 rounded border border-burgundy/30 bg-[#160E13] cursor-pointer hover:border-burgundy/60 transition-colors">
                  <input
                    type="radio"
                    name="packaging"
                    className="accent-burgundy mt-1"
                  />
                  <div>
                    <span className="font-serif font-bold text-sm text-ivory-light block">
                      Gift Presentation with Handwritten Excerpt (+₹99)
                    </span>
                    <span className="text-xs font-sans text-ivory/70 mt-0.5 block leading-relaxed">
                      Ribbon closure and a hand-inscribed wax-sealed calligraphy card with a quote from your edition.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-6 space-y-3">
                <a
                  href={getWhatsAppCartUrl(cart, total)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black rounded font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Complete Order via WhatsApp (₹{total})</span>
                </a>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#181015] hover:bg-[#20131B] text-ivory/80 hover:text-ivory-light rounded font-sans text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all border border-burgundy/40"
                >
                  <Lock className="w-3.5 h-3.5 text-gold" />
                  <span>Simulate Order Dispatch</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#140D12] p-5 sm:p-6 rounded-[4px] border border-burgundy/30 shadow-subtle flex flex-col justify-between text-ivory-light">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-ivory-light pb-3 border-b border-burgundy/25 mb-4">
                Selected Editions ({cart.length})
              </h3>

              <div className="max-h-60 sm:max-h-80 overflow-y-auto divide-y divide-burgundy/20 pr-1 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <div className="w-10 sm:w-12 flex-shrink-0">
                      <BookCoverImage
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                        author={item.author}
                        category={item.category}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif font-semibold text-xs text-ivory-light truncate">
                        {item.title}
                      </h5>
                      <p className="font-serif italic text-[10px] sm:text-[11px] text-gold">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-gold text-xs">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-burgundy/25 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-ivory/70">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-gold">₹{subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-gold bg-[#2A0E17] px-2 py-1 rounded border border-burgundy/40">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-ivory/70">
                  <span>Archival Courier</span>
                  <span className="font-serif font-bold text-gold">
                    {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-burgundy/25 flex justify-between items-baseline font-serif">
                  <span className="font-bold text-sm sm:text-base text-ivory-light">Grand Total</span>
                  <span className="font-bold text-xl sm:text-2xl text-gold">₹{total}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-burgundy/25 text-[10px] sm:text-[11px] font-sans text-ivory/60 space-y-1">
              <p>• All editions shipped in reinforced book cartons.</p>
              <p>• Real payment processing is disengaged in demo mode.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Demonstration Explanation Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#140D12] rounded-[4px] border border-burgundy/40 p-5 sm:p-8 max-w-lg w-full shadow-2xl text-center text-ivory-light">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[6px] bg-[#181015] p-2 mx-auto mb-3 sm:mb-4 border border-burgundy/40 shadow-sm flex items-center justify-center">
              <img src="/logo.svg" alt="QITAVRO Logo" className="w-full h-full object-contain" />
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-2xl text-ivory-light">
              Demonstration Experience Completed
            </h3>

            <p className="font-serif italic text-xs sm:text-sm text-gold mt-1 sm:mt-2">
              "A World Between the Covers."
            </p>

            <div className="my-4 sm:my-5 p-3.5 sm:p-4 bg-[#181015] rounded border border-burgundy/30 text-xs font-sans text-ivory/80 text-left leading-relaxed space-y-3">
              <p>
                As outlined in the QITAVRO specification, live gateway processing and merchant fulfillment are not connected in this prototype.
              </p>
              <p>
                Your order for <strong>{formData.name}</strong> ({formData.email}) has been validated through the complete React Context and LocalStorage architecture.
              </p>

              {cart.some(i => i.isEbook || i.format?.toLowerCase().includes('ebook') || i.condition?.toLowerCase() === 'ebook') && (
                <div className="p-3 bg-[#2A0E17] border border-burgundy/50 rounded text-ivory-light space-y-2">
                  <div className="font-semibold flex items-center gap-1.5 text-gold">
                    <Download className="w-4 h-4 text-gold" />
                    <span>eBook Digital Edition Ready</span>
                  </div>
                  <p className="text-[11px] text-ivory/80 leading-snug">
                    Instant access link has been generated for <em>Darling in Red's</em> (EPUB & PDF).
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-burgundy hover:bg-burgundy-light text-ivory-light rounded text-[11px] font-semibold shadow-xs border border-burgundy-rose/40">
                    <Download className="w-3.5 h-3.5 text-gold" />
                    <span>Download EPUB / PDF (Simulated)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
              <a
                href={getWhatsAppCartUrl(cart, total)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black text-xs font-sans uppercase tracking-widest font-bold rounded flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Finish Order on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  navigate('/shop');
                }}
                className="py-2.5 px-4 bg-burgundy hover:bg-burgundy-light active:scale-98 text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors border border-burgundy-rose/40"
              >
                Return to Shop
              </button>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="px-4 py-2.5 bg-[#181015] border border-burgundy/30 text-ivory/80 hover:bg-[#20131B] text-xs font-sans rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
