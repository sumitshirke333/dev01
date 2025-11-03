/**
 * Formats a number as a currency string.
 * @param {number} amount - The number to format.
 * @param {string} currency - The currency code (e.g., 'USD').
 * @returns {string} The formatted currency string.
 */
export const formatPrice = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Generates a random alphanumeric string for a simulated order ID.
 * @param {number} length - The desired length of the string.
 * @returns {string} The random string.
 */
export const generateOrderId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `GL-${result}`; // Prefix to make it clear it's a Glossary order
};