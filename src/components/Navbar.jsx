import React, { useState } from 'react';
import { FaBars, FaRegHeart, FaTimes, FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Browse', path: '/browse' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' }
    ];

    const handleUserDropdownToggle = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsUserDropdownOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <FaRegHeart className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">FundFlare</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200${isActive ? ' text-blue-600 font-bold' : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!user && (
                            <>
                                <NavLink to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">Sign In</NavLink>
                                <NavLink to="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Sign Up</NavLink>
                            </>
                        )}
                        {user && (
                            <div className="relative">
                                <button
                                    onClick={handleUserDropdownToggle}
                                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                                >
                                    <FaUser size={20} />
                                    <span>{user.name || user.email}</span>
                                </button>
                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                                        <NavLink
                                            to="/profile"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                            onClick={() => setIsUserDropdownOpen(false)}
                                        >
                                            Profile
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4">
                        <div className="space-y-4">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `block text-gray-600 hover:text-blue-600 font-medium transition-colors${isActive ? ' text-blue-600 font-bold' : ''}`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                            <div className="pt-4 border-t border-gray-100 space-y-2">
                                {!user && (
                                    <>
                                        <NavLink to="/login" className="block w-full text-left text-blue-600 hover:text-blue-700 font-medium transition-colors">Sign In</NavLink>
                                        <NavLink to="/register" className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">Sign Up</NavLink>
                                    </>
                                )}
                                {user && (
                                    <>
                                        <NavLink to="/profile" className="block w-full text-left text-gray-700 hover:bg-gray-100">Profile</NavLink>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
