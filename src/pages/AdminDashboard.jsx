import { Calendar, CreditCard, DollarSign, Eye, Target, TrendingUp, Users } from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';
import UserLogs from '../components/admin/UserLogs';
import { useAuthContext } from '../contexts/AuthContext';
import { useAdminStats } from '../hooks/useAdmin';

const AdminDashboard = () => {
    const { user } = useAuthContext();
    const { data, isLoading, isError, error } = useAdminStats();

    if (user === undefined) {
        return (
            <div className="min-h-screen bg-white">
                <div className="flex justify-center items-center h-64">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-2xl mx-auto py-16 text-center">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="text-red-600" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-gray-900">Access Denied</h1>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="flex justify-center items-center h-64">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-white">
                <div className="flex justify-center items-center h-64 text-red-500">
                    {error.message || 'Failed to load admin stats.'}
                </div>
            </div>
        );
    }

    const stats = data?.stats || {};
    const recentDonations = data?.recentDonations || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="lg:ml-64 flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Monitor and manage your fundraising platform</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Users className="text-blue-600" size={24} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <TrendingUp size={16} />
                            <span className="ml-1">+12% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalCampaigns || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Target className="text-green-600" size={24} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <TrendingUp size={16} />
                            <span className="ml-1">+8% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalDonations || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <DollarSign className="text-yellow-600" size={24} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <TrendingUp size={16} />
                            <span className="ml-1">+15% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Payouts</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalPayouts || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <CreditCard className="text-purple-600" size={24} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-green-600">
                            <TrendingUp size={16} />
                            <span className="ml-1">+5% from last month</span>
                        </div>
                    </div>
                </div>

                {/* Recent Donations */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Donations</h2>
                        <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
                    </div>
                    {recentDonations.length === 0 ? (
                        <div className="text-center py-12">
                            <DollarSign className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-gray-500">No recent donations.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-4 px-4 font-semibold text-gray-900">Donor</th>
                                        <th className="text-left py-4 px-4 font-semibold text-gray-900">Campaign</th>
                                        <th className="text-left py-4 px-4 font-semibold text-gray-900">Amount</th>
                                        <th className="text-left py-4 px-4 font-semibold text-gray-900">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentDonations.map((d, i) => (
                                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                        <Users className="text-blue-600" size={16} />
                                                    </div>
                                                    <span className="font-medium text-gray-900">
                                                        {d.donor?.name || 'Anonymous'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-gray-700">{d.campaign?.title || 'N/A'}</td>
                                            <td className="py-4 px-4">
                                                <span className="font-semibold text-green-600">
                                                    ${d.amount?.toLocaleString() || '0'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600">
                                                <div className="flex items-center">
                                                    <Calendar size={14} className="mr-2" />
                                                    {new Date(d.date).toLocaleDateString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* User Activity Logs */}
                <UserLogs />
            </div>
        </div>
    );
};

export default AdminDashboard; 