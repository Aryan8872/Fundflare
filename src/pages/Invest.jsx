import React from 'react';
import { useGetCampaignsQuery } from '../api/api';

const Invest = () => {
    const { data: campaigns = [], isLoading, error } = useGetCampaignsQuery({});
    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#0a58f7' }}>
            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)', color: '#fff', padding: '4rem 0 2rem 0', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 40, fontWeight: 800, margin: '1.5rem 0 1rem 0', lineHeight: 1.1 }}>
                        Invest in the Future, Today
                    </h1>
                    <p style={{ fontSize: 20, color: '#e3e6f0', marginBottom: 32 }}>
                        Discover and invest in innovative startups and projects. Grow your portfolio and make a positive impact.
                    </p>
                </div>
            </section>
            {/* Campaigns Grid */}
            <section style={{ background: '#f5f7fa', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Available Campaigns</h2>
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

export default Invest; 