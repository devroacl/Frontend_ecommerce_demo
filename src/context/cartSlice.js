import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.product.id === action.payload.product.id
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      state.total = calculateTotal(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.product.id !== action.payload
      );
      state.total = calculateTotal(state.items);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        item => item.product.id === action.payload.id
      );
      
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Función helper para calcular el total
const calculateTotal = (items) => {
  return items.reduce(
    (sum, item) => sum + (item.product.precio * item.quantity),
    0
  );
};

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart,
  setLoading,
  setError 
} = cartSlice.actions;

export default cartSlice.reducer;