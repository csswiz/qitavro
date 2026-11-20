// QITAVRO Official WhatsApp Desk & Order Routing
export const WHATSAPP_NUMBER = '919876543210'; // QITAVRO Team WhatsApp Number

/**
 * Generate WhatsApp redirect URL to purchase a specific book
 */
export function getWhatsAppBuyUrl(book) {
  if (!book) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      'Hi QITAVRO Team, I would like to inquire about purchasing books from your collection. Please guide me.'
    )}`;
  }

  const message = `Hi QITAVRO Team! 👋
I would like to purchase the following book from your store:

📖 *Book:* ${book.title}
✍️ *Author:* ${book.author}
💰 *Price:* ₹${book.price}
📦 *Format:* ${book.format || (book.isEbook ? 'Digital Edition (eBook)' : 'Pre-loved Volume')}

Please guide me with payment and delivery. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp redirect URL for entire shopping bag / checkout
 */
export function getWhatsAppCartUrl(items = [], totalAmount = 0) {
  const itemsText = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.title}* by ${item.author} — Qty: ${item.quantity || 1} (₹${
          item.price * (item.quantity || 1)
        })`
    )
    .join('\n');

  const message = `Hi QITAVRO Team! 👋
I would like to complete an order for the following books from my bag:

${itemsText}

💳 *Total Order Amount:* ₹${totalAmount}

Please provide the payment details and assist me with delivery. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp redirect URL after paying ₹99 seller listing fee
 */
export function getWhatsAppListingUrl(listingData = {}) {
  const { title, author, price, condition, category, sellerName, utrNumber } = listingData;

  const message = `Hi QITAVRO Team! 👋
I have completed the *₹99 listing fee payment* to list my book for selling on QITAVRO!

📋 *Book Submission Details:*
• *Title:* ${title || 'Not specified'}
• *Author:* ${author || 'Not specified'}
• *Target Selling Price:* ₹${price || 'Not specified'}
• *Category:* ${category || 'Literature / Fiction'}
• *Condition / Format:* ${condition || 'Pre-loved / Digital'}
• *Seller Name:* ${sellerName || 'Reader'}
• *UPI Transaction / UTR No:* ${utrNumber || 'Attached in screenshot below'}

I am attaching the payment screenshot with this message. Please review and activate my listing in the shop. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
