import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts/AuthContext';

const UsersAdmin = () => {
    const { token } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [viewUser, setViewUser] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data.users || []);
                setIsLoading(false);
            })
            .catch(err => {
                setError('Failed to load users.');
                setIsLoading(false);
            });
    }, [token]);

    const handleRoleChange = async (userId, role) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }),
            });
            if (!res.ok) throw new Error('Failed to update user role');
            toast.success('Role updated');
            setUsers(users => users.map(u => u.id === userId ? { ...u, role } : u));
        } catch (err) {
            toast.error(err.message || 'Failed to update role');
        }
    };

    const handleDeactivate = async (userId) => {
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            try {
                const res = await fetch(`/api/admin/users/${userId}/deactivate`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error('Failed to deactivate user');
                toast.success('User deactivated');
                setUsers(users => users.filter(u => u.id !== userId));
            } catch (err) {
                toast.error(err.message || 'Failed to deactivate user');
            }
        }
    };

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            <div className="mb-4 flex gap-4 items-center">
                <input
                    className="border rounded px-3 py-2 flex-1"
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : filtered.length === 0 ? (
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
                        {filtered.map((u) => (
                            <tr key={u.id} className="border-t">
                                <td className="py-2 px-2 cursor-pointer text-blue-700 underline" onClick={() => setViewUser(u)}>{u.name}</td>
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
            {viewUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-2 relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setViewUser(null)}>✕</button>
                        <h2 className="text-2xl font-bold mb-2">{viewUser.name}</h2>
                        <div className="mb-2 text-gray-600">{viewUser.email}</div>
                        <div className="mb-2">Role: <span className="font-semibold">{viewUser.role}</span></div>
                        <div className="mb-2">Joined: <span className="font-semibold">{new Date(viewUser.createdAt).toLocaleDateString()}</span></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersAdmin; 