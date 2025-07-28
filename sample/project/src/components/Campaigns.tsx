import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, Calendar, DollarSign, Target } from 'lucide-react';

const Campaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const campaigns = [
    {
      id: 1,
      name: 'Clean Water Initiative',
      description: 'Providing clean water access to rural communities in developing countries.',
      status: 'active',
      raised: 15420,
      goal: 25000,
      percentage: 62,
      donors: 124,
      endDate: '2024-03-15',
      image: 'https://images.pexels.com/photos/1111372/pexels-photo-1111372.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Education for All',
      description: 'Supporting educational programs and school supplies for underprivileged children.',
      status: 'active',
      raised: 8750,
      goal: 15000,
      percentage: 58,
      donors: 89,
      endDate: '2024-04-20',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Emergency Relief Fund',
      description: 'Rapid response fund for natural disasters and humanitarian crises.',
      status: 'completed',
      raised: 40000,
      goal: 40000,
      percentage: 100,
      donors: 267,
      endDate: '2024-01-30',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Community Garden Project',
      description: 'Creating sustainable community gardens in urban neighborhoods.',
      status: 'draft',
      raised: 0,
      goal: 10000,
      percentage: 0,
      donors: 0,
      endDate: '2024-05-10',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaigns</h1>
          <p className="text-gray-600">Manage your donation campaigns and track their progress.</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={20} className="mr-2" />
          Create Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
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
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
            <button className="flex items-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={20} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative">
              <img
                src={campaign.image}
                alt={campaign.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{campaign.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${campaign.percentage}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                    <DollarSign size={16} />
                    <span className="font-semibold">${campaign.raised.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500">Raised</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                    <Target size={16} />
                    <span className="font-semibold">${campaign.goal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500">Goal</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
                    <span className="font-semibold">{campaign.donors}</span>
                  </div>
                  <p className="text-xs text-gray-500">Donors</p>
                </div>
              </div>

              {/* End Date */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <Calendar size={16} />
                <span>Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <Eye size={16} className="mr-2" />
                  View
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Campaigns;