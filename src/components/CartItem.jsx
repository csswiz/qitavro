import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import BookCoverImage from './BookCoverImage';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const rowSubtotal = item.price * (item.quantity || 1);

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white rounded border border-stone/60 shadow-subtle items-start sm:items-center justify-between">
      {/* Thumbnail and Info */}
      <div className="flex gap-3 sm:gap-4 items-center min-w-0 w-full sm:w-auto flex-1">
        <Link to={`/book/${item.slug}`} className="w-14 sm:w-16 flex-shrink-0 block">
          <BookCoverImage
            src={item.image}
            alt={item.title}
            title={item.title}
            author={item.author}
            category={item.category}
            aspectRatio="aspect-[2/3]"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-burgundy font-medium">
            {item.category}
          </span>
          <Link to={`/book/${item.slug}`}>
            <h4 className="font-serif font-bold text-charcoal text-sm sm:text-base leading-snug hover:text-burgundy transition-colors truncate">
              {item.title}
            </h4>
          </Link>
          <p className="font-serif italic text-[11px] sm:text-xs text-charcoal/70 truncate">
            {item.author}
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="font-serif font-bold text-wine text-xs sm:text-sm">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-charcoal/40 line-through text-[10px] sm:text-[11px]">
                ₹{item.originalPrice}
              </span>
            )}
            <span className="text-[10px] text-charcoal/50 font-sans hidden sm:inline">
              • {item.format || 'Standard'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls & Subtotal */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-stone/30">
        {/* Quantity Controls */}
        <div className="flex items-center border border-stone bg-ivory-light rounded">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 sm:p-1.5 text-charcoal hover:bg-stone/30 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-7 sm:w-8 text-center text-xs font-sans font-medium text-charcoal">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 sm:p-1.5 text-charcoal hover:bg-stone/30 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[60px] sm:min-w-[70px]">
          <span className="font-serif font-bold text-wine text-sm sm:text-base">
            ₹{rowSubtotal}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1.5 sm:p-2 text-charcoal/40 hover:text-rose transition-colors active:scale-95"
          aria-label="Remove item"
          title="Remove from bag"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
