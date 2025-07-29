import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/AuthContext';
import { useCreateDonation } from '../hooks/useDonations';

const DonationModal = ({ open, onClose, campaignId }) => {
    const [amount, setAmount] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const { user } = useAuthContext();
    const { mutate, isLoading } = useCreateDonation();
    const stripePromise = loadStripe('pk_test_51RooXv5hlGq5vdMYgk4VlQyHkDVeFhpbKu78sAaVDI4vy4FuLpaC5D8yZZSsYyRgt5BGA2Zuv8EtC89WcvrpaeYP000wfeQDqz');
    const [captcha, setCaptcha] = useState(null);

    if (!open) return null;

    const handleStripeCheckout = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        if (!user && !guestEmail) {
            toast.error('Please enter your email to donate as a guest');
            return;
        }
        if (!captcha) {
            toast.error('Please complete the CAPTCHA');
            return;
        }
        try {
            // Fetch CSRF token
            const csrfRes = await fetch('https://localhost:5000/api/auth/csrf-token', { credentials: 'include' });
            const { csrfToken } = await csrfRes.json();
            const res = await fetch('https://localhost:5000/api/donations/stripe-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({
                    campaignId,
                    amount: Number(amount),
                    guestEmail: user ? undefined : guestEmail,
                    captcha
                }),
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to initiate payment');
            const { sessionId } = await res.json();
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId });
        } catch (err) {
            toast.error(err.message || 'Payment failed');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-2">
                <h2 className="text-2xl font-bold mb-4">Donate to this Campaign</h2>
                <form onSubmit={handleStripeCheckout}>
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
                    <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={setCaptcha}
                        style={{ margin: '16px 0' }}
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">
                            {isLoading ? 'Processing...' : 'Donate with Card'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DonationModal; 