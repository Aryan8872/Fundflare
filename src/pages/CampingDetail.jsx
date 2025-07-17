import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCampaignByIdQuery, useGetDonationHistoryQuery } from "../api/api";
import DonationModal from "../components/DonationModal";
import { useAuth } from "../hooks/useAuth";

const CampaignDetail = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();
    const [showDonation, setShowDonation] = useState(false);
    const { data: campaign, isLoading, error } = useGetCampaignByIdQuery(id);
    const { data: donationHistory } = useGetDonationHistoryQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error || !campaign) return <div>Campaign not found</div>;

    const handleDonate = () => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }
        setShowDonation(true);
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                <img
                    src={campaign.coverImage || "/assets/images/campingtentimage.png"}
                    alt={campaign.title}
                    className="w-full h-64 md:h-96 object-cover"
                />
            </div>
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-PoppinsBold mb-4 text-primaryGreen">{campaign.title}</h1>
                <p className="text-lg font-PoppinsRegular mb-6 text-gray-700">{campaign.description}</p>
                <div className="flex gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-PoppinsMedium">{campaign.category}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-PoppinsMedium">Goal: ${campaign.goalAmount}</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-PoppinsMedium">Raised: ${campaign.currentAmount}</span>
                </div>
                <button
                    className="bg-primaryGreen text-white px-8 py-4 rounded-xl font-PoppinsBold text-lg hover:bg-green-700 transition-colors shadow-lg"
                    onClick={handleDonate}
                >
                    Donate Now
                </button>
            </div>
            {/* Donation Modal */}
            {showDonation && (
                <DonationModal
                    campaign={campaign}
                    onClose={() => setShowDonation(false)}
                />
            )}
            {/* Donation History/Stats */}
            <div className="mb-8">
                <h2 className="text-xl font-PoppinsBold mb-4 text-primaryGreen">Recent Donations</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    {donationHistory?.donations?.filter(d => d.campaignId === campaign.id).length === 0 ? (
                        <p className="text-gray-600">No donations yet. Be the first to donate!</p>
                    ) : (
                        <ul>
                            {donationHistory.donations.filter(d => d.campaignId === campaign.id).map(donation => (
                                <li key={donation.id} className="mb-2">
                                    <span className="font-PoppinsMedium">${donation.amount}</span> by {donation.donorId === user?.id ? 'You' : 'Anonymous'} on {new Date(donation.date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampaignDetail; 