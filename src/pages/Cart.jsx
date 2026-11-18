import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ArrowLeft, Tag, ShieldCheck, Truck, BookOpen, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import BookGrid from '../components/BookGrid';
import booksData from '../data/books.json';

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
    <div className="bg-ivory min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-white/60 border-b border-stone/60 py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-burgundy font-semibold">
            Order Review
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-charcoal mt-1">
            Your Reading Bag
          </h1>
          <p className="mt-1 font-serif italic text-sm sm:text-base text-charcoal/70">
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
              <div className="flex items-center justify-between pb-3 border-b border-stone/60">
                <span className="text-xs font-sans text-charcoal/60 uppercase tracking-wider">
                  Editions in Bag ({cart.length})
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs font-sans text-charcoal/50 hover:text-burgundy flex items-center gap-1 transition-colors"
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
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold text-burgundy hover:text-wine transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Browsing Books</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary & Coupon */}
            <div className="lg:col-span-4 bg-white rounded border border-stone/70 p-6 shadow-subtle">
              <h3 className="font-serif font-bold text-xl text-charcoal pb-4 border-b border-stone/50">
                Order Summary
              </h3>

              {/* Line items */}
              <div className="py-4 space-y-3 text-xs font-sans border-b border-stone/40">
                <div className="flex justify-between text-charcoal/80">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-sm text-charcoal">
                    ₹{subtotal}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 bg-emerald-50 px-2 py-1.5 rounded border border-emerald-200">
                    <div className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code: {appliedCoupon.code}</span>
                    </div>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-charcoal/80">
                  <span>Archival Delivery</span>
                  <span className="font-serif font-bold text-sm text-charcoal">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700">Complimentary</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                {subtotal < 499 && (
                  <p className="text-[11px] text-burgundy font-sans">
                    Add ₹{499 - subtotal} more for complimentary delivery.
                  </p>
                )}
              </div>

              {/* Coupon Form */}
              <div className="py-4 border-b border-stone/40">
                <span className="text-xs font-sans text-charcoal/70 uppercase tracking-wider font-medium block mb-2">
                  Promotional Voucher / Gift Code
                </span>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-stone/20 px-3 py-2 rounded text-xs">
                    <span className="font-sans font-medium text-charcoal">
                      "{appliedCoupon.code}" applied
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-burgundy hover:underline text-[11px]"
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
                      className="flex-1 bg-ivory border border-stone focus:border-burgundy focus:ring-1 focus:ring-burgundy rounded px-3 py-2 text-xs font-sans uppercase outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-charcoal hover:bg-burgundy text-ivory text-xs font-sans uppercase tracking-wider font-semibold rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Estimated Total */}
              <div className="py-4 flex justify-between items-baseline">
                <span className="font-serif font-bold text-lg text-charcoal">
                  Estimated Total
                </span>
                <span className="font-serif font-bold text-2xl text-wine">
                  ₹{total}
                </span>
              </div>

              {/* Proceed to Checkout Button */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 bg-burgundy hover:bg-wine text-ivory rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-subtle hover:shadow"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-stone/30 space-y-2 text-[11px] font-sans text-charcoal/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-burgundy" />
                  <span>Secure literary acquisition guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-burgundy" />
                  <span>Reinforced book-grade packaging</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Empty Cart State with Recommendations */
          <div className="py-12">
            <div className="max-w-md mx-auto text-center bg-white p-8 rounded border border-stone/70 shadow-subtle">
              <div className="w-16 h-16 rounded-full bg-ivory mx-auto flex items-center justify-center text-charcoal/30 mb-4 border border-stone/50">
                <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-charcoal">
                Your Reading Bag is Empty
              </h2>
              <p className="mt-2 font-serif italic text-sm text-charcoal/70 leading-relaxed">
                "No book has ever complained about a reader taking their time."
              </p>
              <p className="mt-2 text-xs font-sans text-charcoal/60">
                Explore our curated collections of classics, philosophy, and modern fiction.
              </p>
              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy hover:bg-wine text-ivory text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle"
                >
                  <span>Discover the Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-16 pt-10 border-t border-stone/60">
              <div className="mb-6">
                <span className="text-[10px] font-sans uppercase tracking-widest text-burgundy font-semibold">
                  Curator's Suggestions
                </span>
                <h3 className="font-serif font-bold text-2xl text-charcoal mt-1">
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
