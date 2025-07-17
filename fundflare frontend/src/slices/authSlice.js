import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
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
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.initialized = true;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        initializeAuth: (state) => {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (user && token) {
                try {
                    state.user = JSON.parse(user);
                    state.token = token;
                    state.isAuthenticated = true;
                } catch (error) {
                    console.error('Error parsing user from localStorage:', error);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            }
            state.initialized = true;
        }
    }
});

export const { setUser, setToken, setLoading, setError, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer; 