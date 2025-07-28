import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        if (step === 1) {
            try {
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                    credentials: 'include',
                });
                let data;
                try {
                    data = await res.json();
                } catch (jsonErr) {
                    throw new Error('Unexpected server response.');
                }
                if (!res.ok) throw new Error(data.message || 'Login failed. Please check your credentials.');
                setStep(2);
                toast.success('OTP has been sent to your email.');
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        } else if (step === 2) {
            try {
                const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: form.email, otp }),
                    credentials: 'include',
                });
                let data;
                try {
                    data = await res.json();
                } catch (jsonErr) {
                    throw new Error('Unexpected server response.');
                }
                if (!res.ok) throw new Error(data.message || 'OTP verification failed.');
                login(data.user);
                toast.success('Signed in successfully!');
                navigate('/');
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)', color: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2.5rem 2rem', maxWidth: 400, width: '100%' }}>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center', color: '#0a58f7' }}>Log In</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16 }} disabled={step === 2} />
                    {step === 1 && (
                        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16 }} />
                    )}
                    {step === 2 && (
                        <input name="otp" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" type="text" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 12, fontSize: 16, letterSpacing: 4, textAlign: 'center' }} />
                    )}
                    <button type="submit" disabled={isLoading} style={{ background: 'linear-gradient(90deg, #0a58f7 0%, #4f46e5 100%)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer', marginTop: 8, width: '100%' }}>
                        {isLoading ? (step === 1 ? 'Logging in...' : 'Verifying OTP...') : (step === 1 ? 'Log In' : 'Verify OTP')}
                    </button>
                </form>
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <span style={{ color: '#263238' }}>Don't have an account? </span>
                    <Link to="/register" style={{ color: '#0a58f7', fontWeight: 700 }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login; 