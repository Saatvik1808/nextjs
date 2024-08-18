import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.total = state.subtotal - state.discount;
    },

    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }

      state.subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      state.total = state.subtotal - state.discount;
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity < 1) {
        return; // Prevents setting a quantity less than 1
      }

      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        state.subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        state.total = state.subtotal - state.discount;
      }
    },

    applyDiscount: (state, action) => {
      const { type, value } = action.payload;

      if (type === 'fixed') {
        state.discount = value;
      } else if (type === 'percentage') {
        state.discount = (state.subtotal * value) / 100;
      }

      state.total = state.subtotal - state.discount;
    },

    resetDiscount: (state) => {
      state.discount = 0;
      state.total = state.subtotal - state.discount;
    },

    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  applyDiscount,
  resetDiscount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
