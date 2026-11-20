import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import BookDetails from './pages/BookDetails';
import Collections from './pages/Collections';
import ReadingRoom from './pages/ReadingRoom';
import About from './pages/About';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ListingPolicy from './pages/ListingPolicy';
import BuyingSellingDisclaimer from './pages/BuyingSellingDisclaimer';
import SellBook from './pages/SellBook';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { BookOpen } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-black-obsidian">
      <div className="w-16 h-16 rounded-[6px] bg-[#181015] p-2.5 flex items-center justify-center border border-burgundy/40 mb-4 shadow-lg shadow-burgundy/20">
        <img src="/logo.svg" alt="QITAVRO Logo" className="w-full h-full object-contain" />
      </div>
      <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-burgundy-rose font-semibold">
        Error 404
      </span>
      <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ivory-light mt-1">
        A Page Left Blank
      </h2>
      <p className="font-serif italic text-base text-ivory/70 mt-2 max-w-md">
        The leaf you are seeking has either been moved or exists only in another story.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-burgundy hover:bg-burgundy-light text-ivory-light text-xs font-sans uppercase tracking-widest font-semibold rounded transition-colors shadow-subtle border border-burgundy-rose/30"
      >
        Return to the Bookstore
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-black-obsidian text-ivory-light antialiased selection:bg-burgundy/45 selection:text-ivory-light">
              <Navbar />
              <main className="flex-1 pb-16 lg:pb-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/book/:slug" element={<BookDetails />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/reading-room" element={<ReadingRoom />} />
                  <Route path="/reading-room/:slug" element={<ReadingRoom />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/listing-policy" element={<ListingPolicy />} />
                  <Route path="/disclaimer" element={<BuyingSellingDisclaimer />} />
                  <Route path="/sell" element={<SellBook />} />
                  <Route path="/list-book" element={<SellBook />} />
                  <Route path="/payment" element={<SellBook />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
