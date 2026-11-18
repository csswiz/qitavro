import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const { addToast } = useToast();

  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide an email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please provide a valid email format.');
      return;
    }

    setIsSubscribed(true);
    addToast('You have been enrolled in "Letters for the Love of Reading".', 'success', 'Welcome to the Sanctuary');
  };

  return (
    <section className="relative overflow-hidden bg-white/70 border-y border-stone/70 py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Literary Flourish */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[1px] bg-gold" />
          <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-burgundy font-semibold">
            Literary Correspondence
          </span>
          <span className="w-8 h-[1px] bg-gold" />
        </div>

        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-charcoal leading-tight">
          Letters for the Love of Reading.
        </h2>

        <p className="mt-3 text-sm sm:text-base font-serif italic text-charcoal/70 max-w-xl mx-auto leading-relaxed">
          Thoughtful recommendations, literary discoveries and stories worth sharing.
        </p>

        {isSubscribed ? (
          <div className="mt-8 p-6 bg-ivory rounded border border-gold/40 max-w-md mx-auto flex items-center gap-3 text-left">
            <CheckCircle2 className="w-6 h-6 text-burgundy flex-shrink-0" />
            <div>
              <p className="font-serif font-semibold text-charcoal text-base">
                Welcome to our reader circle.
              </p>
              <p className="font-sans text-xs text-charcoal/70 mt-0.5">
                A confirmation missive has been dispatched to <span className="font-medium text-wine">{email}</span>.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your personal email..."
                  className="w-full bg-ivory border border-stone focus:border-burgundy focus:ring-1 focus:ring-burgundy rounded py-3 pl-10 pr-4 text-xs sm:text-sm font-sans text-charcoal placeholder:text-charcoal/40 outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 bg-burgundy hover:bg-wine text-ivory rounded font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle flex-shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {error && (
              <p className="mt-2 text-xs text-burgundy font-sans text-left">
                {error}
              </p>
            )}

            <p className="mt-3 text-[11px] font-sans text-charcoal/50">
              We respect your reading quietude. No promotional spam; unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
