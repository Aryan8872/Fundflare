import { Calendar, CheckCircle, Mail, Shield, Users, UserX } from 'lucide-react';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import Sidebar from '../../components/admin/Sidebar';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAdminUsers, useDeactivateUser, useUpdateUserRole } from '../../hooks/useAdminUsers';

// Utility to fetch CSRF token
async function getCsrfToken() {
    const BACKEND_URL = 'https://localhost:5000';
    const res = await fetch(`${BACKEND_URL}/api/auth/csrf-token`, { credentials: 'include' });
    const data = await res.json();
    return data.csrfToken;
}

const UsersAdmin = () => {
    const { user } = useAuthContext();
    const { data, isLoading, isError, error } = useAdminUsers();
    const { mutate: updateRole } = useUpdateUserRole();
    const { mutate: deactivate } = useDeactivateUser();
    const users = data?.users || [];
    const [captcha, setCaptcha] = React.useState(null);

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

    const handleRoleChange = async (userId, role) => {
        if (!captcha) {
            toast.error('Please complete the CAPTCHA');
            return;
        }
        try {
            const csrfToken = await getCsrfToken();
            const BACKEND_URL = 'https://localhost:5000';
            const res = await fetch(`${BACKEND_URL}/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({ role }),
            });
            if (!res.ok) throw new Error('Failed to update role');
            toast.success('Role updated');
        } catch (err) {
            toast.error(err.message || 'Failed to update role');
        }
    };

    const handleDeactivate = async (userId) => {
        if (!captcha) {
            toast.error('Please complete the CAPTCHA');
            return;
        }
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            try {
                const csrfToken = await getCsrfToken();
                const BACKEND_URL = 'https://localhost:5000';
                const res = await fetch(`${BACKEND_URL}/api/admin/users/${userId}/deactivate`, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-Token': csrfToken
                    },
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Failed to deactivate user');
                toast.success('User deactivated');
            } catch (err) {
                toast.error(err.message || 'Failed to deactivate user');
            }
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'ADMIN': return 'bg-red-100 text-red-700';
            case 'CREATOR': return 'bg-blue-100 text-blue-700';
            case 'DONOR': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="lg:ml-64 flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">User Management</h1>
                    <p className="text-gray-600">Manage user accounts and permissions</p>
                </div>

                {/* Stats Summary - moved to top */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Users className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Admins</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.filter(u => u.role === 'ADMIN').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <Shield className="text-red-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Creators</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.filter(u => u.role === 'CREATOR').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Donors</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.filter(u => u.role === 'DONOR').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Users className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <Shield className="text-blue-600 mt-0.5" size={20} />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-900 mb-1">Security Required</h4>
                            <p className="text-sm text-blue-700 mb-4">
                                Complete the CAPTCHA below to perform sensitive actions like role changes and user deactivation.
                            </p>
                            <ReCAPTCHA
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={setCaptcha}
                            />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600">Loading users...</span>
                        </div>
                    ) : isError ? (
                        <div className="text-center py-16 text-red-600">{error.message || 'Failed to load users.'}</div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-16">
                            <Users className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-gray-600">No users found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Joined</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                        <Users className="text-white" size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{u.name || 'Unnamed User'}</div>
                                                        <div className="text-sm text-gray-500">ID: {u.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-gray-400" />
                                                    <span className="text-gray-700">{u.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <select
                                                    value={u.role}
                                                    onChange={e => handleRoleChange(u.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getRoleColor(u.role)}`}
                                                >
                                                    <option value="DONOR">Donor</option>
                                                    <option value="CREATOR">Creator</option>
                                                    <option value="ADMIN">Admin</option>
                                                </select>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${u.status === 'deactivated' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>{u.status === 'deactivated' ? 'Deactivated' : 'Active'}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} className="text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {new Date(u.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        onClick={() => handleDeactivate(u.id)}
                                                        title="Deactivate User"
                                                    >
                                                        <UserX size={16} />
                                                    </button>
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

export default UsersAdmin; 