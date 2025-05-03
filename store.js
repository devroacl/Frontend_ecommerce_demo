//Configuracion redux 
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './context/authSlice';
import cartReducer from './context/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});