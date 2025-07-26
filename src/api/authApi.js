import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response) => {
                // Store user in localStorage if needed
                localStorage.setItem('user', JSON.stringify(response.user));
                return response;
            },
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            transformResponse: () => {
                // Clear localStorage
                localStorage.removeItem('user');
                return { success: true };
            },
        }),
    }),
});

export const getCurrentUser = async () => {
    const res = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
};

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} = authApi; 