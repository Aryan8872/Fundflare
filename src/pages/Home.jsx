import React from 'react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '../hooks/useCampaigns';

const stats = [
  { label: 'Total Raised', value: '$2.4M+' },
  { label: 'Active Campaigns', value: '150+' },
  { label: 'Happy Donors', value: '10K+' },
  { label: 'Success Rate', value: '94%' }
];

const Home = () => {
  // Fetch real campaign data from backend
  const { data: campaignsData, isLoading, isError } = useCampaigns();
  const campaigns = campaignsData?.campaigns || [];

  // Get featured campaigns (first 3 approved campaigns)
  const featuredCampaigns = campaigns
    .filter(campaign => campaign.status === 'approved' || campaign.status === 'active')
    .slice(0, 3)
    .map(campaign => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      image: campaign.coverImage || '/public/assets/images/campingtentimage.png',
      raised: campaign.currentAmount || 0,
      goal: campaign.goalAmount || 0,
      percentage: campaign.goalAmount ? Math.min(100, Math.round((campaign.currentAmount / campaign.goalAmount) * 100)) : 0,
      donors: campaign.donorCount || 0,
      category: campaign.category
    }));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Difference</span> Today
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of donors supporting meaningful causes around the world. Every contribution creates lasting impact in communities that need it most.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Browse Campaigns
                </Link>
                <Link
                  to="/create-campaign"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                >
                  Start Your Campaign
                </Link>
              </div>
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                      <span className="text-blue-600 text-2xl font-bold">{stat.value[0]}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/public/assets/images/hero_bg.png"
                  alt="People helping community"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Campaigns */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover impactful campaigns that are making a real difference in communities worldwide.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading campaigns...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load campaigns. Please try again later.</p>
            </div>
          ) : featuredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No campaigns available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        {campaign.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {campaign.description}
                    </p>
                    <div className="space-y-3">
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
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            ${campaign.raised.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            of ${campaign.goal.toLocaleString()} goal
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {campaign.donors}
                          </div>
                          <div className="text-sm text-gray-500">donors</div>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/campaigns/${campaign.id}`}
                      className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      Donate Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/browse"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
