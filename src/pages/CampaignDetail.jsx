import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DonationModal from '../components/DonationModal';
import { useAuthContext } from '../contexts/AuthContext';
import { useCampaign } from '../hooks/useCampaigns';

const CampaignDetail = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useCampaign(id);
    const [donateOpen, setDonateOpen] = useState(false);
    const [updates, setUpdates] = useState([]);
    const [newUpdate, setNewUpdate] = useState('');
    const { user } = useAuthContext();

    useEffect(() => {
        fetch(`/api/campaigns/${id}/updates`)
            .then(res => res.json())
            .then(data => setUpdates(data.updates || []));
    }, [id]);

    const handleAddUpdate = async (e) => {
        e.preventDefault();
        if (!newUpdate.trim()) return;
        const res = await fetch(`/api/campaigns/${id}/updates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: user?.token ? `Bearer ${user.token}` : undefined,
            },
            body: JSON.stringify({ content: newUpdate }),
        });
        if (res.ok) {
            const { update } = await res.json();
            setUpdates([update, ...updates]);
            setNewUpdate('');
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
    if (isError) return <div className="flex justify-center items-center h-64 text-red-500">{error.message || 'Failed to load campaign.'}</div>;

    const c = data?.campaign;
    if (!c) return <div className="text-center py-16">Campaign not found.</div>;

    const progress = Math.min(100, (c.currentAmount / c.goalAmount) * 100);
    const percentFunded = ((c.currentAmount / c.goalAmount) * 100).toFixed(1);
    const canUpdate = user && (user.role === 'ADMIN' || user.id === c.creatorId);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Title and Organizer */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-1">{c.title}</h1>
                <div className="text-gray-500 text-sm mb-2">by <span className="font-semibold">{c.creator?.name || 'Organizer'}</span></div>
            </div>
            {/* Media */}
            {c.coverImage && (
                <div className="mb-6">
                    <img src={c.coverImage} alt={c.title} className="w-full h-64 object-cover rounded-lg shadow" />
                </div>
            )}
            {/* Description & Details */}
            <div className="mb-6 bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row md:gap-8">
                    <div className="flex-1 mb-4 md:mb-0">
                        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
                            <span role="img" aria-label="lightbulb">💡</span> Summary
                        </div>
                        <div className="text-gray-700 mb-4">{c.description}</div>
                        <div className="flex items-center gap-4 mb-2">
                            <span className="flex items-center gap-1 text-gray-600"><span role="img" aria-label="calendar">📅</span> <span>Duration:</span> <span className="font-medium">{c.duration} days</span></span>
                        </div>
                        {c.location && (
                            <div className="flex items-center gap-1 text-gray-600 mb-2">
                                <span role="img" aria-label="location">📍</span> {c.location}
                            </div>
                        )}
                    </div>
                    <div className="w-full md:w-72 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                            <span role="img" aria-label="target">🎯</span> Goal
                        </div>
                        <div className="text-gray-700 text-xl font-bold mb-1">${c.goalAmount?.toLocaleString()}</div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <span role="img" aria-label="money">💰</span> Raised: <span className="font-bold">${c.currentAmount?.toLocaleString()}</span> <span className="ml-2">({percentFunded}% funded)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded h-3">
                            <div className="bg-blue-600 h-3 rounded" style={{ width: `${progress}%` }} />
                        </div>
                        <button
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold"
                            onClick={() => setDonateOpen(true)}
                        >
                            💳 Donate
                        </button>
                    </div>
                </div>
            </div>
            {/* About Organizer / Team */}
            <div className="mb-6 bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
                    <span role="img" aria-label="organizer">👤</span> About the Organizer
                </div>
                <div className="text-gray-700">{c.creator?.name ? `${c.creator.name} is the organizer of this campaign.` : 'Organizer information coming soon.'}</div>
            </div>
            {/* Campaign Updates/Comments */}
            <div className="mb-6 bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                    <span role="img" aria-label="updates">📝</span> Campaign Updates
                </div>
                {canUpdate && (
                    <form onSubmit={handleAddUpdate} className="mb-4 flex gap-2">
                        <input
                            className="flex-1 border rounded px-3 py-2"
                            value={newUpdate}
                            onChange={e => setNewUpdate(e.target.value)}
                            placeholder="Add an update..."
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
                    </form>
                )}
                <div className="space-y-3">
                    {updates.length === 0 ? (
                        <div className="text-gray-500">No updates yet.</div>
                    ) : (
                        updates.map(u => (
                            <div key={u.id} className="border-b pb-2">
                                <div className="text-gray-800">{u.content}</div>
                                <div className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleString()}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* Donation Modal */}
            <DonationModal open={donateOpen} onClose={() => setDonateOpen(false)} campaignId={c.id} />
        </div>
    );
};

export default CampaignDetail; 