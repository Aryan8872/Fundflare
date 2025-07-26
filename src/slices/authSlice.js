import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    initialized: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.initialized = true;
            localStorage.removeItem('user');
        },
        initializeAuth: (state) => {
            const user = localStorage.getItem('user');
            if (user) {
                try {
                    state.user = JSON.parse(user);
                    state.isAuthenticated = true;
                } catch (error) {
                    console.error('Error parsing user from localStorage:', error);
                    localStorage.removeItem('user');
                }
            }
            state.initialized = true;
        }
    }
});

export const { setUser, setLoading, setError, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer; 