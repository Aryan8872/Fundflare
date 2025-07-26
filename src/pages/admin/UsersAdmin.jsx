import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAdminUsers, useDeactivateUser, useUpdateUserRole } from '../../hooks/useAdminUsers';

const UsersAdmin = () => {
    const { user } = useAuthContext();
    const { data, isLoading, isError, error } = useAdminUsers();
    const { mutate: updateRole } = useUpdateUserRole();
    const { mutate: deactivate } = useDeactivateUser();
    const users = data?.users || [];
    const [captcha, setCaptcha] = React.useState(null);

    if (user === undefined) {
        return <div>Loading...</div>;
    }
    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="max-w-2xl mx-auto py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                <p className="text-gray-600">You do not have permission to view this page.</p>
            </div>
        );
    }

    const handleRoleChange = (userId, role) => {
        if (!captcha) {
            toast.error('Please complete the CAPTCHA');
            return;
        }
        updateRole(
            { userId, role, captcha },
            {
                onSuccess: () => toast.success('Role updated'),
                onError: (err) => toast.error(err.message || 'Failed to update role'),
            }
        );
    };

    const handleDeactivate = (userId) => {
        if (!captcha) {
            toast.error('Please complete the CAPTCHA');
            return;
        }
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            deactivate(userId, {
                onSuccess: () => toast.success('User deactivated'),
                onError: (err) => toast.error(err.message || 'Failed to deactivate user'),
            });
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)', color: '#222', padding: '2rem 0' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem' }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center', color: '#0a58f7' }}>User Management</h1>
                <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={setCaptcha}
                    style={{ margin: '16px 0' }}
                />
                {isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div style={{ color: 'red', textAlign: 'center' }}>{error.message || 'Failed to load users.'}</div>
                ) : users.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>No users found.</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f9fafb', borderRadius: 12, overflow: 'hidden' }}>
                        <thead style={{ background: '#e0e7ff' }}>
                            <tr>
                                <th style={{ padding: 12, fontWeight: 700 }}>Name</th>
                                <th style={{ padding: 12, fontWeight: 700 }}>Email</th>
                                <th style={{ padding: 12, fontWeight: 700 }}>Role</th>
                                <th style={{ padding: 12, fontWeight: 700 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: 12 }}>{u.name}</td>
                                    <td style={{ padding: 12 }}>{u.email}</td>
                                    <td style={{ padding: 12 }}>
                                        <select
                                            value={u.role}
                                            onChange={e => handleRoleChange(u.id, e.target.value)}
                                            style={{ borderRadius: 6, padding: 6, border: '1px solid #cbd5e1' }}
                                        >
                                            <option value="DONOR">Donor</option>
                                            <option value="CREATOR">Creator</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </td>
                                    <td style={{ padding: 12 }}>
                                        <button
                                            style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 700, cursor: 'pointer' }}
                                            onClick={() => handleDeactivate(u.id)}
                                        >
                                            Deactivate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UsersAdmin; 