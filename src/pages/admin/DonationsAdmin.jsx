import { Calendar, DollarSign, Eye, Filter, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/admin/Sidebar';
import { useAuthContext } from '../../contexts/AuthContext';

const BACKEND_URL = 'https://localhost:5000';

const DonationsAdmin = () => {
    const { user } = useAuthContext();
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/donations`, {
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to fetch donations');
            const data = await res.json();
            setDonations(data.donations || []);
        } catch (err) {
            setError(err.message);
            toast.error('Failed to load donations');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'failed': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return <TrendingUp size={16} className="text-green-600" />;
            case 'pending': return <Calendar size={16} className="text-yellow-600" />;
            case 'failed': return <Eye size={16} className="text-red-600" />;
            default: return <Eye size={16} className="text-gray-600" />;
        }
    };

    const filteredDonations = filter === 'all'
        ? donations
        : donations.filter(d => (d.transaction?.status || 'success') === filter);

    const stats = {
        total: donations.length,
        completed: donations.filter(d => (d.transaction?.status || 'success') === 'success').length,
        pending: donations.filter(d => (d.transaction?.status || 'success') === 'pending').length,
        totalAmount: donations
            .filter(d => (d.transaction?.status || 'success') === 'success')
            .reduce((sum, d) => sum + (d.amount || 0), 0)
    };

    if (user === undefined) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex justify-center items-center h-64">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-2xl mx-auto py-16 text-center">
                    <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="lg:ml-64 flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Donation Management</h1>
                    <p className="text-gray-600">Monitor and track all donations across campaigns</p>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <DollarSign className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Calendar className="text-yellow-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <DollarSign className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex items-center gap-4">
                        <Filter className="text-gray-400" size={20} />
                        <label className="text-sm font-semibold text-gray-700">Filter Donations:</label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Donations</option>
                            <option value="success">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>

                {/* Donations Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600">Loading donations...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16 text-red-600">{error}</div>
                    ) : filteredDonations.length === 0 ? (
                        <div className="text-center py-16">
                            <DollarSign className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-gray-600">No donations found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Donor</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Campaign</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Payment Method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDonations.map((donation) => (
                                        <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-900">
                                                    {donation.donor?.name || donation.guestEmail || 'Anonymous'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {donation.donor?.email || donation.guestEmail || 'Guest Donor'}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-900">
                                                    {donation.campaign?.title || 'Unknown Campaign'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    by {donation.campaign?.creator?.name || 'Unknown Creator'}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign size={16} className="text-green-500" />
                                                    <span className="font-semibold text-green-600">
                                                        ${donation.amount?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(donation.transaction?.status || 'success')}
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.transaction?.status || 'success')}`}>
                                                        {donation.transaction?.status || 'Completed'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(donation.date).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(donation.date).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm text-gray-900">
                                                    {donation.transaction?.provider || 'Stripe'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonationsAdmin; 