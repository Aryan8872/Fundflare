import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  User
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CampaignDetail: React.FC = () => {
  const { id } = useParams();
  const [donationAmount, setDonationAmount] = useState('');
  const [activeTab, setActiveTab] = useState('story');

  // Mock campaign data - in real app, fetch based on ID
  const campaign = {
    id: 1,
    title: 'Clean Water for Rural Communities',
    description: 'Providing access to clean, safe drinking water for families in remote villages across developing countries.',
    longDescription: `Access to clean water is a fundamental human right, yet millions of people around the world still lack this basic necessity. Our Clean Water Initiative focuses on building sustainable water systems in rural communities that have been underserved for generations.

    Through partnerships with local organizations and community leaders, we identify villages most in need and work together to implement long-term solutions. Our approach includes drilling wells, installing water purification systems, and training local technicians to maintain the infrastructure.

    Every dollar donated goes directly toward materials, equipment, and local labor. We believe in transparency and will provide regular updates on the progress of each water system installation.`,
    image: 'https://images.pexels.com/photos/1111372/pexels-photo-1111372.jpeg?auto=compress&cs=tinysrgb&w=800',
    raised: 15420,
    goal: 25000,
    percentage: 62,
    donors: 124,
    daysLeft: 23,
    category: 'Health',
    location: 'Rural Kenya & Tanzania',
    organizer: {
      name: 'Water for All Foundation',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    updates: [
      {
        id: 1,
        date: '2024-01-10',
        title: 'First Well Completed!',
        content: 'We\'re excited to announce that our first well in the Maasai community has been completed and is now providing clean water to over 200 families.',
        image: 'https://images.pexels.com/photos/1111372/pexels-photo-1111372.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        date: '2024-01-05',
        title: 'Construction Begins',
        content: 'Thanks to your generous donations, we\'ve begun construction on the first of three planned water systems.',
        image: null
      }
    ],
    recentDonations: [
      { name: 'Sarah Johnson', amount: 100, time: '2 hours ago', anonymous: false },
      { name: 'Anonymous', amount: 250, time: '5 hours ago', anonymous: true },
      { name: 'Michael Chen', amount: 50, time: '1 day ago', anonymous: false },
      { name: 'Emily Davis', amount: 75, time: '2 days ago', anonymous: false }
    ]
  };

  const suggestedAmounts = [25, 50, 100, 250];

  const handleDonate = () => {
    // Handle donation logic
    console.log('Donating:', donationAmount);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Back Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/campaigns"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Campaigns
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Header */}
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-6">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {campaign.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-colors">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {campaign.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{campaign.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{campaign.daysLeft} days left</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span>{campaign.donors} donors</span>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl mb-8">
                <img
                  src={campaign.organizer.image}
                  alt={campaign.organizer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">{campaign.organizer.name}</h3>
                    {campaign.organizer.verified && (
                      <CheckCircle size={16} className="text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Campaign Organizer</p>
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  Contact
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'story', label: 'Story' },
                  { id: 'updates', label: 'Updates' },
                  { id: 'donations', label: 'Donations' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'story' && (
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                    {campaign.longDescription}
                  </p>
                </div>
              )}

              {activeTab === 'updates' && (
                <div className="space-y-6">
                  {campaign.updates.map((update) => (
                    <div key={update.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{update.title}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                      </div>
                      {update.image && (
                        <img
                          src={update.image}
                          alt={update.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <p className="text-gray-600 leading-relaxed">{update.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'donations' && (
                <div className="space-y-4">
                  {campaign.recentDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{donation.name}</p>
                          <p className="text-sm text-gray-500">{donation.time}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        ${donation.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Donation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Progress Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      ${campaign.raised.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {campaign.percentage}% funded
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${campaign.percentage}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-gray-900 mb-1">
                        <Target size={16} />
                        <span className="font-semibold">${campaign.goal.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500">Goal</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-gray-900 mb-1">
                        <Users size={16} />
                        <span className="font-semibold">{campaign.donors}</span>
                      </div>
                      <p className="text-xs text-gray-500">Donors</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-gray-900 mb-1">
                        <Clock size={16} />
                        <span className="font-semibold">{campaign.daysLeft}</span>
                      </div>
                      <p className="text-xs text-gray-500">Days left</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Make a Donation</h3>
                
                <div className="space-y-4">
                  {/* Suggested Amounts */}
                  <div className="grid grid-cols-2 gap-3">
                    {suggestedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount.toString())}
                        className={`p-3 border rounded-xl font-medium transition-colors ${
                          donationAmount === amount.toString()
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={handleDonate}
                    disabled={!donationAmount}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Donate Now
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Your donation is secure and goes directly to the campaign organizer.
                  </p>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this Campaign</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Help spread the word and increase the impact of this campaign.
                </p>
                <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                  Share Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CampaignDetail;