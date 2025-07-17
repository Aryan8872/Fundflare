import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCreateDonationMutation } from '../api/api';

const DonationModal = ({ campaign, onClose }) => {
    const [formData, setFormData] = useState({
        amount: '',
        type: 'ONE_TIME',
    });
    const [createDonation, { isLoading }] = useCreateDonationMutation();
    const [receipt, setReceipt] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
            toast.error('Please enter a valid donation amount');
            return;
        }
        try {
            const donationData = {
                campaignId: campaign.id,
                amount: Number(formData.amount),
                type: formData.type,
            };
            await createDonation(donationData).unwrap();
            setReceipt({
                amount: donationData.amount,
                campaign: campaign.title,
                type: donationData.type,
                date: new Date().toLocaleString(),
            });
            toast.success('Thank you for your donation!');
        } catch (error) {
            toast.error(error.data?.message || 'Failed to process donation');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                <div className="relative p-8 border-b border-gray-100">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                        aria-label="Close donation modal"
                    >
                        <FaTimes />
                    </button>
                    <div className="text-center">
                        <h2 className="text-3xl font-PoppinsBold text-gray-900 mb-2">Donate to {campaign.title}</h2>
                        <p className="text-gray-600 font-PoppinsRegular">Support this campaign and make a difference!</p>
                    </div>
                </div>
                {receipt ? (
                    <div className="p-8 text-center">
                        <h3 className="text-2xl font-PoppinsBold text-primaryGreen mb-4">Thank you for your donation!</h3>
                        <div className="bg-green-50 rounded-xl p-6 mb-4">
                            <p className="text-lg font-PoppinsMedium text-gray-900 mb-2">Receipt</p>
                            <div className="text-gray-700 font-PoppinsRegular mb-1">Amount: <span className="font-PoppinsBold">${receipt.amount}</span></div>
                            <div className="text-gray-700 font-PoppinsRegular mb-1">Campaign: <span className="font-PoppinsBold">{receipt.campaign}</span></div>
                            <div className="text-gray-700 font-PoppinsRegular mb-1">Type: <span className="font-PoppinsBold">{receipt.type === 'ONE_TIME' ? 'One-Time' : 'Recurring'}</span></div>
                            <div className="text-gray-700 font-PoppinsRegular">Date: <span className="font-PoppinsBold">{receipt.date}</span></div>
                        </div>
                        <button
                            className="bg-primaryGreen text-white px-8 py-3 rounded-xl font-PoppinsBold text-lg hover:bg-green-700 transition-colors shadow-lg"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div>
                            <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Donation Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                min="1"
                                step="any"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryGreen focus:border-transparent transition-all"
                                placeholder="Enter amount (USD)"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Donation Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryGreen focus:border-transparent transition-all"
                            >
                                <option value="ONE_TIME">One-Time</option>
                                <option value="RECURRING">Monthly (Recurring)</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primaryGreen text-white py-3 px-4 rounded-xl font-PoppinsBold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-primaryGreen focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? 'Processing...' : 'Donate Now'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default DonationModal; 