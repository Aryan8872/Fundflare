import React from 'react';
import { useCampaigns } from '../hooks/useCampaigns';

const Invest = () => {
    const { data, isLoading, isError, error } = useCampaigns();
    const campaigns = data?.campaigns || [];
    return (
        <div className="min-h-screen bg-gray-50 text-blue-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-900 text-white py-16 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-extrabold mb-4">Invest in the Future, Today</h1>
                    <p className="text-lg text-blue-100 mb-8">
                        Discover and invest in innovative startups and projects. Grow your portfolio and make a positive impact.
                    </p>
                </div>
            </section>
            {/* Campaigns Grid */}
            <section className="bg-gray-50 text-blue-900 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8">Available Campaigns</h2>
                    {isLoading && <div>Loading campaigns...</div>}
                    {isError && <div className="text-red-500">{error.message || 'Failed to load campaigns.'}</div>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {campaigns.map((c) => (
                            <div key={c.id} className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[380px]">
                                <img src={c.coverImage || `https://source.unsplash.com/400x200/?startup,finance,${c.id}`} alt={c.title} className="w-full h-40 object-cover rounded mb-3" />
                                <h3 className="text-lg font-semibold mb-1 text-blue-800">{c.title}</h3>
                                <p className="text-gray-600 mb-2 line-clamp-3 flex-1">{c.description}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <span className="bg-blue-100 text-blue-700 rounded px-2 py-1 text-xs font-medium">{c.category}</span>
                                </div>
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="font-bold text-blue-700">${c.currentAmount?.toLocaleString() || 0}</span>
                                    <span className="text-gray-500 text-sm">Raised</span>
                                    <span className="font-bold text-blue-700 ml-4">${c.goalAmount?.toLocaleString() || 0}</span>
                                    <span className="text-gray-500 text-sm">Goal</span>
                                </div>
                            </div>
                        ))}
                        {(!isLoading && campaigns.length === 0) && <div>No campaigns found.</div>}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Invest; 