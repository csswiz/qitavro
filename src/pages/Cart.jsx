import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ArrowLeft, Tag, ShieldCheck, Truck, BookOpen, Trash2, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import BookGrid from '../components/BookGrid';
import booksData from '../data/books.json';
import { getWhatsAppCartUrl } from '../utils/whatsapp';

export default function Cart() {
  const {
    cart,
    clearCart,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  // Curated recommendations for empty cart or upsell
  const recommendations = booksData.filter((b) => b.featured).slice(0, 4);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon(inputCode);
    setInputCode('');
  };

  return (
    <div className="bg-black-obsidian min-h-screen pb-24 text-ivory-light">
      {/* Page Header */}
      <div className="bg-[#120C10] border-b border-burgundy/25 py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-rose-light font-semibold">
            Order Review
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-ivory-light mt-1">
            Your Reading Bag
          </h1>
          <p className="mt-1 font-serif italic text-sm sm:text-base text-ivory/70">
            {cart.length > 0
              ? `${cart.length} unique ${cart.length === 1 ? 'title' : 'titles'} selected for your personal library.`
              : 'Your bag is currently waiting for your first selection.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-burgundy/25">
                <span className="text-xs font-sans text-ivory/60 uppercase tracking-wider">
                  Editions in Bag ({cart.length})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs font-sans text-ivory/50 hover:text-rose-light flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Bag</span>
                </button>
              </div>

              <div className="space-y-3">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-4 flex items-center justify-between">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold text-rose-light hover:text-ivory-light transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-gold" />
                  <span>Continue Browsing Books</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary & Coupon */}
            <div className="lg:col-span-4 bg-[#140D12] rounded-[4px] border border-burgundy/30 p-6 shadow-subtle text-ivory-light">
              <h3 className="font-serif font-bold text-xl text-ivory-light pb-4 border-b border-burgundy/25">
                Order Summary
              </h3>

              {/* Line items */}
              <div className="py-4 space-y-3 text-xs font-sans border-b border-burgundy/25">
                <div className="flex justify-between text-ivory/80">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-sm text-gold">
                    ₹{subtotal}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-gold bg-[#2A0E17] px-2 py-1.5 rounded border border-burgundy/40">
                    <div className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code: {appliedCoupon.code}</span>
                    </div>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-ivory/80">
                  <span>{cart.every(i => i.isEbook || i.format?.toLowerCase().includes('ebook') || i.condition?.toLowerCase() === 'ebook') ? 'Digital Delivery' : 'Archival Delivery'}</span>
                  <span className="font-serif font-bold text-sm text-gold">
                    {cart.every(i => i.isEbook || i.format?.toLowerCase().includes('ebook') || i.condition?.toLowerCase() === 'ebook') ? (
                      <span className="text-gold">Instant Access (Free)</span>
                    ) : shippingFee === 0 ? (
                      <span className="text-gold">Complimentary</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                {!cart.every(i => i.isEbook || i.format?.toLowerCase().includes('ebook') || i.condition?.toLowerCase() === 'ebook') && subtotal < 499 && (
                  <p className="text-[11px] text-rose-light font-sans">
                    Add ₹{499 - subtotal} more for complimentary delivery.
                  </p>
                )}

                {cart.every(i => i.isEbook || i.format?.toLowerCase().includes('ebook') || i.condition?.toLowerCase() === 'ebook') && (
                  <p className="text-[11px] text-gold font-sans">
                    ✦ Instant EPUB & PDF download link delivered to your email after checkout.
                  </p>
                )}
              </div>

              {/* Coupon Form */}
              <div className="py-4 border-b border-burgundy/25">
                <span className="text-xs font-sans text-ivory/70 uppercase tracking-wider font-medium block mb-2">
                  Promotional Voucher / Gift Code
                </span>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-[#1C0D15] px-3 py-2 rounded text-xs border border-burgundy/30">
                    <span className="font-sans font-medium text-gold">
                      "{appliedCoupon.code}" applied
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-light hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Try 'READ10' or 'QITAVRO'"
                      className="flex-1 bg-[#181015] border border-burgundy/35 focus:border-rose-light rounded px-3 py-2 text-xs font-sans uppercase outline-none text-ivory-light placeholder:text-ivory/40"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-burgundy hover:bg-burgundy-light text-ivory-light text-xs font-sans uppercase tracking-wider font-semibold rounded transition-colors border border-burgundy-rose/30"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Estimated Total */}
              <div className="py-4 flex justify-between items-baseline">
                <span className="font-serif font-bold text-lg text-ivory-light">
                  Estimated Total
                </span>
                <span className="font-serif font-bold text-2xl text-gold">
                  ₹{total}
                </span>
              </div>

              {/* Checkout & Direct WhatsApp Purchase */}
              <div className="pt-2 space-y-2">
                <a
                  href={getWhatsAppCartUrl(cart, total)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black rounded font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-md text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order via WhatsApp (₹{total})</span>
                </a>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 bg-[#181015] hover:bg-[#20131B] text-ivory-light rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all border border-burgundy/40"
                >
                  <span>Review Details at Checkout</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-burgundy/25 space-y-2 text-[11px] font-sans text-ivory/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Secure literary acquisition guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-gold" />
                  <span>Reinforced book-grade packaging</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Empty Cart State with Recommendations */
          <div className="py-12">
            <div className="max-w-md mx-auto text-center bg-[#140D12] p-8 rounded-[4px] border border-burgundy/30 shadow-subtle text-ivory-light">
              <div className="w-16 h-16 rounded-full bg-[#1C0D15] mx-auto flex items-center justify-center text-gold mb-4 border border-burgundy/40">
                <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-ivory-light">
                Your Reading Bag is Empty
              </h2>
              <p className="mt-2 font-serif italic text-sm text-ivory/70 leading-relaxed">
                "No book has ever complained about a reader taking their time."
              </p>
              <p className="mt-2 text-xs font-sans text-ivory/60">
                Explore our curated collections of classics, philosophy, and modern fiction.
              </p>
              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy hover:bg-burgundy-light text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle border border-burgundy-rose/40"
                >
                  <span>Discover the Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-16 pt-10 border-t border-burgundy/25">
              <div className="mb-6">
                <span className="text-[10px] font-sans uppercase tracking-widest text-rose-light font-semibold">
                  Curator's Suggestions
                </span>
                <h3 className="font-serif font-bold text-2xl text-ivory-light mt-1">
                  Books to Begin Your Library
                </h3>
              </div>
              <BookGrid books={recommendations} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
