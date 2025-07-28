import { Calendar, Edit, Lock, Mail, Save, Shield, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSave = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Failed to update profile');
            const { user: updated } = await res.json();
            setUser(updated);
            setSuccess('Profile updated successfully!');
            setEditing(false);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setForm({ name: user?.name || '', email: user?.email || '', password: '' });
        setError(null);
        setSuccess(null);
    };

    if (!user) return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Not logged in.</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Profile</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Manage your account information and preferences.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        {/* User Info Header */}
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="text-white" size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name || user.email}</h2>
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Shield size={14} />
                                    <span className="capitalize">{user.role?.toLowerCase()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSave} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <User className="inline mr-2" size={16} />
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                    disabled={!editing}
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Mail className="inline mr-2" size={16} />
                                    Email Address
                                </label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    type="email"
                                    required
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                    disabled={!editing}
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Lock className="inline mr-2" size={16} />
                                    New Password
                                </label>
                                <input
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter new password (leave blank to keep current)"
                                    type="password"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                    disabled={!editing}
                                />
                                {!editing && (
                                    <p className="text-sm text-gray-500 mt-1">Click edit to change your password</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-6 border-t border-gray-200">
                                {editing ? (
                                    <>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={16} />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center gap-2"
                                        >
                                            <X size={16} />
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setEditing(true)}
                                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                                    >
                                        <Edit size={16} />
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Status Messages */}
                        {error && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-center gap-2 text-red-700">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span className="font-medium">{error}</span>
                                </div>
                            </div>
                        )}
                        {success && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <div className="flex items-center gap-2 text-green-700">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="font-medium">{success}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Account Info */}
                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">Account Type</span>
                                <span className="font-medium capitalize">{user.role?.toLowerCase()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">Member Since</span>
                                <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-600">Account Status</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 