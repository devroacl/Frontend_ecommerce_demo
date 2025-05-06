// productsSlice.js completo y funcional
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../api/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await getProducts();
    return response.data;
  }
);

const initialState = {
  products: [],
  status: 'idle'
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      });
  }
});

export default productsSlice.reducer;