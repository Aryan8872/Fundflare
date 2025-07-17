import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar-funding" style={{ background: "linear-gradient(135deg, #0a58f7 0%, #0039a6 100%)", color: "#fff", padding: "0.5rem 0" }}>
            <div className="navbar-container" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem" }}>
                {/* Logo */}
                <Link to="/" className="navbar-logo" style={{ fontWeight: 700, fontSize: 24, letterSpacing: 1, color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 900, fontSize: 28, marginRight: 8 }}>💡</span> Invsto.co
                </Link>
                {/* Navigation Links */}
                <div className="navbar-links" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    <NavLink to="/invest" className="navbar-link" style={({ isActive }) => ({ color: isActive ? "#ffd600" : "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none" })}>Invest</NavLink>
                    <NavLink to="/resources" className="navbar-link" style={({ isActive }) => ({ color: isActive ? "#ffd600" : "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none" })}>Resources</NavLink>
                    <NavLink to="/company" className="navbar-link" style={({ isActive }) => ({ color: isActive ? "#ffd600" : "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none" })}>Company</NavLink>
                    <NavLink to="/browse" className="navbar-link" style={({ isActive }) => ({ color: isActive ? "#ffd600" : "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none" })}>Browse Startup</NavLink>
                </div>
                {/* Auth Buttons */}
                <div className="navbar-auth" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <NavLink to="/login" className="navbar-link" style={{ color: "#fff", fontWeight: 500, fontSize: 16, textDecoration: "none", marginRight: 8 }}>Log In</NavLink>
                    <NavLink to="/register" className="navbar-link" style={{ background: "#fff", color: "#0a58f7", fontWeight: 700, fontSize: 16, borderRadius: 8, padding: "0.5rem 1.5rem", textDecoration: "none", boxShadow: "0 2px 8px rgba(10,88,247,0.10)" }}>Sign Up</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
