import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCampaigns } from '../hooks/useCampaigns';

const categories = ['All', 'Health', 'Education', 'Medical', 'Startups'];

const Browse = () => {
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const { data, isLoading, isError, error } = useCampaigns({ category: category !== 'All' ? category : undefined, search });
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isError && error) toast.error(error.message || 'Failed to load campaigns');
    }, [isError, error]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-6">Browse Campaigns</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <select
                    className="border rounded px-3 py-2"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input
                    className="border rounded px-3 py-2 flex-1"
                    type="text"
                    placeholder="Search campaigns..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data?.campaigns?.length ? (
                        data.campaigns.map((c) => (
                            <div
                                key={c.id}
                                className="bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
                                onClick={() => navigate(`/campaigns/${c.id}`)}
                            >
                                {c.coverImage && (
                                    <img src={c.coverImage} alt={c.title} className="h-40 w-full object-cover rounded mb-3" />
                                )}
                                <h2 className="text-xl font-semibold mb-2">{c.title}</h2>
                                <p className="text-gray-600 mb-2 line-clamp-3">{c.description}</p>
                                <div className="flex-1" />
                                <div className="mt-2">
                                    <div className="text-sm text-gray-500">Goal: ${c.goalAmount}</div>
                                    <div className="text-sm text-gray-500">Raised: ${c.currentAmount}</div>
                                </div>
                                <button
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    onClick={e => { e.stopPropagation(); navigate(`/campaigns/${c.id}`); }}
                                >
                                    View Details
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>No campaigns found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Browse; 