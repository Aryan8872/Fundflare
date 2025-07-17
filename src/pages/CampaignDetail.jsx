import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCampaignByIdQuery } from '../api/api';

const CampaignDetail = () => {
    const { id } = useParams();
    const { data: campaign, isLoading, error } = useGetCampaignByIdQuery(id);
    if (isLoading) return <div style={{ padding: 40 }}>Loading campaign...</div>;
    if (error || !campaign) return <div style={{ padding: 40, color: 'red' }}>Failed to load campaign.</div>;
    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#0a58f7' }}>
            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)', color: '#fff', padding: '3rem 0 2rem 0', textAlign: 'center' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <img src={campaign.coverImage || 'https://source.unsplash.com/800x400/?startup,finance'} alt={campaign.title} style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.10)', marginBottom: 24 }} />
                    <h1 style={{ fontSize: 36, fontWeight: 800, margin: '1.5rem 0 1rem 0', lineHeight: 1.1 }}>{campaign.title}</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
                        <span style={{ background: '#ffd600', color: '#0a58f7', borderRadius: 16, padding: '0.5rem 1.5rem', fontWeight: 700, fontSize: 15 }}>{campaign.category}</span>
                        <span style={{ background: '#e3e6f0', color: '#0a58f7', borderRadius: 16, padding: '0.5rem 1.5rem', fontWeight: 700, fontSize: 15 }}>{campaign.equity || 'N/A'} Equity</span>
                        <span style={{ background: '#e3e6f0', color: '#0a58f7', borderRadius: 16, padding: '0.5rem 1.5rem', fontWeight: 700, fontSize: 15 }}>{campaign.backers || 0} Backers</span>
                    </div>
                </div>
            </section>
            {/* Campaign Details */}
            <section style={{ background: '#fff', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>About this Campaign</h2>
                    <p style={{ color: '#263238', fontSize: 16, marginBottom: 24 }}>{campaign.description}</p>
                    <div style={{ marginBottom: 24 }}>
                        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Funding Progress</div>
                        <div style={{ background: '#e3e6f0', borderRadius: 8, height: 18, width: '100%', marginBottom: 8 }}>
                            <div style={{ background: 'linear-gradient(90deg, #ffd600 0%, #0a58f7 100%)', borderRadius: 8, height: 18, width: `${(campaign.currentAmount / campaign.goalAmount) * 100}%`, transition: 'width 0.3s' }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#263238' }}>
                            <span>Raised: ${campaign.currentAmount?.toLocaleString() || 0}</span>
                            <span>Goal: ${campaign.goalAmount?.toLocaleString() || 0}</span>
                        </div>
                    </div>
                    <button style={{ background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer' }}>
                        Invest Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CampaignDetail; 