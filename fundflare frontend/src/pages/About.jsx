import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaStar } from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-PoppinsBold mb-6">About GCamping</h1>
                    <p className="text-xl md:text-2xl font-PoppinsRegular max-w-3xl mx-auto">
                        Your gateway to unforgettable outdoor adventures and nature experiences
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-PoppinsBold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-lg text-gray-600 font-PoppinsRegular mb-6">
                            Founded with a passion for connecting people with nature, GCamping has been providing 
                            exceptional camping experiences since 2020. We believe that everyone deserves to experience 
                            the beauty and tranquility of the great outdoors.
                        </p>
                        <p className="text-lg text-gray-600 font-PoppinsRegular mb-6">
                            Our carefully curated camping sites offer the perfect blend of adventure and comfort, 
                            allowing you to create lasting memories with family and friends while immersing yourself 
                            in nature's wonders.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <FaStar className="text-yellow-500 text-xl" />
                                <span className="font-PoppinsBold text-gray-900">4.8/5</span>
                            </div>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-600 font-PoppinsMedium">1000+ Happy Campers</span>
                        </div>
                    </div>
                    <div className="relative">
                        <img 
                            src="/assets/images/campingtentimage.png" 
                            alt="Camping Experience" 
                            className="rounded-2xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                            <div className="text-center">
                                <div className="text-2xl font-PoppinsBold text-primaryGreen">50+</div>
                                <div className="text-sm text-gray-600 font-PoppinsMedium">Camping Sites</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-primaryGreen/10 rounded-xl flex items-center justify-center mb-6">
                            <FaMapMarkerAlt className="text-primaryGreen text-2xl" />
                        </div>
                        <h3 className="text-xl font-PoppinsBold text-gray-900 mb-4">Our Mission</h3>
                        <p className="text-gray-600 font-PoppinsRegular">
                            To provide accessible, sustainable, and memorable camping experiences that connect 
                            people with nature and create lasting bonds with the outdoors.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                            <FaStar className="text-blue-500 text-2xl" />
                        </div>
                        <h3 className="text-xl font-PoppinsBold text-gray-900 mb-4">Quality First</h3>
                        <p className="text-gray-600 font-PoppinsRegular">
                            We maintain the highest standards in our camping facilities, ensuring every guest 
                            enjoys a safe, comfortable, and exceptional outdoor experience.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                            <FaClock className="text-green-500 text-2xl" />
                        </div>
                        <h3 className="text-xl font-PoppinsBold text-gray-900 mb-4">24/7 Support</h3>
                        <p className="text-gray-600 font-PoppinsRegular">
                            Our dedicated team is available round the clock to ensure your camping experience 
                            is smooth, safe, and enjoyable from start to finish.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-PoppinsBold text-gray-900 mb-6">Meet Our Team</h2>
                    <p className="text-lg text-gray-600 font-PoppinsRegular max-w-2xl mx-auto mb-12">
                        Our passionate team of outdoor enthusiasts and hospitality professionals work together 
                        to create the perfect camping experience for every guest.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <img 
                                src="/assets/images/glampimage.png" 
                                alt="Team Member" 
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">Sarah Johnson</h3>
                            <p className="text-primaryGreen font-PoppinsMedium">Founder & CEO</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <img 
                                src="/assets/images/trailerimage.png" 
                                alt="Team Member" 
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">Mike Chen</h3>
                            <p className="text-primaryGreen font-PoppinsMedium">Operations Manager</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <img 
                                src="/assets/images/campingtentimage.png" 
                                alt="Team Member" 
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">Emma Davis</h3>
                            <p className="text-primaryGreen font-PoppinsMedium">Customer Experience</p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <h2 className="text-3xl font-PoppinsBold text-gray-900 mb-8 text-center">Get In Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-primaryGreen text-xl" />
                                    <div>
                                        <p className="font-PoppinsMedium text-gray-900">123 Nature Trail</p>
                                        <p className="text-gray-600">Wilderness Valley, CA 90210</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-primaryGreen text-xl" />
                                    <div>
                                        <p className="font-PoppinsMedium text-gray-900">+1 (555) 123-4567</p>
                                        <p className="text-gray-600">Available 24/7</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-primaryGreen text-xl" />
                                    <div>
                                        <p className="font-PoppinsMedium text-gray-900">hello@gcamping.com</p>
                                        <p className="text-gray-600">We'll respond within 2 hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-4">Business Hours</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-PoppinsMedium">Monday - Friday</span>
                                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-PoppinsMedium">Saturday</span>
                                    <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-PoppinsMedium">Sunday</span>
                                    <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-PoppinsMedium text-primaryGreen">Emergency</span>
                                    <span className="text-primaryGreen font-PoppinsMedium">24/7 Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 