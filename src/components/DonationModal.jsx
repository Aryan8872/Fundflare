import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/AuthContext';
import { useCreateDonation } from '../hooks/useDonations';

const DonationModal = ({ open, onClose, campaignId }) => {
    const [amount, setAmount] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const { user } = useAuthContext();
    const { mutate, isLoading } = useCreateDonation();

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        if (!user && !guestEmail) {
            toast.error('Please enter your email to donate as a guest');
            return;
        }
        mutate(
            { campaignId, amount: Number(amount), type: 'ONE_TIME', guestEmail: user ? undefined : guestEmail },
            {
                onSuccess: () => {
                    toast.success('Donation successful!');
                    setAmount('');
                    setGuestEmail('');
                    onClose();
                },
                onError: (err) => {
                    toast.error(err.message || 'Donation failed');
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-2">
                <h2 className="text-2xl font-bold mb-4">Donate to this Campaign</h2>
                <form onSubmit={handleSubmit}>
                    {!user && (
                        <input
                            type="email"
                            value={guestEmail}
                            onChange={e => setGuestEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                            placeholder="Your email (for receipt)"
                            required
                        />
                    )}
                    <input
                        type="number"
                        min="1"
                        step="any"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                        placeholder="Enter amount"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
                            {isLoading ? 'Processing...' : 'Donate'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DonationModal; 