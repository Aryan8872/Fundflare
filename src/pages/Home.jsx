import React from 'react';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)', color: '#fff', paddingBottom: 0 }}>
      {/* Hero Section */}
      <section style={{ padding: '4rem 0 2rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ background: 'rgba(255,255,255,0.12)', color: '#ffd600', borderRadius: 16, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: 16, letterSpacing: 1 }}>#1 trusted fund-raising platform</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, margin: '1.5rem 0 1rem 0', lineHeight: 1.1 }}>
            Unlock your financial potential<br />by invest or get funding
          </h1>
          <p style={{ fontSize: 20, color: '#e3e6f0', marginBottom: 32 }}>
            Funding, on the other hand, refers to the act of providing financial resources, often in the form of capital, to support a project, business, or other venture. Funding can come from a variety of sources, including individuals, institutions, or government entities.
          </p>
          {/* Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: 480, margin: '0 auto 2.5rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(10,88,247,0.10)' }}>
            <input
              type="text"
              placeholder="Search campaign by categories"
              style={{ flex: 1, border: 'none', outline: 'none', padding: '1rem', borderRadius: 12, fontSize: 18, color: '#0a58f7', background: 'transparent' }}
            />
            <button style={{ background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: 12, padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: 18, margin: 4, cursor: 'pointer' }}>
              Search
            </button>
          </div>
        </div>
        {/* Call-to-action Cards */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.10)', borderRadius: 18, padding: '2rem 2.5rem', minWidth: 320, maxWidth: 360, boxShadow: '0 4px 24px rgba(10,88,247,0.10)', textAlign: 'left', color: '#fff', position: 'relative' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Empower your Vision</h2>
            <p style={{ fontSize: 16, color: '#e3e6f0', marginBottom: 24 }}>
              Rise fund is a global investment fund that seeks to create positive social and environmental impact while generating strong financial returns for investors.
            </p>
            <button style={{ background: '#ffd600', color: '#0a58f7', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer' }}>
              Get Funded Today
            </button>
            <span style={{ position: 'absolute', right: 24, bottom: 24, fontSize: 28, color: '#ffd600', opacity: 0.7 }}>🪙</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.10)', borderRadius: 18, padding: '2rem 2.5rem', minWidth: 320, maxWidth: 360, boxShadow: '0 4px 24px rgba(10,88,247,0.10)', textAlign: 'left', color: '#fff', position: 'relative' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Invest with Confidence</h2>
            <p style={{ fontSize: 16, color: '#e3e6f0', marginBottom: 24 }}>
              Investment refers to the process of allocating capital to financial assets or other assets with the expectation of generating a profit or positive return.
            </p>
            <button style={{ background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer' }}>
              Get Invest Today
            </button>
            <span style={{ position: 'absolute', right: 24, bottom: 24, fontSize: 28, color: '#fff', opacity: 0.7 }}>💵</span>
          </div>
        </div>
      </section>
      {/* Investing in a Promising New Venture Section */}
      <section style={{ background: '#fff', color: '#0a58f7', padding: '3rem 0 2rem 0', marginTop: 0 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>Investing in a Promising New Venture</h2>
            <span style={{ background: '#ffd600', color: '#0a58f7', borderRadius: 16, padding: '0.25rem 1rem', fontWeight: 700, fontSize: 16 }}>More 50+</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {/* Placeholder campaign cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ background: '#f5f7fa', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 380 }}>
                <img src={`https://source.unsplash.com/400x200/?startup,finance,${i}`} alt="Campaign" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 0.5rem 0', color: '#0a58f7' }}>Startup Project {i}</h3>
                  <p style={{ color: '#263238', fontSize: 15, marginBottom: 16, flex: 1 }}>A promising new venture in the tech/finance sector, seeking funding to scale and innovate.</p>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <span style={{ background: '#e3e6f0', color: '#0a58f7', borderRadius: 8, padding: '0.25rem 0.75rem', fontWeight: 600, fontSize: 13 }}>Defi</span>
                    <span style={{ background: '#ffd600', color: '#0a58f7', borderRadius: 8, padding: '0.25rem 0.75rem', fontWeight: 600, fontSize: 13 }}>Fintech</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: '#0a58f7', fontSize: 16 }}>$500K</div>
                    <div style={{ color: '#263238', fontSize: 14 }}>Raised</div>
                    <div style={{ fontWeight: 700, color: '#0a58f7', fontSize: 16, marginLeft: 16 }}>$1M</div>
                    <div style={{ color: '#263238', fontSize: 14 }}>Goal</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#0a58f7', fontWeight: 600, fontSize: 14 }}>83 Backers</span>
                    <span style={{ color: '#0a58f7', fontWeight: 600, fontSize: 14 }}>10% Equity</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Unleashing Potential through Community Fundraising Section */}
      <section style={{ background: '#fff', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          {/* Left: Image */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 480 }}>
            <img src="https://images.unsplash.com/photo-1515168833906-d2a3b82b1a48?auto=format&fit=crop&w=600&q=80" alt="Community Fundraising" style={{ width: '100%', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.10)' }} />
          </div>
          {/* Right: Text */}
          <div style={{ flex: 2, minWidth: 320 }}>
            <span style={{ background: '#ffd600', color: '#0a58f7', borderRadius: 16, padding: '0.25rem 1rem', fontWeight: 700, fontSize: 16, marginBottom: 16, display: 'inline-block' }}>Featured</span>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: '1rem 0 1rem 0' }}>Unleashing Potential through Community Fundraising</h2>
            <p style={{ color: '#263238', fontSize: 17, marginBottom: 24, maxWidth: 540 }}>
              Community fundraising unlocks new ways to help organizations, non-profits, and startups reach their goals by leveraging the power of the crowd. Our platform makes it easy to launch, manage, and promote your fundraising campaign to a global audience.
            </p>
            <button style={{ background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer' }}>
              Learn More
            </button>
          </div>
        </div>
      </section>
      {/* Why investo.co is the Right Choice for your Investment Goals */}
      <section style={{ background: '#f5f7fa', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Left: Feature List */}
          <div style={{ flex: 2, minWidth: 320 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: '1rem 0 1rem 0' }}>Why investo.co is the Right Choice for your Investment Goals</h2>
            <ul style={{ color: '#263238', fontSize: 17, marginBottom: 24, maxWidth: 540, paddingLeft: 20, lineHeight: 2 }}>
              <li>Simple investment process for all users</li>
              <li>Top-rated campaigns and startups</li>
              <li>Secure payment and withdrawal methods</li>
              <li>24/7 Customer support</li>
              <li>Verified business and project owners</li>
            </ul>
            <button style={{ background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer' }}>
              Browse Projects
            </button>
          </div>
          {/* Right: Testimonial and Image */}
          <div style={{ flex: 1, minWidth: 320, textAlign: 'center' }}>
            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80" alt="Investor" style={{ width: '100%', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.10)', marginBottom: 16 }} />
            <div style={{ background: '#fff', borderRadius: 12, padding: '1rem', boxShadow: '0 2px 8px rgba(10,88,247,0.10)', color: '#263238', fontSize: 15 }}>
              <span style={{ fontWeight: 700, color: '#0a58f7' }}>&ldquo;</span> I was able to diversify my portfolio and support innovative startups easily with investo.co. <span style={{ fontWeight: 700, color: '#0a58f7' }}>&rdquo;</span>
              <div style={{ marginTop: 8, fontWeight: 600 }}>- Alex, Investor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Exploring the Latest Categories of Business Trends */}
      <section style={{ background: '#fff', color: '#0a58f7', padding: '2rem 0 2rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>Exploring the Latest Categories of Business Trends</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {['Tech', 'Automotive', 'Food & Beverages', 'Health & Wellness', 'Finance', 'Home & Garden', 'Green/Energy', 'Construction', 'More 30+'].map((cat, idx) => (
              <span key={cat} style={{ background: idx === 8 ? '#ffd600' : '#e3e6f0', color: idx === 8 ? '#0a58f7' : '#0a58f7', borderRadius: 16, padding: '0.5rem 1.5rem', fontWeight: 700, fontSize: 15 }}>{cat}</span>
            ))}
          </div>
        </div>
      </section>

      {/* An Exploration of How It Works */}
      <section style={{ background: '#f5f7fa', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>An Exploration of How It Works</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Step 1 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem', minWidth: 280, maxWidth: 340, flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 36, color: '#0a58f7', marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Find your passionate project</h3>
              <p style={{ color: '#263238', fontSize: 15 }}>Browse and discover a wide range of innovative campaigns and startups that match your interests and goals.</p>
            </div>
            {/* Step 2 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem', minWidth: 280, maxWidth: 340, flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 36, color: '#0a58f7', marginBottom: 12 }}>💸</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Invest your savings on project</h3>
              <p style={{ color: '#263238', fontSize: 15 }}>Easily invest in projects with secure payment options and track your investments in real time.</p>
            </div>
            {/* Step 3 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem', minWidth: 280, maxWidth: 340, flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 36, color: '#0a58f7', marginBottom: 12 }}>📈</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Get return from investment</h3>
              <p style={{ color: '#263238', fontSize: 15 }}>Gain returns from your investments as projects grow and succeed, and withdraw your earnings securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section style={{ background: '#fff', color: '#0a58f7', padding: '3rem 0 2rem 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Left: Quote */}
          <div style={{ flex: 2, minWidth: 320 }}>
            <div style={{ background: '#f5f7fa', borderRadius: 12, padding: '2rem', boxShadow: '0 2px 8px rgba(10,88,247,0.10)', color: '#263238', fontSize: 18, fontStyle: 'italic', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, color: '#0a58f7', fontSize: 32 }}>&ldquo;</span> It has been an absolute pleasure dealing with investo during the lockdown. Our church began to focus investments on services, and investo had a great selection of hardware. <span style={{ fontWeight: 700, color: '#0a58f7', fontSize: 32 }}>&rdquo;</span>
            </div>
            <div style={{ fontWeight: 600, color: '#0a58f7', fontSize: 16 }}>- Abu Sufian</div>
          </div>
          {/* Right: Image */}
          <div style={{ flex: 1, minWidth: 320, textAlign: 'center' }}>
            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80" alt="Testimonial" style={{ width: '100%', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.10)' }} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)', color: '#fff', padding: '3rem 0 2rem 0', textAlign: 'center', borderRadius: 18, margin: '2rem 2rem 0 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <span style={{ background: '#ffd600', color: '#0a58f7', borderRadius: 16, padding: '0.25rem 1rem', fontWeight: 700, fontSize: 16, marginBottom: 16, display: 'inline-block' }}>#1 Investo.co</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, margin: '1rem 0 1rem 0' }}>Explore Over 1000 Investment Opportunities Across Various Business Categories</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
            <button style={{ background: '#fff', color: '#0a58f7', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer' }}>
              Browse Projects
            </button>
            <button style={{ background: '#ffd600', color: '#0a58f7', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: 16, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', cursor: 'pointer' }}>
              Create an Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0a1a3a', color: '#fff', padding: '3rem 0 1rem 0', marginTop: 32 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start' }}>
          {/* Newsletter */}
          <div style={{ flex: 2, minWidth: 320 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Subscribe for latest Update</h3>
            <form style={{ display: 'flex', gap: 12 }}>
              <input type="email" placeholder="your@email.com" style={{ flex: 1, borderRadius: 8, border: 'none', padding: '0.75rem 1rem', fontSize: 16 }} />
              <button style={{ background: '#ffd600', color: '#0a58f7', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: 16, cursor: 'pointer' }}>Subscribe</button>
            </form>
          </div>
          {/* Links */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Investors</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#e3e6f0', fontSize: 15 }}>
              <li>Browse Projects</li>
              <li>How it Works</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Business</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#e3e6f0', fontSize: 15 }}>
              <li>Start a Campaign</li>
              <li>Pricing</li>
              <li>Support</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>About us</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#e3e6f0', fontSize: 15 }}>
              <li>Our Story</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: '#e3e6f0', fontSize: 15, marginTop: 32 }}>
          &copy; {new Date().getFullYear()} Invsto.co. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
