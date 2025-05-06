// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  user: null,
  status: 'idle'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const decoded = jwtDecode(action.payload.token);
      state.user = {
        ...action.payload,
        role: decoded.roles[0]
      };
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    }
  }
});

// Exportar los action creators
export const { loginSuccess, logout } = authSlice.actions; // ✅ Exportación CORRECTA
export default authSlice.reducer;