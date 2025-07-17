import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/api';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const navigate = useNavigate();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form).unwrap();
            navigate('/');
        } catch (err) { }
    };
    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#0a58f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2.5rem 2rem', maxWidth: 400, width: '100%' }}>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required style={{ width: '100%' }} />
                    <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required style={{ width: '100%' }} />
                    <button type="submit" disabled={isLoading} style={{ background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer', marginTop: 16, width: '100%' }}>
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                {isError && <div style={{ color: 'red', marginTop: 16 }}>Login failed. Please check your credentials.</div>}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <span style={{ color: '#263238' }}>Don't have an account? </span>
                    <Link to="/register" style={{ color: '#0a58f7', fontWeight: 700 }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login; 