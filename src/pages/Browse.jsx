import React, { useState } from 'react';
import { useGetCampaignsQuery } from '../api/api';

const Browse = () => {
    const [search, setSearch] = useState('');
    const { data: campaigns = [], isLoading, error } = useGetCampaignsQuery({ search });
    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#0a58f7' }}>
            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)', color: '#fff', padding: '3rem 0 2rem 0', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 36, fontWeight: 800, margin: '1.5rem 0 1rem 0', lineHeight: 1.1 }}>
                        Browse Startups & Campaigns
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 480, margin: '2rem auto 0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(10,88,247,0.10)' }}>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search by name, category, or tag"
                            style={{ flex: 1, border: 'none', outline: 'none', padding: '1rem', borderRadius: 12, fontSize: 18, color: '#0a58f7', background: 'transparent' }}
                        />
                        <button style={{ background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: 12, padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: 18, margin: 4, cursor: 'pointer' }}>
                            Search
                        </button>
                    </div>
                </div>
            </section>
            {/* Campaigns Grid */}
            <section style={{ background: '#f5f7fa', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32 }}>All Campaigns</h2>
                    {isLoading && <div>Loading campaigns...</div>}
                    {error && <div style={{ color: 'red' }}>Failed to load campaigns.</div>}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
                        {campaigns.map((c) => (
                            <div key={c.id} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 380 }}>
                                <img src={c.coverImage || `https://source.unsplash.com/400x200/?startup,finance,${c.id}`} alt={c.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                                <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 0.5rem 0', color: '#0a58f7' }}>{c.title}</h3>
                                    <p style={{ color: '#263238', fontSize: 15, marginBottom: 16, flex: 1 }}>{c.description}</p>
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                        <span style={{ background: '#e3e6f0', color: '#0a58f7', borderRadius: 8, padding: '0.25rem 0.75rem', fontWeight: 600, fontSize: 13 }}>{c.category}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                                        <div style={{ fontWeight: 700, color: '#0a58f7', fontSize: 16 }}>${c.currentAmount?.toLocaleString() || 0}</div>
                                        <div style={{ color: '#263238', fontSize: 14 }}>Raised</div>
                                        <div style={{ fontWeight: 700, color: '#0a58f7', fontSize: 16, marginLeft: 16 }}>${c.goalAmount?.toLocaleString() || 0}</div>
                                        <div style={{ color: '#263238', fontSize: 14 }}>Goal</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ color: '#0a58f7', fontWeight: 600, fontSize: 14 }}>{c.backers || 0} Backers</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Browse; 