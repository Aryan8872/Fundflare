import React, { useState } from 'react';
import { Search, Filter, Download, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';

const Donors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const donors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      totalDonated: 1250,
      donationCount: 8,
      lastDonation: '2024-01-15',
      firstDonation: '2023-06-10',
      avatar: 'SJ',
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA',
      totalDonated: 2100,
      donationCount: 12,
      lastDonation: '2024-01-14',
      firstDonation: '2023-03-22',
      avatar: 'MC',
      status: 'active'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      totalDonated: 850,
      donationCount: 5,
      lastDonation: '2024-01-10',
      firstDonation: '2023-09-15',
      avatar: 'ED',
      status: 'active'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 321-0987',
      location: 'Austin, TX',
      totalDonated: 3200,
      donationCount: 15,
      lastDonation: '2024-01-08',
      firstDonation: '2023-01-20',
      avatar: 'DW',
      status: 'vip'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      phone: '+1 (555) 654-3210',
      location: 'Miami, FL',
      totalDonated: 475,
      donationCount: 3,
      lastDonation: '2023-12-20',
      firstDonation: '2023-11-05',
      avatar: 'LA',
      status: 'inactive'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDonors = [...filteredDonors].sort((a, b) => {
    switch (sortBy) {
      case 'amount':
        return b.totalDonated - a.totalDonated;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recent':
      default:
        return new Date(b.lastDonation).getTime() - new Date(a.lastDonation).getTime();
    }
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donors</h1>
          <p className="text-gray-600">Manage and connect with your campaign supporters.</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm">
          <Download size={20} className="mr-2" />
          Export Data
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$7,875</h3>
          <p className="text-gray-600 text-sm">Total Donated</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">43</h3>
          <p className="text-gray-600 text-sm">Total Donations</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">$183</h3>
          <p className="text-gray-600 text-sm">Avg. Donation</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <Phone className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">4</h3>
          <p className="text-gray-600 text-sm">VIP Donors</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search donors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="amount">Highest Amount</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <button className="flex items-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={20} className="mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Donors List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Donor</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Total Donated</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Donations</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Donation</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{donor.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{donor.name}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin size={12} />
                          <span>{donor.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail size={14} />
                        <span>{donor.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{donor.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-green-600">${donor.totalDonated.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{donor.donationCount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{new Date(donor.lastDonation).toLocaleDateString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(donor.status)}`}>
                      {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                        <Phone size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {sortedDonors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No donors found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Donors;