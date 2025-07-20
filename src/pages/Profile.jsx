import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
    const { user, setUser, token } = useAuth();
    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Failed to update profile');
            const { user: updated } = await res.json();
            setUser(updated);
            toast.success('Profile updated!');
            setEditing(false);
        } catch (err) {
            toast.error(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="p-8">Not logged in.</div>;

    return (
        <div className="max-w-lg mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            {!editing ? (
                <div>
                    <div className="mb-2"><b>Name:</b> {user.name}</div>
                    <div className="mb-2"><b>Email:</b> {user.email}</div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setEditing(true)}>Edit</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Name" required />
                    <input name="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2" placeholder="Email" required />
                    <input name="password" type="password" value={form.password} onChange={handleChange} className="border rounded px-3 py-2" placeholder="New Password (leave blank to keep)" />
                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                        <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setEditing(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Profile; 