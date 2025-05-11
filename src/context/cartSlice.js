import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../api';

// Get cart from localStorage to persist it
const savedCart = localStorage.getItem('cart') ? 
  JSON.parse(localStorage.getItem('cart')) : [];

// Initial state
const initialState = {
  items: savedCart,
  isLoading: false,
  error: null,
  orderSuccess: false
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Async thunk for checkout
export const checkout = createAsyncThunk(
  'cart/checkout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.confirmOrder();
      return response;
    } catch (error) {
      return rejectWithValue(error.error || 'Error al procesar el pedido');
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        existingItem.quantity += 1;
      } else {
        // Add new item with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
      }
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.orderSuccess = false;
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },
    
    resetOrderSuccess: (state) => {
      state.orderSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.isLoading = false;
        state.items = []; // Clear cart after successful order
        state.orderSuccess = true;
        
        // Save empty cart to localStorage
        saveCartToStorage([]);
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  resetOrderSuccess
} = cartSlice.actions;

export default cartSlice.reducer;