import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts/AuthContext';

const PayoutsAdmin = () => {
    const { token } = useAuthContext();
    const [payouts, setPayouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/admin/payouts', {
            headers: { Authorization: `Bearer ${token}` },
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
    }, [token]);

    const handleAction = async (id, action) => {
        try {
            const res = await fetch(`/api/admin/payouts/${id}/${action}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`Failed to ${action} payout`);
            toast.success(`Payout ${action}d`);
            setPayouts(payouts => payouts.map(p => p.id === id ? { ...p, status: action === 'approve' ? 'APPROVED' : action === 'reject' ? 'REJECTED' : 'COMPLETED' } : p));
        } catch (err) {
            toast.error(err.message || `Failed to ${action} payout`);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Payout Requests</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : payouts.length === 0 ? (
                <div>No payout requests found.</div>
            ) : (
                <table className="w-full text-left bg-white rounded shadow">
                    <thead>
                        <tr>
                            <th className="py-2 px-2">Campaign</th>
                            <th className="py-2 px-2">Amount</th>
                            <th className="py-2 px-2">Status</th>
                            <th className="py-2 px-2">Requested At</th>
                            <th className="py-2 px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payouts.map((p) => (
                            <tr key={p.id} className="border-t">
                                <td className="py-2 px-2">{p.campaign?.title || 'N/A'}</td>
                                <td className="py-2 px-2">${p.amount}</td>
                                <td className="py-2 px-2">{p.status}</td>
                                <td className="py-2 px-2">{new Date(p.requestedAt).toLocaleDateString()}</td>
                                <td className="py-2 px-2 flex gap-2">
                                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => handleAction(p.id, 'approve')}>Approve</button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleAction(p.id, 'reject')}>Reject</button>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleAction(p.id, 'complete')}>Complete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PayoutsAdmin; 