import { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showNotif, setShowNotif] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user) {
            fetch('/api/notifications', {
                headers: { Authorization: user.token ? `Bearer ${user.token}` : undefined }
            })
                .then(res => res.json())
                .then(data => setNotifications(data.notifications || []));
        }
    }, [user]);

    return (
        <nav style={{
            width: '100%',
            background: 'linear-gradient(90deg, #0a58f7 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 3rem',
            boxShadow: '0 2px 8px rgba(10,88,247,0.10)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
                <Link to="/" style={{ fontWeight: 900, fontSize: 28, color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 900, fontSize: 32, marginRight: 8 }}>🌟</span> FundFlare
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                    <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#ffd600' : '#fff', fontWeight: 500, fontSize: 16, textDecoration: 'none' })}>Home</NavLink>
                    <NavLink to="/browse" style={({ isActive }) => ({ color: isActive ? '#ffd600' : '#fff', fontWeight: 500, fontSize: 16, textDecoration: 'none' })}>Browse</NavLink>
                    <NavLink to="/resources" style={({ isActive }) => ({ color: isActive ? '#ffd600' : '#fff', fontWeight: 500, fontSize: 16, textDecoration: 'none' })}>Resources</NavLink>
                    <NavLink to="/company" style={({ isActive }) => ({ color: isActive ? '#ffd600' : '#fff', fontWeight: 500, fontSize: 16, textDecoration: 'none' })}>Company</NavLink>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {user && (
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => setShowNotif(v => !v)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, position: 'relative', cursor: 'pointer' }}>
                            <span role="img" aria-label="bell">🔔</span>
                            {notifications.some(n => !n.read) && <span style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: '#ef4444', borderRadius: '50%' }}></span>}
                        </button>
                        {showNotif && (
                            <div style={{ position: 'absolute', right: 0, marginTop: 8, width: 320, background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', zIndex: 50, maxHeight: 384, overflowY: 'auto' }}>
                                <div style={{ padding: 12, borderBottom: '1px solid #e5e7eb', fontWeight: 700 }}>Notifications</div>
                                {notifications.length === 0 ? (
                                    <div style={{ padding: 12, color: '#64748b' }}>No notifications</div>
                                ) : notifications.map(n => (
                                    <div key={n.id} style={{ padding: 12, borderBottom: '1px solid #e5e7eb', background: n.read ? '#f1f5f9' : '#e0e7ff' }}>{n.message}</div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {!user && (
                    <>
                        <NavLink to="/login" style={{ color: '#fff', fontWeight: 500, fontSize: 16, textDecoration: 'none', marginRight: 8 }}>Log In</NavLink>
                        <NavLink to="/register" style={{ background: '#fff', color: '#0a58f7', fontWeight: 700, fontSize: 16, borderRadius: 8, textDecoration: 'none', boxShadow: '0 2px 8px rgba(10,88,247,0.10)', padding: '10px 28px' }}>Sign Up</NavLink>
                    </>
                )}
                {user && (
                    <div style={{ position: 'relative' }}>
                        <button style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                            <span>{user.name || user.email}</span>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                        <div style={{ position: 'absolute', right: 0, marginTop: 8, width: 160, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(10,88,247,0.10)', zIndex: 50, display: 'none' /* implement dropdown logic if needed */ }}>
                            <NavLink to="/profile" style={{ display: 'block', padding: '10px 16px', color: '#222', textDecoration: 'none', borderRadius: 8, fontWeight: 500 }}>Profile</NavLink>
                            <button onClick={logout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, borderRadius: 8, cursor: 'pointer' }}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
