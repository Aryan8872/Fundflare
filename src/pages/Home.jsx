import React from 'react'
import { useGetCampaignsQuery } from '../api/api'
import About from '../components/About'
import ArticlesSection from '../components/ArticlesSection'
import BonfireHighlight from '../components/BonfireHighlight'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import NewsletterSubscription from '../components/NewsletterSubscription'

const Home = () => {
  // Fetch campaigns for the featured section
  const { data: campaignsData, isLoading: campaignsLoading } = useGetCampaignsQuery({});
  const featuredCampaigns = campaignsData ? campaignsData.slice(0, 6) : [];

  return (
    <div className='z-0 bg-defaultbg'>
      <Hero />
      <About />
      <BonfireHighlight />
      {/* Featured Campaigns */}
      <section className="container mx-auto my-20 px-4 sm:px-6">
        <h2 className="text-2xl font-PoppinsBold mb-8 text-center">Featured Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {campaignsLoading ? (
            <div>Loading...</div>
          ) : featuredCampaigns.length === 0 ? (
            <div className="text-center py-12">No campaigns available.</div>
          ) : (
            featuredCampaigns.map(campaign => (
              <div key={campaign.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                <img
                  src={campaign.coverImage || "/assets/images/campingtentimage.png"}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-PoppinsBold text-gray-900 mb-2 line-clamp-1">{campaign.title}</h3>
                  <p className="text-gray-600 font-PoppinsRegular mb-4 line-clamp-2 text-xs sm:text-sm flex-1">{campaign.description}</p>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-PoppinsMedium">{campaign.category}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-PoppinsMedium">Goal: ${campaign.goalAmount}</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-PoppinsMedium">Raised: ${campaign.currentAmount}</span>
                  </div>
                  <a href={`/campaign/${campaign.id}`} className="bg-primaryGreen text-white px-4 py-2 rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors text-center mt-auto">View Campaign</a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <ArticlesSection />
      <NewsletterSubscription />
      <Footer />
    </div>
  )
}

export default Home
