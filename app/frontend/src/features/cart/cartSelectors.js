import { createSelector } from '@reduxjs/toolkit';

// The 'export' keyword is added here to make the selector available to other files.
export const selectCartItems = (state) => state.cart.items;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartSubtotal],
    (subtotal) => {
        // Simulated shipping cost: $10, or free if subtotal > $200
        const shippingCost = subtotal > 200 || subtotal === 0 ? 0 : 10;
        return subtotal + shippingCost;
    }
);

export const selectShippingCost = createSelector(
    [selectCartSubtotal],
    (subtotal) => subtotal > 200 || subtotal === 0 ? 0 : 10
);