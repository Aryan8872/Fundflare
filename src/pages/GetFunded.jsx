import React, { useState } from 'react';
import { useCreateCampaignMutation } from '../api/api';

const GetFunded = () => {
    const [form, setForm] = useState({ title: '', description: '', category: '', goalAmount: '' });
    const [createCampaign, { isLoading, isSuccess, isError, error }] = useCreateCampaignMutation();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCampaign({ ...form, goalAmount: Number(form.goalAmount) }).unwrap();
            setForm({ title: '', description: '', category: '', goalAmount: '' });
        } catch (err) { }
    };
    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#0a58f7' }}>
            {/* Hero Section */}
            <section style={{ background: 'linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)', color: '#fff', padding: '4rem 0 2rem 0', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 40, fontWeight: 800, margin: '1.5rem 0 1rem 0', lineHeight: 1.1 }}>
                        Get Funded for Your Next Big Idea
                    </h1>
                    <p style={{ fontSize: 20, color: '#e3e6f0', marginBottom: 32 }}>
                        Launch your campaign and connect with a global network of investors. Share your vision and raise the capital you need to grow.
                    </p>
                </div>
            </section>
            {/* Campaign Form */}
            <section style={{ background: '#f5f7fa', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Start a New Campaign</h2>
                    <form onSubmit={handleSubmit}>
                        <input name="title" value={form.title} onChange={handleChange} placeholder="Campaign Title" required style={{ width: '100%' }} />
                        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required rows={4} style={{ width: '100%' }} />
                        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required style={{ width: '100%' }} />
                        <input name="goalAmount" value={form.goalAmount} onChange={handleChange} placeholder="Goal Amount (USD)" type="number" required style={{ width: '100%' }} />
                        <button type="submit" disabled={isLoading} style={{ background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer', marginTop: 16 }}>
                            {isLoading ? 'Submitting...' : 'Submit Campaign'}
                        </button>
                    </form>
                    {isSuccess && <div style={{ color: 'green', marginTop: 16 }}>Campaign submitted successfully!</div>}
                    {isError && <div style={{ color: 'red', marginTop: 16 }}>Failed to submit campaign.</div>}
                </div>
            </section>
        </div>
    );
};

export default GetFunded; 