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
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Failed to update profile');
            const { user: updated } = await res.json();
            setUser(updated);
            setSuccess('Profile updated!');
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

    if (!user) return <div className="p-8">Not logged in.</div>;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)', color: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2.5rem 2rem', maxWidth: 400, width: '100%' }}>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center', color: '#0a58f7' }}>Profile</h2>
                <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16 }} disabled={!editing} />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16 }} disabled={!editing} />
                    <input name="password" value={form.password} onChange={handleChange} placeholder="New Password" type="password" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16 }} disabled={!editing} />
                    <div style={{ display: 'flex', gap: 8 }}>
                        {editing ? (
                            <>
                                <button type="button" onClick={handleSave} style={{ background: 'linear-gradient(90deg, #0a58f7 0%, #4f46e5 100%)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, cursor: 'pointer', width: '100%' }}>Save</button>
                                <button type="button" onClick={handleCancel} style={{ background: '#e5e7eb', color: '#222', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, cursor: 'pointer', width: '100%' }}>Cancel</button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setEditing(true)} style={{ background: 'linear-gradient(90deg, #0a58f7 0%, #4f46e5 100%)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, cursor: 'pointer', width: '100%' }}>Edit</button>
                        )}
                    </div>
                </form>
                {error && <div style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: 16, textAlign: 'center' }}>{success}</div>}
            </div>
        </div>
    );
};

export default Profile; 