import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';

const RecentDonations: React.FC = () => {
  const donations = [
    {
      id: 1,
      donor: 'Sarah Johnson',
      amount: 250,
      campaign: 'Clean Water Initiative',
      time: '2 minutes ago',
      avatar: 'SJ'
    },
    {
      id: 2,
      donor: 'Michael Chen',
      amount: 100,
      campaign: 'Education for All',
      time: '15 minutes ago',
      avatar: 'MC'
    },
    {
      id: 3,
      donor: 'Emily Davis',
      amount: 500,
      campaign: 'Emergency Relief Fund',
      time: '1 hour ago',
      avatar: 'ED'
    },
    {
      id: 4,
      donor: 'Anonymous',
      amount: 75,
      campaign: 'Community Garden',
      time: '2 hours ago',
      avatar: 'A'
    },
    {
      id: 5,
      donor: 'David Wilson',
      amount: 300,
      campaign: 'Tech for Schools',
      time: '3 hours ago',
      avatar: 'DW'
    }
  ];

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">{donation.avatar}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{donation.donor}</p>
              <p className="text-sm text-gray-600">{donation.campaign}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-green-600">${donation.amount}</p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock size={12} />
              <span>{donation.time}</span>
            </div>
          </div>
        </div>
      ))}
      
      <button className="w-full mt-4 p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center space-x-2">
        <span>View All Donations</span>
        <ExternalLink size={16} />
      </button>
    </div>
  );
};

export default RecentDonations;