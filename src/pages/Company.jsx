import React from 'react';

const Company = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#0a58f7' }}>
            <section style={{ background: 'linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)', color: '#fff', padding: '3rem 0 2rem 0', textAlign: 'center' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h1 style={{ fontSize: 36, fontWeight: 800, margin: '1.5rem 0 1rem 0', lineHeight: 1.1 }}>
                        About Invsto.co
                    </h1>
                    <p style={{ fontSize: 20, color: '#e3e6f0', marginBottom: 32 }}>
                        Our mission is to empower entrepreneurs and investors to create a better future through funding and innovation.
                    </p>
                </div>
            </section>
            <section style={{ background: '#f5f7fa', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2rem' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Our Mission & Vision</h2>
                    <p style={{ color: '#263238', fontSize: 16, marginBottom: 24 }}>
                        We believe in the power of community and innovation. Our platform connects visionary founders with passionate investors, enabling the next generation of startups to thrive. We are committed to transparency, security, and positive impact.
                    </p>
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Our Values</h3>
                    <ul style={{ color: '#263238', fontSize: 16, marginBottom: 24, paddingLeft: 20, lineHeight: 2 }}>
                        <li>Integrity & Trust</li>
                        <li>Innovation & Growth</li>
                        <li>Community & Collaboration</li>
                        <li>Impact & Responsibility</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Company; 