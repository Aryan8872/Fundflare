import { CheckCircle, Clock, Mail, MapPin, MessageSquare, Phone, Send, Users } from 'lucide-react';
import React, { useState } from 'react';

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            details: ['support@fundflare.com', 'info@fundflare.com'],
            description: 'We typically respond within 2 hours'
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
            description: 'Available Monday to Friday, 9AM - 6PM EST'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            details: ['123 Fundraising Ave', 'Suite 100, New York, NY 10001'],
            description: 'Come say hello at our office'
        }
    ];

    const faqs = [
        {
            question: 'How do I start a fundraising campaign?',
            answer: 'Creating a campaign is easy! Simply sign up for an account, click "Start Your Campaign", and follow our step-by-step guide to set up your fundraising page.'
        },
        {
            question: 'What fees does FundFlare charge?',
            answer: 'We charge a small processing fee of 2.9% + $0.30 per donation to cover payment processing and platform maintenance costs.'
        },
        {
            question: 'How long does it take to receive funds?',
            answer: 'Funds are typically transferred to your account within 3-5 business days after your campaign ends or when you request a payout.'
        },
        {
            question: 'Is my donation secure?',
            answer: 'Absolutely! We use industry-leading encryption and security measures to protect all transactions and personal information.'
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setForm({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Have questions about FundFlare? We're here to help! Reach out to our team and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            return (
                                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <IconComponent className="text-white" size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                                    <div className="space-y-2 mb-4">
                                        {info.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-600 font-medium">{detail}</p>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500">{info.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form & FAQ */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <MessageSquare className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Users className="text-blue-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                            </div>

                            <div className="space-y-6">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 bg-blue-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Need Immediate Help?</h3>
                                <p className="text-gray-600 mb-4">
                                    Check out our comprehensive help center with guides, tutorials, and troubleshooting tips.
                                </p>
                                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Visit Help Center →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Office Hours */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Clock size={24} />
                            <h2 className="text-2xl font-bold">Business Hours</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <div className="font-semibold mb-2">Monday - Friday</div>
                                <div className="text-blue-100">9:00 AM - 6:00 PM EST</div>
                            </div>
                            <div>
                                <div className="font-semibold mb-2">Saturday</div>
                                <div className="text-blue-100">10:00 AM - 4:00 PM EST</div>
                            </div>
                            <div>
                                <div className="font-semibold mb-2">Sunday</div>
                                <div className="text-blue-100">Closed</div>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-blue-500">
                            <p className="text-blue-100">
                                For urgent matters outside business hours, please email us and we'll respond as soon as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact; 