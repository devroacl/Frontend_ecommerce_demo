// productsSlice.js corrected version
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../api/productService';

// Changed to use getAvailableProducts which exists in productService.js
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await productService.getAvailableProducts();
    return response; // Removed .data since getAvailableProducts already returns response.data
  }
);

const initialState = {
  products: [],
  status: 'idle',
  error: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export default productsSlice.reducer;