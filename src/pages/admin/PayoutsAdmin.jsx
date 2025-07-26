import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts/AuthContext';

const PayoutsAdmin = () => {
    const { user } = useAuthContext();
    const [payouts, setPayouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [captcha, setCaptcha] = React.useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/admin/payouts', {
            // Remove all token and Authorization header usage
        })
            .then(res => res.json())
            .then(data => {
                setPayouts(data.payouts || []);
                setIsLoading(false);
            })
            .catch(err => {
                setError('Failed to load payout requests.');
                setIsLoading(false);
            });
    }, [user]);

    const handleAction = async (id, action) => {
        if (!captcha) {
            toast.error('Please complete the CAPTCHA');
            return;
        }
        try {
            const res = await fetch(`/api/admin/payouts/${id}/${action}`, {
                method: 'POST',
                // No Authorization header needed
            });
            if (!res.ok) throw new Error('Failed to update payout status');
            toast.success(`Payout ${action}d`);
            setPayouts(payouts => payouts.map(p => p.id === id ? { ...p, status: action === 'approve' ? 'APPROVED' : action === 'reject' ? 'REJECTED' : 'COMPLETED' } : p));
        } catch (err) {
            toast.error(err.message || `Failed to ${action} payout`);
        }
    };

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (payouts.length === 0) {
        return <div>No payout requests found.</div>;
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)', color: '#222', padding: '2rem 0' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem' }}>
                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center', color: '#0a58f7' }}>Payout Requests</h2>
                <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={setCaptcha}
                    style={{ margin: '16px 0', display: 'flex', justifyContent: 'center' }}
                />
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f9fafb', borderRadius: 12, overflow: 'hidden', marginTop: 16 }}>
                    <thead style={{ background: '#e0e7ff' }}>
                        <tr>
                            <th style={{ padding: 12, fontWeight: 700 }}>ID</th>
                            <th style={{ padding: 12, fontWeight: 700 }}>Amount</th>
                            <th style={{ padding: 12, fontWeight: 700 }}>Status</th>
                            <th style={{ padding: 12, fontWeight: 700 }}>Requested At</th>
                            <th style={{ padding: 12, fontWeight: 700 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payouts.map((payout) => (
                            <tr key={payout.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                                <td style={{ padding: 12 }}>{payout.id}</td>
                                <td style={{ padding: 12 }}>${payout.amount}</td>
                                <td style={{ padding: 12 }}>{payout.status}</td>
                                <td style={{ padding: 12 }}>{new Date(payout.requestedAt).toLocaleDateString()}</td>
                                <td style={{ padding: 12 }}>
                                    {payout.status === 'PENDING' && (
                                        <>
                                            <button style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 700, cursor: 'pointer', marginRight: 8 }} onClick={() => handleAction(payout.id, 'approve')}>Approve</button>
                                            <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 700, cursor: 'pointer' }} onClick={() => handleAction(payout.id, 'reject')}>Reject</button>
                                        </>
                                    )}
                                    {payout.status === 'APPROVED' && <span style={{ color: '#22c55e', fontWeight: 700 }}>Approved</span>}
                                    {payout.status === 'REJECTED' && <span style={{ color: '#ef4444', fontWeight: 700 }}>Rejected</span>}
                                    {payout.status === 'COMPLETED' && <span style={{ color: '#0a58f7', fontWeight: 700 }}>Completed</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayoutsAdmin;