import { Calendar, DollarSign, Image, Link as LinkIcon, Plus, Target, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/AuthContext';
import { useCreateCampaign } from '../hooks/useCampaigns';

const categories = ['Health', 'Education', 'Medical', 'Startups'];

const CreateCampaign = () => {
    const { user } = useAuthContext();
    const { mutate, isLoading } = useCreateCampaign();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: categories[0],
        goalAmount: '',
        duration: '',
        coverImage: '',
        media: [''],
    });

    if (!user || user.role !== 'CREATOR') {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-2xl mx-auto py-16 text-center">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="text-red-600" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                    <p className="text-gray-600">You must be a campaign creator to start a campaign.</p>
                </div>
            </div>
        );
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleMediaChange = (i, value) => {
        setForm(f => ({ ...f, media: f.media.map((m, idx) => idx === i ? value : m) }));
    };

    const addMediaField = () => setForm(f => ({ ...f, media: [...f.media, ''] }));

    const handleSubmit = e => {
        e.preventDefault();
        mutate(
            {
                ...form,
                goalAmount: Number(form.goalAmount),
                duration: Number(form.duration),
                media: form.media.filter(Boolean),
            },
            {
                onSuccess: () => {
                    toast.success('Campaign submitted for approval!');
                    navigate('/dashboard');
                },
                onError: err => toast.error(err.message || 'Failed to create campaign'),
            }
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Campaign</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Share your story and raise funds for your cause. Let's make a difference together.
                    </p>
                </div>

                {/* Form */}
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="space-y-8">
                            {/* Basic Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Title</label>
                                        <input
                                            name="title"
                                            value={form.title}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your campaign title"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={6}
                                            placeholder="Tell your story and explain your cause..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                        <select
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Campaign Details */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <DollarSign className="inline mr-2" size={16} />
                                            Goal Amount ($)
                                        </label>
                                        <input
                                            name="goalAmount"
                                            type="number"
                                            min="1"
                                            value={form.goalAmount}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter amount"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Calendar className="inline mr-2" size={16} />
                                            Duration (days)
                                        </label>
                                        <input
                                            name="duration"
                                            type="number"
                                            min="1"
                                            value={form.duration}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter days"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Media */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Media & Images</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <Image className="inline mr-2" size={16} />
                                            Cover Image URL
                                        </label>
                                        <input
                                            name="coverImage"
                                            value={form.coverImage}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <LinkIcon className="inline mr-2" size={16} />
                                            Additional Media URLs
                                        </label>
                                        <div className="space-y-3">
                                            {form.media.map((m, i) => (
                                                <input
                                                    key={i}
                                                    value={m}
                                                    onChange={e => handleMediaChange(i, e.target.value)}
                                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder={`Media URL #${i + 1} (optional)`}
                                                />
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addMediaField}
                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                <Plus size={16} />
                                                Add another media URL
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} />
                                            Submit for Approval
                                        </>
                                    )}
                                </button>
                                <p className="text-sm text-gray-500 text-center mt-3">
                                    Your campaign will be reviewed by our team before going live.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCampaign; 