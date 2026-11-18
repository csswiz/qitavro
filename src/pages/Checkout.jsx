import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ShieldCheck, ArrowLeft, Truck, Check, Lock, BookOpen, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';
import BookCoverImage from '../components/BookCoverImage';

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-charcoal">Your Bag is Empty</h2>
        <p className="font-sans text-sm text-charcoal/70 mt-2">
          There are no items to checkout.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-6 py-2.5 bg-burgundy text-ivory text-xs font-sans uppercase tracking-widest font-semibold rounded"
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
    <div className="bg-ivory min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-white/60 border-b border-stone/60 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-sans text-charcoal/60 hover:text-burgundy transition-colors mb-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bag</span>
            </Link>
            <h1 className="font-serif font-bold text-xl sm:text-3xl text-charcoal">
              Archival Dispatch & Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans text-charcoal/60">
            <Lock className="w-4 h-4 text-burgundy" />
            <span className="hidden sm:inline">256-Bit Encrypted</span>
          </div>
        </div>
      </div>

      {/* Mandatory Transparent Notice Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="p-3.5 sm:p-4 bg-amber-50/90 border border-amber-200 rounded flex items-start gap-3 text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs font-sans leading-relaxed">
            <strong className="font-semibold block text-sm font-serif">Demonstration Store Notice:</strong>
            QITAVRO is an interactive editorial demonstration application. Real payment processing and live fulfillment are intentionally not connected. No credit card or monetary transaction will be processed.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Left Column: Dispatch Address & Preferences */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded border border-stone/70 shadow-subtle">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-charcoal pb-3 border-b border-stone/50 mb-5 sm:mb-6">
              1. Delivery Coordinates
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-charcoal/70 uppercase tracking-wider mb-1 font-medium">
                    Recipient Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-ivory border border-stone focus:border-burgundy rounded px-3.5 py-2.5 text-xs font-sans text-charcoal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-charcoal/70 uppercase tracking-wider mb-1 font-medium">
                    Email for Dispatch Notices
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-ivory border border-stone focus:border-burgundy rounded px-3.5 py-2.5 text-xs font-sans text-charcoal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-charcoal/70 uppercase tracking-wider mb-1 font-medium">
                  Delivery Postal Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-ivory border border-stone focus:border-burgundy rounded px-3.5 py-2.5 text-xs font-sans text-charcoal outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-sans text-charcoal/70 uppercase tracking-wider mb-1 font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-ivory border border-stone focus:border-burgundy rounded px-3.5 py-2.5 text-xs font-sans text-charcoal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-charcoal/70 uppercase tracking-wider mb-1 font-medium">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-ivory border border-stone focus:border-burgundy rounded px-3.5 py-2.5 text-xs font-sans text-charcoal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-charcoal/70 uppercase tracking-wider mb-1 font-medium">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-ivory border border-stone focus:border-burgundy rounded px-3.5 py-2.5 text-xs font-sans text-charcoal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-charcoal/70 uppercase tracking-wider mb-1 font-medium">
                  Special Archival Instructions / Gift Note
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-ivory border border-stone focus:border-burgundy rounded px-3.5 py-2 text-xs font-sans text-charcoal outline-none"
                />
              </div>

              {/* Demonstrative Payment Method */}
              <div className="pt-5 sm:pt-6 border-t border-stone/50 mt-5 sm:mt-6">
                <h4 className="font-serif font-bold text-base sm:text-lg text-charcoal mb-3">
                  2. Payment Method (Demonstration)
                </h4>
                <div className="p-3 sm:p-3.5 bg-ivory border border-stone rounded flex items-center justify-between text-xs font-sans text-charcoal">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-burgundy flex-shrink-0" />
                    <span>Demonstration Simulator (Test Payment)</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-charcoal/60 font-medium">No Charge Incurred</span>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-burgundy hover:bg-wine active:scale-98 text-ivory rounded font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow"
                >
                  Confirm Demonstration Order (₹{total})
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded border border-stone/70 shadow-subtle flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-charcoal pb-3 border-b border-stone/50 mb-4">
                Selected Editions ({cart.length})
              </h3>

              <div className="max-h-60 sm:max-h-80 overflow-y-auto divide-y divide-stone/30 pr-1 space-y-3">
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
                      <h5 className="font-serif font-semibold text-xs text-charcoal truncate">
                        {item.title}
                      </h5>
                      <p className="font-serif italic text-[10px] sm:text-[11px] text-charcoal/60">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-wine text-xs">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-stone/50 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-charcoal">₹{subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal/70">
                  <span>Archival Courier</span>
                  <span className="font-serif font-bold text-charcoal">
                    {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-stone/40 flex justify-between items-baseline font-serif">
                  <span className="font-bold text-sm sm:text-base text-charcoal">Grand Total</span>
                  <span className="font-bold text-xl sm:text-2xl text-wine">₹{total}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-stone/30 text-[10px] sm:text-[11px] font-sans text-charcoal/60 space-y-1">
              <p>• All editions shipped in reinforced book cartons.</p>
              <p>• Real payment processing is disengaged in demo mode.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Demonstration Explanation Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/70 backdrop-blur-sm">
          <div className="bg-ivory rounded border border-stone p-5 sm:p-8 max-w-lg w-full shadow-2xl text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[6px] bg-white p-2 mx-auto mb-3 sm:mb-4 border border-gold/40 shadow-sm flex items-center justify-center">
              <img src="/logo.svg" alt="QITAVRO Logo" className="w-full h-full object-contain" />
            </div>

            <h3 className="font-serif font-bold text-xl sm:text-2xl text-charcoal">
              Demonstration Experience Completed
            </h3>

            <p className="font-serif italic text-xs sm:text-sm text-charcoal/80 mt-1 sm:mt-2">
              "A World Between the Covers."
            </p>

            <div className="my-4 sm:my-5 p-3.5 sm:p-4 bg-white/80 rounded border border-stone text-xs font-sans text-charcoal/80 text-left leading-relaxed space-y-3">
              <p>
                As outlined in the QITAVRO specification, live gateway processing and merchant fulfillment are not connected in this prototype.
              </p>
              <p>
                Your order for <strong>{formData.name}</strong> ({formData.email}) has been validated through the complete React Context and LocalStorage architecture.
              </p>

              {cart.some(i => i.isEbook || i.format?.toLowerCase().includes('ebook') || i.condition?.toLowerCase() === 'ebook') && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 space-y-2">
                  <div className="font-semibold flex items-center gap-1.5 text-emerald-800">
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>eBook Digital Edition Ready</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-snug">
                    Instant access link has been generated for <em>Darling in Red's</em> (EPUB & PDF).
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white rounded text-[11px] font-semibold shadow-xs">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download EPUB / PDF (Simulated)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  navigate('/shop');
                }}
                className="flex-1 py-2.5 bg-burgundy hover:bg-wine active:scale-98 text-ivory text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors"
              >
                Return to Catalogue
              </button>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="px-4 py-2.5 bg-white border border-stone text-charcoal hover:bg-stone/20 text-xs font-sans rounded transition-colors"
              >
                Close Dialog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
