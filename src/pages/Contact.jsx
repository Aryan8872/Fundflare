import React, { useState } from 'react';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        // Simulate form submission
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-PoppinsBold mb-6">Contact Us</h1>
                    <p className="text-xl md:text-2xl font-PoppinsRegular max-w-3xl mx-auto">
                        Get in touch with our team for any questions or assistance
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-PoppinsBold text-gray-900 mb-8">Get In Touch</h2>
                        <p className="text-lg text-gray-600 font-PoppinsRegular mb-8">
                            Have questions about our campaigns or need assistance with your donation?
                            Our friendly team is here to help you plan the perfect fundraising adventure.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primaryGreen/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaMapMarkerAlt className="text-primaryGreen text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-PoppinsBold text-gray-900 mb-2">Visit Us</h3>
                                    <p className="text-gray-600 font-PoppinsRegular">123 Nature Trail</p>
                                    <p className="text-gray-600 font-PoppinsRegular">Wilderness Valley, CA 90210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primaryGreen/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaPhone className="text-primaryGreen text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-PoppinsBold text-gray-900 mb-2">Call Us</h3>
                                    <p className="text-gray-600 font-PoppinsRegular">+1 (555) 123-4567</p>
                                    <p className="text-gray-600 font-PoppinsRegular">Available 24/7 for emergencies</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primaryGreen/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="text-primaryGreen text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-PoppinsBold text-gray-900 mb-2">Email Us</h3>
                                    <p className="text-gray-600 font-PoppinsRegular">hello@gcamping.com</p>
                                    <p className="text-gray-600 font-PoppinsRegular">We'll respond within 2 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primaryGreen/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaClock className="text-primaryGreen text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-PoppinsBold text-gray-900 mb-2">Business Hours</h3>
                                    <p className="text-gray-600 font-PoppinsRegular">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-gray-600 font-PoppinsRegular">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-8 bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                            <div className="text-center">
                                <FaMapMarkerAlt className="text-gray-400 text-4xl mx-auto mb-4" />
                                <p className="text-gray-600 font-PoppinsMedium">Interactive Map Coming Soon</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <h2 className="text-2xl font-PoppinsBold text-gray-900 mb-6">Send us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryGreen font-PoppinsRegular"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryGreen font-PoppinsRegular"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryGreen font-PoppinsRegular"
                                    placeholder="What is this about?"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryGreen font-PoppinsRegular resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primaryGreen text-white py-3 px-6 rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <FaPaperPlane />
                                Send Message
                            </button>
                        </form>

                        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <p className="text-sm text-blue-800 font-PoppinsRegular">
                                <strong>Need immediate assistance?</strong> Call our 24/7 support line at +1 (555) 123-4567
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-PoppinsBold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <h3 className="text-lg font-PoppinsBold text-gray-900 mb-3">How do I make a donation or start a campaign?</h3>
                            <p className="text-gray-600 font-PoppinsRegular">
                                You can make a donation or start a campaign by visiting our website and selecting the "Donate" or "Start Campaign" option.
                                You'll be guided through the process to ensure your donation or campaign is successful.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <h3 className="text-lg font-PoppinsBold text-gray-900 mb-3">What is your cancellation policy?</h3>
                            <p className="text-gray-600 font-PoppinsRegular">
                                Cancellations made 48 hours before check-in receive a full refund.
                                Cancellations within 48 hours are subject to a 50% charge.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <h3 className="text-lg font-PoppinsBold text-gray-900 mb-3">Do you provide camping equipment?</h3>
                            <p className="text-gray-600 font-PoppinsRegular">
                                Yes, we offer rental equipment including tents, sleeping bags, and cooking gear.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <h3 className="text-lg font-PoppinsBold text-gray-900 mb-3">Are pets allowed?</h3>
                            <p className="text-gray-600 font-PoppinsRegular">
                                Pets are welcome at most of our camping sites. Please check the specific site
                                details for pet policies and any additional fees.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 