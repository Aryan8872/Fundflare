import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Target, Shield, TrendingUp, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const featuredCampaigns = [
    {
      id: 1,
      title: 'Clean Water for Rural Communities',
      description: 'Providing access to clean, safe drinking water for families in remote villages.',
      image: 'https://images.pexels.com/photos/1111372/pexels-photo-1111372.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 15420,
      goal: 25000,
      percentage: 62,
      donors: 124,
      category: 'Health'
    },
    {
      id: 2,
      title: 'Education for Underprivileged Children',
      description: 'Supporting educational programs and school supplies for children in need.',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 8750,
      goal: 15000,
      percentage: 58,
      donors: 89,
      category: 'Education'
    },
    {
      id: 3,
      title: 'Emergency Relief Fund',
      description: 'Rapid response fund for natural disasters and humanitarian crises.',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600',
      raised: 32100,
      goal: 40000,
      percentage: 80,
      donors: 267,
      category: 'Emergency'
    }
  ];

  const stats = [
    { label: 'Total Raised', value: '$2.4M+', icon: TrendingUp },
    { label: 'Active Campaigns', value: '150+', icon: Target },
    { label: 'Happy Donors', value: '10K+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: Star }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description: 'All donations are processed securely with full transparency on fund usage.'
    },
    {
      icon: Heart,
      title: 'Verified Campaigns',
      description: 'Every campaign is thoroughly vetted to ensure legitimacy and impact.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a community of changemakers working together for a better world.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
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
                  Join thousands of donors supporting meaningful causes around the world. 
                  Every contribution creates lasting impact in communities that need it most.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/campaigns"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Browse Campaigns
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                  Start Your Campaign
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800"
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

          <div className="text-center mt-12">
            <Link
              to="/campaigns"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              View All Campaigns
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DonateNow?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to making charitable giving safe, transparent, and impactful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join our community of changemakers and start supporting causes you care about today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/campaigns"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Donating
            </Link>
            <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Create Campaign
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;