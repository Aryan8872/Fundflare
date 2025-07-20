import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useAdminStats } from '../hooks/useAdmin';

const AdminDashboard = () => {
    const { user } = useAuthContext();
    const { data, isLoading, isError, error } = useAdminStats();

    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="max-w-2xl mx-auto py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                <p className="text-gray-600">You do not have permission to view this page.</p>
            </div>
        );
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }
    if (isError) {
        return <div className="flex justify-center items-center h-64 text-red-500">{error.message || 'Failed to load admin stats.'}</div>;
    }

    const stats = data?.stats || {};
    const recentDonations = data?.recentDonations || [];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-100 rounded shadow p-4 text-center">
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <div className="text-gray-700">Users</div>
                </div>
                <div className="bg-green-100 rounded shadow p-4 text-center">
                    <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
                    <div className="text-gray-700">Campaigns</div>
                </div>
                <div className="bg-yellow-100 rounded shadow p-4 text-center">
                    <div className="text-2xl font-bold">{stats.totalDonations}</div>
                    <div className="text-gray-700">Donations</div>
                </div>
                <div className="bg-purple-100 rounded shadow p-4 text-center">
                    <div className="text-2xl font-bold">{stats.totalPayouts}</div>
                    <div className="text-gray-700">Payouts</div>
                </div>
            </div>
            <div className="bg-white rounded shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
                {recentDonations.length === 0 ? (
                    <div>No recent donations.</div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2 px-2">Donor</th>
                                <th className="py-2 px-2">Campaign</th>
                                <th className="py-2 px-2">Amount</th>
                                <th className="py-2 px-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentDonations.map((d, i) => (
                                <tr key={i} className="border-t">
                                    <td className="py-2 px-2">{d.donor?.name || 'N/A'}</td>
                                    <td className="py-2 px-2">{d.campaign?.title || 'N/A'}</td>
                                    <td className="py-2 px-2">${d.amount}</td>
                                    <td className="py-2 px-2">{new Date(d.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard; 