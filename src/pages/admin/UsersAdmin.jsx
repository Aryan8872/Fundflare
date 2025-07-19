import React from 'react';
import { toast } from 'react-toastify';
import { useAdminUsers, useDeactivateUser, useUpdateUserRole } from '../../hooks/useAdminUsers';

const UsersAdmin = () => {
    const { data, isLoading, isError, error } = useAdminUsers();
    const { mutate: updateRole } = useUpdateUserRole();
    const { mutate: deactivate } = useDeactivateUser();
    const users = data?.users || [];

    const handleRoleChange = (userId, role) => {
        updateRole(
            { userId, role },
            {
                onSuccess: () => toast.success('Role updated'),
                onError: (err) => toast.error(err.message || 'Failed to update role'),
            }
        );
    };

    const handleDeactivate = (userId) => {
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            deactivate(userId, {
                onSuccess: () => toast.success('User deactivated'),
                onError: (err) => toast.error(err.message || 'Failed to deactivate user'),
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div className="text-red-500">{error.message || 'Failed to load users.'}</div>
            ) : users.length === 0 ? (
                <div>No users found.</div>
            ) : (
                <table className="w-full text-left bg-white rounded shadow">
                    <thead>
                        <tr>
                            <th className="py-2 px-2">Name</th>
                            <th className="py-2 px-2">Email</th>
                            <th className="py-2 px-2">Role</th>
                            <th className="py-2 px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t">
                                <td className="py-2 px-2">{u.name}</td>
                                <td className="py-2 px-2">{u.email}</td>
                                <td className="py-2 px-2">
                                    <select
                                        value={u.role}
                                        onChange={e => handleRoleChange(u.id, e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="DONOR">Donor</option>
                                        <option value="CREATOR">Creator</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </td>
                                <td className="py-2 px-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
    );
};

export default UsersAdmin; 