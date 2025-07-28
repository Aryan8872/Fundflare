import { ArrowRight, Award, Globe, Heart, Shield, Star, Target, Users } from 'lucide-react';
import React from 'react';

const About = () => {
    const stats = [
        { label: 'Total Raised', value: '$2.4M+', icon: Heart },
        { label: 'Active Campaigns', value: '150+', icon: Target },
        { label: 'Happy Donors', value: '10K+', icon: Users },
        { label: 'Success Rate', value: '94%', icon: Award }
    ];

    const values = [
        {
            title: 'Transparency',
            description: 'We believe in complete transparency in all our operations. Every donation is tracked and reported.',
            icon: Shield,
            color: 'blue'
        },
        {
            title: 'Community Impact',
            description: 'Our platform connects donors with causes that create real, measurable impact in communities.',
            icon: Globe,
            color: 'green'
        },
        {
            title: 'Trust & Security',
            description: 'Your security is our priority. We use industry-leading encryption and security measures.',
            icon: Star,
            color: 'purple'
        }
    ];

    const team = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            image: '/public/assets/images/hero_bg.png',
            bio: 'Passionate about connecting people with causes that matter.'
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            image: '/public/assets/images/hero_bg.png',
            bio: 'Building secure and scalable technology solutions.'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Head of Operations',
            image: '/public/assets/images/hero_bg.png',
            bio: 'Ensuring smooth operations and donor satisfaction.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">FundFlare</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            We're on a mission to make fundraising accessible, transparent, and impactful for everyone.
                            Our platform connects generous donors with meaningful causes that create lasting change.
                        </p>
                        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                            <span>Learn more about our story</span>
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="text-white" size={28} />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                FundFlare was born from a simple belief: everyone deserves the opportunity to make a difference.
                                We've created a platform that removes barriers between generous donors and impactful causes.
                            </p>
                            <p className="text-lg text-gray-600 mb-8">
                                Whether you're supporting medical research, educational initiatives, or community projects,
                                we ensure your contributions reach their intended destination with full transparency and accountability.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Heart className="text-green-600" size={24} />
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Trusted by 10,000+ donors</div>
                                    <div className="text-sm text-gray-600">Join our growing community</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/public/assets/images/hero_bg.png"
                                alt="Our mission"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            These core values guide everything we do and shape the way we serve our community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon;
                            const colorClasses = {
                                blue: 'bg-blue-100 text-blue-600',
                                green: 'bg-green-100 text-green-600',
                                purple: 'bg-purple-100 text-purple-600'
                            };

                            return (
                                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                                    <div className={`w-16 h-16 ${colorClasses[value.color]} rounded-2xl flex items-center justify-center mb-6`}>
                                        <IconComponent size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The passionate individuals behind FundFlare who are dedicated to making a difference.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Users className="text-white" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                <div className="text-blue-600 font-medium mb-4">{member.role}</div>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of donors who are already making an impact through FundFlare.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                            Browse Campaigns
                        </button>
                        <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                            Start Your Campaign
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 