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
        <nav className="flex items-center w-full bg-gradient-to-tl from-[#0284c7] via-[#2563eb] to-[#1e3a8a] justify-between py-6 px-16">
            <div className="flex items-center gap-48">
                <Link to="/" className="navbar-logo" style={{ fontWeight: 700, fontSize: 24, letterSpacing: 1, color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 900, fontSize: 28, marginRight: 8 }}>💡</span> Invsto.co
                </Link>

                <div className="flex items-center gap-16">
                    <NavLink to="/invest" className="navbar-link" style={({ isActive }) => ({ color: isActive ? "#ffd600" : "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none" })}>Invest</NavLink>
                    <NavLink to="/resources" className="navbar-link" style={({ isActive }) => ({ color: isActive ? "#ffd600" : "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none" })}>Resources</NavLink>
                    <NavLink to="/company" className="navbar-link" style={({ isActive }) => ({ color: isActive ? "#ffd600" : "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none" })}>Company</NavLink>
                    <NavLink to="/browse" className="navbar-link" style={({ isActive }) => ({ color: isActive ? "#ffd600" : "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none" })}>Browse Startup</NavLink>
                </div>
            </div>
            <div className="navbar-auth" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {user && (
                    <div className="relative">
                        <button onClick={() => setShowNotif(v => !v)} className="relative text-white focus:outline-none">
                            <span role="img" aria-label="bell" className="text-2xl">🔔</span>
                            {notifications.some(n => !n.read) && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}
                        </button>
                        {showNotif && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg z-50 max-h-96 overflow-y-auto">
                                <div className="p-3 border-b font-semibold">Notifications</div>
                                {notifications.length === 0 ? (
                                    <div className="p-3 text-gray-500">No notifications</div>
                                ) : notifications.map(n => (
                                    <div key={n.id} className={`p-3 border-b last:border-b-0 ${n.read ? 'bg-gray-50' : 'bg-blue-50'}`}>{n.message}</div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {!user && (
                    <>
                        <NavLink to="/login" className="navbar-link" style={{ color: "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none", marginRight: 8 }}>Log In</NavLink>
                        <NavLink to="/register" className="navbar-link px-7 py-3" style={{ background: "#fff", color: "black", fontWeight: 700, fontSize: 16, borderRadius: 8, textDecoration: "none", boxShadow: "0 2px 8px rgba(10,88,247,0.10)" }}>Sign Up</NavLink>
                    </>
                )}
                {user && (
                    <div className="relative group">
                        <button className="flex items-center gap-2 focus:outline-none">
                            <span className="font-semibold">{user.name || user.email}</span>
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg hidden group-hover:block z-50">
                            <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</NavLink>
                            <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
