import React from 'react';
import { Target } from 'lucide-react';

const CampaignProgress: React.FC = () => {
  const campaigns = [
    {
      id: 1,
      name: 'Clean Water Initiative',
      raised: 15420,
      goal: 25000,
      percentage: 62,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Education for All',
      raised: 8750,
      goal: 15000,
      percentage: 58,
      color: 'green'
    },
    {
      id: 3,
      name: 'Emergency Relief',
      raised: 32100,
      goal: 40000,
      percentage: 80,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Community Garden',
      raised: 4200,
      goal: 10000,
      percentage: 42,
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 text-sm">{campaign.name}</h4>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Target size={12} />
              <span>{campaign.percentage}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${getColorClasses(campaign.color)}`}
                style={{ width: `${campaign.percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>${campaign.raised.toLocaleString()}</span>
              <span>${campaign.goal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignProgress;