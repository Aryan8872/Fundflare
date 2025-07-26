import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)', color: '#222', padding: '2rem 0' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem' }}>
                <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24, textAlign: 'center', color: '#0a58f7' }}>Browse Campaigns</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                    <select
                        style={{ borderRadius: 8, padding: 12, border: '1px solid #cbd5e1', fontSize: 16, width: 200 }}
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <input
                        style={{ borderRadius: 8, padding: 12, border: '1px solid #cbd5e1', fontSize: 16, flex: 1 }}
                        type="text"
                        placeholder="Search campaigns..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                        {data?.campaigns?.length ? (
                            data.campaigns.map((c) => (
                                <div
                                    key={c.id}
                                    style={{ background: '#f9fafb', borderRadius: 14, boxShadow: '0 2px 8px rgba(10,88,247,0.08)', padding: 20, display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'box-shadow 0.2s', marginBottom: 8 }}
                                    onClick={() => navigate(`/campaigns/${c.id}`)}
                                >
                                    {c.coverImage && (
                                        <img src={c.coverImage} alt={c.title} style={{ height: 180, width: '100%', objectFit: 'cover', borderRadius: 10, marginBottom: 12 }} />
                                    )}
                                    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{c.title}</h2>
                                    <p style={{ color: '#64748b', marginBottom: 8, minHeight: 48 }}>{c.description}</p>
                                    <div style={{ flex: 1 }} />
                                    <div style={{ marginTop: 8 }}>
                                        <div style={{ fontSize: 15, color: '#64748b' }}>Goal: ${c.goalAmount}</div>
                                        <div style={{ fontSize: 15, color: '#64748b' }}>Raised: ${c.currentAmount}</div>
                                    </div>
                                    <button
                                        style={{ marginTop: 16, background: 'linear-gradient(90deg, #0a58f7 0%, #4f46e5 100%)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 0', fontSize: 16, cursor: 'pointer', width: '100%' }}
                                        onClick={e => { e.stopPropagation(); navigate(`/campaigns/${c.id}`); }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', color: '#ef4444', fontWeight: 700 }}>No campaigns found.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse; 