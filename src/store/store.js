import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer
  }
});