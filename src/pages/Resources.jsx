import React from 'react';

const Resources = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#0a58f7' }}>
            <section style={{ background: 'linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)', color: '#fff', padding: '3rem 0 2rem 0', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 36, fontWeight: 800, margin: '1.5rem 0 1rem 0', lineHeight: 1.1 }}>
                        Resources & Guides
                    </h1>
                    <p style={{ fontSize: 20, color: '#e3e6f0', marginBottom: 32 }}>
                        Learn more about investing, fundraising, and growing your business with our curated resources.
                    </p>
                </div>
            </section>
            <section style={{ background: '#f5f7fa', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32 }}>Featured Articles</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem', minHeight: 220 }}>
                                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Resource Article {i}</h3>
                                <p style={{ color: '#263238', fontSize: 15, marginBottom: 16 }}>A helpful guide on investing, fundraising, or business growth. Learn best practices and tips from industry experts.</p>
                                <button style={{ background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.5rem 1.5rem', fontSize: 15, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer' }}>
                                    Read More
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Resources; 