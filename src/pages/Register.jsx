import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [captcha, setCaptcha] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const validatePassword = (password) => {
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
        if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        if (!captcha) {
            setError('Please complete the CAPTCHA');
            setIsLoading(false);
            return;
        }
        const passwordError = validatePassword(form.password);
        if (passwordError) {
            setError(passwordError);
            setIsLoading(false);
            return;
        }
        try {
            // Fetch CSRF token from backend
            const csrfRes = await fetch('http://localhost:5000/api/auth/csrf-token', { credentials: 'include' });
            const { csrfToken } = await csrfRes.json();
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ ...form, captcha }),
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Registration failed. Please try again.');
            await res.json();
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)', color: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2.5rem 2rem', maxWidth: 400, width: '100%' }}>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center', color: '#0a58f7' }}>Sign Up</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16 }} />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16 }} />
                    <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16 }} />
                    <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={setCaptcha}
                        style={{ margin: '16px 0' }}
                    />
                    <button type="submit" disabled={isLoading} style={{ background: 'linear-gradient(90deg, #0a58f7 0%, #4f46e5 100%)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer', marginTop: 8, width: '100%' }}>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                {error && <div style={{ color: 'red', marginTop: 16, textAlign: 'center' }}>{error}</div>}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <span style={{ color: '#263238' }}>Already have an account? </span>
                    <Link to="/login" style={{ color: '#0a58f7', fontWeight: 700 }}>Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register; 