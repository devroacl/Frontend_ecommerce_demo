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
        token: action.payload.token,
        id: action.payload.id,
        correo: action.payload.correo,
        rol: action.payload.rol // Usamos el rol que viene directamente de la respuesta
      };
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;