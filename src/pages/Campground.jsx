import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetCampaignsQuery } from '../api/api';

const Campground = () => {
    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
    });

    const { data: campaignsData, isLoading, error } = useGetCampaignsQuery({
        search: filters.search,
        category: filters.category !== 'All' ? filters.category : undefined,
    });

    const campaigns = campaignsData || [];
    const categories = ["All", "Health", "Education", "Environment", "Community", "Other"];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: 'All',
        });
    };

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6">
                        <div className="h-6 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                        <div className="flex justify-between items-center">
                            <div className="h-6 bg-gray-300 rounded w-20"></div>
                            <div className="h-10 bg-gray-300 rounded w-24"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-defaultbg">
            <div className="container mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-PoppinsBold text-gray-900 mb-4">
                        Discover Amazing Campaigns
                    </h1>
                    <p className="text-lg text-gray-600 font-PoppinsRegular max-w-2xl mx-auto">
                        Explore our carefully curated selection of campaigns, from health to community initiatives.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                    <h2 className="text-xl font-PoppinsBold text-gray-900 mb-6">Filter Your Search</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full px-3 py-3 rounded-xl border border-gray-300 font-PoppinsRegular focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                            >
                                <option value="All">All Categories</option>
                                {categories.map(c => (
                                    <option key={c} value={c}>
                                        {c === "All" ? "All Categories" : c.charAt(0).toUpperCase() + c.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Search</label>
                            <input
                                type="text"
                                placeholder="Search campaigns"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full px-3 py-3 rounded-xl border border-gray-300 font-PoppinsRegular focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={clearFilters}
                                className="bg-gray-500 text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-gray-600 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <FaFilter />
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-PoppinsBold text-gray-900">
                        {isLoading ? 'Loading...' : `${campaigns.length} Campaigns Found`}
                    </h2>
                    {isLoading && (
                        <div className="flex items-center gap-2 text-primaryGreen">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primaryGreen"></div>
                            <span className="text-sm font-PoppinsMedium">Loading...</span>
                        </div>
                    )}
                </div>

                {/* Campaigns Grid */}
                <div className="mb-12">
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 text-lg mb-2">Error loading campaigns</div>
                            <div className="text-gray-600">Please try again later</div>
                        </div>
                    ) : campaigns.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">💰</div>
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">No campaigns found</h3>
                            <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                            <button
                                onClick={clearFilters}
                                className="bg-primaryGreen text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {campaigns.map(campaign => (
                                <div key={campaign.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                                    <div className="relative">
                                        <img
                                            src={campaign.image || "/assets/images/campaignimage.png"}
                                            alt={campaign.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                                                <FaHeart className="text-gray-600 hover:text-red-500" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <span className="bg-primaryGreen text-white px-3 py-1 rounded-full text-sm font-PoppinsMedium">
                                                {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg sm:text-xl font-PoppinsBold text-gray-900 line-clamp-1 flex-1 mr-2">
                                                {campaign.title}
                                            </h3>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <FaStar className="text-yellow-500 text-sm" />
                                                <span className="text-sm font-PoppinsMedium text-gray-600">4.8</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                                            <span className="flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-primaryGreen flex-shrink-0" />
                                                <span className="line-clamp-1 text-xs sm:text-sm">{campaign.location}</span>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FaUsers className="text-primaryGreen flex-shrink-0" />
                                                <span className="text-xs sm:text-sm">{campaign.goal} goal</span>
                                            </span>
                                        </div>

                                        <p className="text-gray-600 font-PoppinsRegular mb-4 line-clamp-2 text-xs sm:text-sm flex-1">
                                            {campaign.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
                                            <div>
                                                <span className="text-xl sm:text-2xl font-PoppinsBold text-primaryGreen">
                                                    ${campaign.currentAmount}
                                                </span>
                                                <span className="text-gray-600 font-PoppinsRegular text-xs sm:text-sm"> raised</span>
                                            </div>
                                            <Link
                                                to={`/campaign/${campaign.id}`}
                                                className="bg-primaryGreen text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl text-center text-sm w-full sm:w-auto"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Features Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                    <h2 className="text-2xl font-PoppinsBold text-gray-900 mb-8 text-center">Why Choose Our Campaigns?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primaryGreen/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FaStar className="text-primaryGreen text-2xl" />
                            </div>
                            <h3 className="text-lg font-PoppinsBold text-gray-900 mb-2">Premium Quality</h3>
                            <p className="text-gray-600 font-PoppinsRegular">
                                All our campaigns are carefully maintained and regularly inspected to ensure
                                the highest standards of safety and comfort.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primaryGreen/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FaMapMarkerAlt className="text-primaryGreen text-2xl" />
                            </div>
                            <h3 className="text-lg font-PoppinsBold text-gray-900 mb-2">Prime Locations</h3>
                            <p className="text-gray-600 font-PoppinsRegular">
                                Our sites are strategically located in the most beautiful and accessible areas,
                                offering stunning views and easy access to outdoor activities.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primaryGreen/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FaUsers className="text-primaryGreen text-2xl" />
                            </div>
                            <h3 className="text-lg font-PoppinsBold text-gray-900 mb-2">Family Friendly</h3>
                            <p className="text-gray-600 font-PoppinsRegular">
                                Perfect for families of all sizes, with amenities and activities designed to
                                create memorable experiences for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Campground; 