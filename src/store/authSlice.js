// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Importación CORRECTA

const initialState = {
  user: null,
  status: 'idle'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const decoded = jwtDecode(action.payload.token); // ✅ Ahora funciona
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

export default authSlice.reducer;