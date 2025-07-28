import { Filter, Heart, Search } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCampaigns } from '../hooks/useCampaigns';

const categories = ['All', 'Health', 'Education', 'Medical', 'Startups'];

const Browse = () => {
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const { data, isLoading, isError, error } = useCampaigns({ category: category !== 'All' ? category : undefined, search });
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isError && error) toast.error(error.message || 'Failed to load campaigns');
    }, [isError, error]);

    const campaigns = data?.campaigns || [];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Amazing Campaigns</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Find and support causes that matter to you. Every donation makes a difference.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search campaigns..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <select
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Campaigns Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="text-center py-16">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600 text-lg">Loading campaigns...</p>
                        </div>
                    ) : isError ? (
                        <div className="text-center py-16">
                            <p className="text-red-600 text-lg">Failed to load campaigns. Please try again later.</p>
                        </div>
                    ) : campaigns.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="text-gray-400" size={40} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {campaigns.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                                >
                                    <div className="relative overflow-hidden">
                                        {campaign.coverImage ? (
                                            <img
                                                src={campaign.coverImage}
                                                alt={campaign.title}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                                <Heart className="text-blue-400" size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                                                {campaign.category}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                                                {campaign.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {campaign.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {campaign.description}
                                        </p>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-medium text-gray-900">
                                                    {campaign.goalAmount ? Math.min(100, Math.round((campaign.currentAmount / campaign.goalAmount) * 100)) : 0}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${campaign.goalAmount ? Math.min(100, Math.round((campaign.currentAmount / campaign.goalAmount) * 100)) : 0}%`
                                                    }}
                                                />
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-lg font-bold text-green-600">
                                                        ${campaign.currentAmount?.toLocaleString() || '0'}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        of ${campaign.goalAmount?.toLocaleString() || '0'} goal
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {campaign.donorCount || 0}
                                                    </div>
                                                    <div className="text-sm text-gray-500">donors</div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                                            onClick={e => { e.stopPropagation(); navigate(`/campaigns/${campaign.id}`); }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Browse; 