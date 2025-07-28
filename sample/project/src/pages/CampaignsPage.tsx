import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, Calendar, DollarSign, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CampaignsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const campaigns = [
    {
      id: 1,
      title: 'Clean Water for Rural Communities',
      description: 'Providing access to clean, safe drinking water for families in remote villages across developing countries.',
      image: 'https://images.pexels.com/photos/1111372/pexels-photo-1111372.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 15420,
      goal: 25000,
      percentage: 62,
      donors: 124,
      daysLeft: 23,
      category: 'Health',
      featured: true
    },
    {
      id: 2,
      title: 'Education for Underprivileged Children',
      description: 'Supporting educational programs and school supplies for children in underserved communities.',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 8750,
      goal: 15000,
      percentage: 58,
      donors: 89,
      daysLeft: 45,
      category: 'Education',
      featured: false
    },
    {
      id: 3,
      title: 'Emergency Relief Fund',
      description: 'Rapid response fund for natural disasters and humanitarian crises worldwide.',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 32100,
      goal: 40000,
      percentage: 80,
      donors: 267,
      daysLeft: 12,
      category: 'Emergency',
      featured: true
    },
    {
      id: 4,
      title: 'Community Garden Project',
      description: 'Creating sustainable community gardens in urban neighborhoods to promote food security.',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 4200,
      goal: 10000,
      percentage: 42,
      donors: 34,
      daysLeft: 67,
      category: 'Environment',
      featured: false
    },
    {
      id: 5,
      title: 'Medical Equipment for Rural Clinics',
      description: 'Providing essential medical equipment to healthcare facilities in remote areas.',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 18900,
      goal: 30000,
      percentage: 63,
      donors: 156,
      daysLeft: 34,
      category: 'Health',
      featured: false
    },
    {
      id: 6,
      title: 'Animal Shelter Support',
      description: 'Supporting local animal shelters with food, medical care, and facility improvements.',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 7650,
      goal: 12000,
      percentage: 64,
      donors: 98,
      daysLeft: 28,
      category: 'Animals',
      featured: false
    }
  ];

  const categories = ['all', 'Health', 'Education', 'Emergency', 'Environment', 'Animals'];

  const getCategoryColor = (category: string) => {
    const colors = {
      Health: 'bg-green-100 text-green-800',
      Education: 'bg-blue-100 text-blue-800',
      Emergency: 'bg-red-100 text-red-800',
      Environment: 'bg-emerald-100 text-emerald-800',
      Animals: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || campaign.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'amount':
        return b.raised - a.raised;
      case 'goal':
        return b.percentage - a.percentage;
      case 'ending':
        return a.daysLeft - b.daysLeft;
      case 'recent':
      default:
        return b.id - a.id;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Campaigns</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover meaningful causes and make a difference in communities around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="amount">Highest Raised</option>
                <option value="goal">Closest to Goal</option>
                <option value="ending">Ending Soon</option>
              </select>

              <button className="flex items-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter size={20} className="mr-2" />
                More Filters
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {sortedCampaigns.length} of {campaigns.length} campaigns
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="relative overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(campaign.category)}`}>
                      {campaign.category}
                    </span>
                    {campaign.featured && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center">
                        <Heart size={12} className="mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {campaign.daysLeft} days left
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  
                  {/* Progress */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{campaign.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${campaign.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                        <DollarSign size={14} />
                        <span className="font-semibold text-sm">${campaign.raised.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500">Raised</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                        <span className="font-semibold text-sm">${campaign.goal.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500">Goal</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
                        <Users size={14} />
                        <span className="font-semibold text-sm">{campaign.donors}</span>
                      </div>
                      <p className="text-xs text-gray-500">Donors</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/campaigns/${campaign.id}`}
                      className="flex-1 text-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      Donate Now
                    </Link>
                    <Link
                      to={`/campaigns/${campaign.id}`}
                      className="px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {sortedCampaigns.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                Load More Campaigns
              </button>
            </div>
          )}

          {/* No Results */}
          {sortedCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampaignsPage;