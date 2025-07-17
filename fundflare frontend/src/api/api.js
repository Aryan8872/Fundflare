import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Campaign', 'Donation', 'User', 'AdminStats', 'Auth'],
    endpoints: (builder) => ({
        // Auth endpoints
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
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
            invalidatesTags: ['Auth'],
        }),

        // Campaign endpoints
        getCampaigns: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.search) queryParams.append('search', params.search);
                if (params?.category) queryParams.append('category', params.category);
                return `/campaigns?${queryParams.toString()}`;
            },
            transformResponse: (response) => response.campaigns,
            providesTags: ['Campaign'],
        }),
        getCampaignById: builder.query({
            query: (id) => `/campaigns/${id}`,
            transformResponse: (response) => response.campaign,
            providesTags: (result, error, id) => [{ type: 'Campaign', id }],
        }),
        createCampaign: builder.mutation({
            query: (campaignData) => ({
                url: '/campaigns',
                method: 'POST',
                body: campaignData,
            }),
            invalidatesTags: ['Campaign'],
        }),
        updateCampaign: builder.mutation({
            query: ({ id, data }) => ({
                url: `/campaigns/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Campaign'],
        }),
        deleteCampaign: builder.mutation({
            query: (id) => ({
                url: `/campaigns/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Campaign'],
        }),

        // Donation endpoints
        createDonation: builder.mutation({
            query: (donationData) => ({
                url: '/donations',
                method: 'POST',
                body: donationData,
            }),
            invalidatesTags: ['Donation', 'Campaign'],
        }),
        getDonationHistory: builder.query({
            query: () => '/donations/history',
            providesTags: ['Donation'],
        }),
        simulateRecurringDonations: builder.mutation({
            query: () => ({
                url: '/donations/recurring/simulate',
                method: 'POST',
            }),
            invalidatesTags: ['Donation'],
        }),

        // Admin endpoints
        getAdminStats: builder.query({
            query: () => '/admin/dashboard',
            providesTags: ['AdminStats'],
        }),
        getAllPayoutRequests: builder.query({
            query: () => '/admin/payouts',
            providesTags: ['AdminStats'],
        }),
        approvePayoutRequest: builder.mutation({
            query: (id) => ({
                url: `/admin/payouts/${id}/approve`,
                method: 'POST',
            }),
            invalidatesTags: ['AdminStats'],
        }),
        rejectPayoutRequest: builder.mutation({
            query: (id) => ({
                url: `/admin/payouts/${id}/reject`,
                method: 'POST',
            }),
            invalidatesTags: ['AdminStats'],
        }),
        completePayoutRequest: builder.mutation({
            query: (id) => ({
                url: `/admin/payouts/${id}/complete`,
                method: 'POST',
            }),
            invalidatesTags: ['AdminStats'],
        }),
        getAllUsers: builder.query({
            query: () => '/admin/users',
            providesTags: ['User'],
        }),
        getAllCampaignsAdmin: builder.query({
            query: () => '/admin/campaigns',
            providesTags: ['Campaign'],
        }),
        getAllDonationsAdmin: builder.query({
            query: () => '/admin/donations',
            providesTags: ['Donation'],
        }),
    }),
});

export const {
    // Auth hooks
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,

    // Campaign hooks
    useGetCampaignsQuery,
    useGetCampaignByIdQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useDeleteCampaignMutation,

    // Donation hooks
    useCreateDonationMutation,
    useGetDonationHistoryQuery,
    useSimulateRecurringDonationsMutation,

    // Admin hooks
    useGetAdminStatsQuery,
    useGetAllPayoutRequestsQuery,
    useApprovePayoutRequestMutation,
    useRejectPayoutRequestMutation,
    useCompletePayoutRequestMutation,
    useGetAllUsersQuery,
    useGetAllCampaignsAdminQuery,
    useGetAllDonationsAdminQuery,
} = api; 