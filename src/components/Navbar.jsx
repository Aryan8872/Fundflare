import { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const { user } = useAuthContext();
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
                <NavLink to="/login" className="navbar-link" style={{ color: "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none", marginRight: 8 }}>Log In</NavLink>
                <NavLink to="/register" className="navbar-link px-7 py-3" style={{ background: "#fff", color: "black", fontWeight: 700, fontSize: 16, borderRadius: 8, textDecoration: "none", boxShadow: "0 2px 8px rgba(10,88,247,0.10)" }}>Sign Up</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
