import { Calendar, DollarSign, Heart, MapPin, MessageSquare, Plus, Target, User } from 'lucide-react';
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
            },
            body: JSON.stringify({ content: newUpdate }),
        });
        if (res.ok) {
            const { update } = await res.json();
            setUpdates([update, ...updates]);
            setNewUpdate('');
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-center items-center h-64">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        </div>
    );

    if (isError) return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-center items-center h-64 text-red-500">
                {error.message || 'Failed to load campaign.'}
            </div>
        </div>
    );

    const c = data?.campaign;
    if (!c) return (
        <div className="min-h-screen bg-white">
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign not found</h2>
                <p className="text-gray-600">The campaign you're looking for doesn't exist.</p>
            </div>
        </div>
    );

    const progress = Math.min(100, (c.currentAmount / c.goalAmount) * 100);
    const percentFunded = ((c.currentAmount / c.goalAmount) * 100).toFixed(1);
    const canUpdate = user && (user.role === 'ADMIN' || user.id === c.creatorId);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {c.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                            {c.status}
                        </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{c.title}</h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <span className="font-medium">{c.creator?.name || 'Organizer'}</span>
                        </div>
                        {c.location && (
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>{c.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Campaign Image */}
                        {c.coverImage && (
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <img src={c.coverImage} alt={c.title} className="w-full h-96 object-cover" />
                            </div>
                        )}

                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this campaign</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{c.description}</p>
                        </div>

                        {/* Campaign Updates */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <MessageSquare className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Campaign Updates</h2>
                            </div>

                            {canUpdate && (
                                <form onSubmit={handleAddUpdate} className="mb-6">
                                    <div className="flex gap-3">
                                        <input
                                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={newUpdate}
                                            onChange={e => setNewUpdate(e.target.value)}
                                            placeholder="Add an update..."
                                        />
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                        >
                                            <Plus size={16} />
                                            Post
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="space-y-4">
                                {updates.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <MessageSquare className="mx-auto mb-2 text-gray-300" size={32} />
                                        <p>No updates yet.</p>
                                    </div>
                                ) : (
                                    updates.map(u => (
                                        <div key={u.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                                            <div className="text-gray-800 mb-2">{u.content}</div>
                                            <div className="text-sm text-gray-400">{new Date(u.createdAt).toLocaleString()}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Progress Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-green-600 mb-1">
                                    ${c.currentAmount?.toLocaleString() || '0'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    raised of ${c.goalAmount?.toLocaleString() || '0'} goal
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="font-medium text-gray-900">{percentFunded}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            <button
                                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                                onClick={() => setDonateOpen(true)}
                            >
                                <Heart size={20} />
                                Donate Now
                            </button>
                        </div>

                        {/* Campaign Details */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Campaign Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-gray-400" size={16} />
                                    <div>
                                        <div className="text-sm text-gray-500">Duration</div>
                                        <div className="font-medium">{c.duration} days</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Target className="text-gray-400" size={16} />
                                    <div>
                                        <div className="text-sm text-gray-500">Category</div>
                                        <div className="font-medium">{c.category}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="text-gray-400" size={16} />
                                    <div>
                                        <div className="text-sm text-gray-500">Goal Amount</div>
                                        <div className="font-medium">${c.goalAmount?.toLocaleString() || '0'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Organizer */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">About the Organizer</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <div className="font-medium">{c.creator?.name || 'Organizer'}</div>
                                    <div className="text-sm text-gray-500">Campaign Creator</div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                                {c.creator?.name ? `${c.creator.name} is the organizer of this campaign.` : 'Organizer information coming soon.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Modal */}
            <DonationModal open={donateOpen} onClose={() => setDonateOpen(false)} campaignId={c.id} />
        </div>
    );
};

export default CampaignDetail; 