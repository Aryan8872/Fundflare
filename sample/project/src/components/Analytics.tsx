import React, { useState } from 'react';
import { Calendar, TrendingUp, Download, DollarSign, Users, Target, BarChart3 } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,567',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'New Donors',
      value: '432',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: '3.4%',
      change: '-0.2%',
      changeType: 'negative' as const,
      icon: Target,
      color: 'purple'
    },
    {
      title: 'Avg. Donation',
      value: '$289',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const campaignPerformance = [
    {
      name: 'Clean Water Initiative',
      donations: 124,
      revenue: 15420,
      conversion: 4.2,
      trend: 'up'
    },
    {
      name: 'Education for All',
      donations: 89,
      revenue: 8750,
      conversion: 3.1,
      trend: 'up'
    },
    {
      name: 'Emergency Relief',
      donations: 267,
      revenue: 40000,
      conversion: 5.8,
      trend: 'down'
    },
    {
      name: 'Community Garden',
      donations: 34,
      revenue: 4200,
      conversion: 2.1,
      trend: 'up'
    }
  ];

  const donationTrends = [
    { month: 'Jan', amount: 8500 },
    { month: 'Feb', amount: 12300 },
    { month: 'Mar', amount: 9800 },
    { month: 'Apr', amount: 15600 },
    { month: 'May', amount: 18900 },
    { month: 'Jun', amount: 22400 },
    { month: 'Jul', amount: 19800 },
    { month: 'Aug', amount: 25600 },
    { month: 'Sep', amount: 28100 },
    { month: 'Oct', amount: 31200 },
    { month: 'Nov', amount: 29800 },
    { month: 'Dec', amount: 35400 }
  ];

  const maxAmount = Math.max(...donationTrends.map(d => d.amount));

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track performance and insights across all campaigns.</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            green: 'bg-green-50 text-green-600 border-green-100',
            blue: 'bg-blue-50 text-blue-600 border-blue-100',
            purple: 'bg-purple-50 text-purple-600 border-purple-100',
            orange: 'bg-orange-50 text-orange-600 border-orange-100'
          };

          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl border ${colorClasses[metric.color]}`}>
                  <Icon size={24} />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  metric.changeType === 'positive' 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-gray-600 text-sm">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Donation Trends */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Donation Trends</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>Monthly</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {donationTrends.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 text-sm text-gray-600 font-medium">{item.month}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-20 text-right text-sm font-medium text-gray-900">
                  ${item.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Campaigns */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Campaign Performance</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {campaignPerformance.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{campaign.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{campaign.donations} donations</span>
                    <span>${campaign.revenue.toLocaleString()}</span>
                    <span>{campaign.conversion}% conversion</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${
                  campaign.trend === 'up' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  <TrendingUp size={16} className={campaign.trend === 'down' ? 'rotate-180' : ''} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Detailed Insights</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <BarChart3 size={16} />
            <span>Advanced Analytics</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Donor Retention</h4>
            <p className="text-3xl font-bold text-blue-600 mb-1">68%</p>
            <p className="text-sm text-gray-600">Return donors rate</p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Goal Achievement</h4>
            <p className="text-3xl font-bold text-green-600 mb-1">76%</p>
            <p className="text-sm text-gray-600">Campaigns reaching goal</p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Growth Rate</h4>
            <p className="text-3xl font-bold text-purple-600 mb-1">24%</p>
            <p className="text-sm text-gray-600">Month over month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;