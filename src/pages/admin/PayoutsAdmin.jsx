import { Calendar, CheckCircle, Clock, CreditCard, DollarSign, Shield, TrendingUp, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import Sidebar from '../../components/admin/Sidebar';
import { useAuthContext } from '../../contexts/AuthContext';

// Utility to fetch CSRF token
async function getCsrfToken() {
    const BACKEND_URL = 'https://localhost:5000';
    const res = await fetch(`${BACKEND_URL}/api/auth/csrf-token`, { credentials: 'include' });
    const data = await res.json();
    return data.csrfToken;
}

const PayoutsAdmin = () => {
    const { user } = useAuthContext();
    const [payouts, setPayouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [captcha, setCaptcha] = React.useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/admin/payouts', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setPayouts(data.payouts || []);
                setIsLoading(false);
            })
            .catch(err => {
                setError('Failed to load payout requests.');
                setIsLoading(false);
            });
    }, [user]);

    const handleAction = async (id, action) => {
        if (!captcha) {
            toast.error('Please complete the CAPTCHA');
            return;
        }
        try {
            const csrfToken = await getCsrfToken();
            const BACKEND_URL = 'https://localhost:5000';
            const res = await fetch(`${BACKEND_URL}/api/admin/payouts/${id}/${action}`, {
                method: 'POST',
                headers: {
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to update payout status');
            toast.success(`Payout ${action}d`);
            setPayouts(payouts => payouts.map(p => p.id === id ? { ...p, status: action === 'approve' ? 'APPROVED' : action === 'reject' ? 'REJECTED' : 'COMPLETED' } : p));
        } catch (err) {
            toast.error(err.message || `Failed to ${action} payout`);
        }
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED': return 'bg-green-100 text-green-700';
            case 'REJECTED': return 'bg-red-100 text-red-700';
            case 'COMPLETED': return 'bg-blue-100 text-blue-700';
            default: return 'bg-yellow-100 text-yellow-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'APPROVED': return <CheckCircle size={16} className="text-green-600" />;
            case 'REJECTED': return <XCircle size={16} className="text-red-600" />;
            case 'COMPLETED': return <CheckCircle size={16} className="text-blue-600" />;
            default: return <Clock size={16} className="text-yellow-600" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="lg:ml-64 flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Payout Management</h1>
                    <p className="text-gray-600">Review and process payout requests from campaign creators</p>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <Shield className="text-blue-600 mt-0.5" size={20} />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-900 mb-1">Security Required</h4>
                            <p className="text-sm text-blue-700 mb-4">
                                Complete the CAPTCHA below to perform payout actions like approve, reject, or complete.
                            </p>
                            <ReCAPTCHA
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={setCaptcha}
                            />
                        </div>
                    </div>
                </div>

                {/* Payouts Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600">Loading payouts...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16 text-red-600">{error}</div>
                    ) : payouts.length === 0 ? (
                        <div className="text-center py-16">
                            <CreditCard className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-gray-600">No payout requests found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Request ID</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Campaign</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Requested</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payouts.map((payout) => (
                                        <tr key={payout.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="font-mono text-sm text-gray-600">#{payout.id}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-900">
                                                    {payout.campaign?.title || 'Unknown Campaign'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    by {payout.campaign?.creator?.name || 'Unknown Creator'}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign size={16} className="text-green-500" />
                                                    <span className="font-semibold text-green-600">
                                                        ${payout.amount?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(payout.status)}
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                                                        {payout.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} className="text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {new Date(payout.requestedAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {payout.status === 'PENDING' ? (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            onClick={() => handleAction(payout.id, 'approve')}
                                                            title="Approve Payout"
                                                        >
                                                            <CheckCircle size={16} />
                                                        </button>
                                                        <button
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            onClick={() => handleAction(payout.id, 'reject')}
                                                            title="Reject Payout"
                                                        >
                                                            <XCircle size={16} />
                                                        </button>
                                                    </div>
                                                ) : payout.status === 'APPROVED' ? (
                                                    <button
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                        onClick={() => handleAction(payout.id, 'complete')}
                                                    >
                                                        Complete
                                                    </button>
                                                ) : (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                                                        {payout.status}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Payout Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{payouts.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <CreditCard className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {payouts.filter(p => p.status === 'PENDING').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Clock className="text-yellow-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Approved</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {payouts.filter(p => p.status === 'APPROVED').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${payouts.reduce((sum, p) => sum + (p.amount || 0), 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayoutsAdmin;