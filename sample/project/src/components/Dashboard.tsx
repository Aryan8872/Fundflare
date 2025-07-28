import React from 'react';
import { DollarSign, Users, Heart, TrendingUp, Calendar, Eye } from 'lucide-react';
import StatsCard from './ui/StatsCard';
import RecentDonations from './ui/RecentDonations';
import CampaignProgress from './ui/CampaignProgress';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Donations',
      value: '$124,567',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Campaigns',
      value: '23',
      change: '+3',
      changeType: 'positive' as const,
      icon: Heart,
      color: 'blue'
    },
    {
      title: 'Total Donors',
      value: '1,429',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '3.4%',
      change: '-0.2%',
      changeType: 'negative' as const,
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your campaigns.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Donations */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Donations</h2>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                <Eye size={16} />
                <span>View All</span>
              </button>
            </div>
            <RecentDonations />
          </div>
        </div>

        {/* Campaign Progress */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Campaigns</h2>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                <Calendar size={16} />
                <span>This Month</span>
              </button>
            </div>
            <CampaignProgress />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Need help getting started?</h3>
            <p className="text-blue-100">Create your first campaign or invite team members to collaborate.</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
              Create Campaign
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors border border-blue-400">
              Invite Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;