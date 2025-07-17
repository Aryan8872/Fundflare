import React, { useEffect, useState } from "react";
import { FaBars, FaBookmark, FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "/assets/logo/logo.png";

const HERO_HEIGHT = 0.75 * window.innerHeight; // 75vh

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we're on the homepage
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => {
            if (isHomePage) {
                // Only apply scroll-based background on homepage
                const threshold = HERO_HEIGHT;
                if (window.scrollY > threshold && !scrolled) setScrolled(true);
                else if (window.scrollY <= threshold && scrolled) setScrolled(false);
            } else {
                // On other pages, always have background
                if (!scrolled) setScrolled(true);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrolled, isHomePage]);

    // Reset scrolled state when route changes
    useEffect(() => {
        if (isHomePage) {
            setScrolled(false);
        } else {
            setScrolled(true);
        }
    }, [isHomePage]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const navlinks = [
        {
            label: "Home",
            route: "/"
        },
        {
            label: "About",
            route: "/about"
        },
        {
            label: "Campground",
            route: "/campground"
        },
        {
            label: "Contact",
            route: "/contact"
        },
    ];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setUserMenuOpen(false);
        toast.success('Logged out successfully');
        navigate('/');
    };

    // Determine navbar styling based on current state
    const getNavbarClasses = () => {
        if (isHomePage && !scrolled) {
            // Homepage, not scrolled - transparent
            return "bg-transparent border-transparent";
        } else {
            // Homepage scrolled or other pages - solid background
            return "bg-white/95 backdrop-blur shadow-md border-gray-200";
        }
    };

    const getTextColor = () => {
        if (isHomePage && !scrolled) {
            return "text-white";
        } else {
            return "text-primaryGreen";
        }
    };

    const getButtonClasses = () => {
        if (isHomePage && !scrolled) {
            return "text-white hover:bg-white/10";
        } else {
            return "text-primaryGreen hover:bg-gray-100";
        }
    };

    const getRegisterButtonClasses = () => {
        if (isHomePage && !scrolled) {
            return "border-white text-white hover:bg-white hover:text-primaryGreen";
        } else {
            return "border-primaryGreen text-primaryGreen hover:bg-primaryGreen hover:text-white";
        }
    };

    return (
        <>
            <div
                className={`flex justify-between z-20 w-full fixed py-4 px-6 lg:px-10 xl:px-24 border-b transition-all duration-300 ${getNavbarClasses()}`}
                style={{ backdropFilter: scrolled || !isHomePage ? 'blur(8px)' : 'none' }}
            >
                <div className="h-[60px] lg:h-[100px] w-[80px] lg:w-[120px] py-2 lg:py-5">
                    <Link to="/">
                        <img src={logo} className="w-full h-full object-contain" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-10 items-center">
                    {navlinks.map((link) => (
                        <Link to={link.route} key={link.route}>
                            <div>
                                <span className={`font-PoppinsRegular transition-colors duration-300 ${getTextColor()}`}>{link.label}</span>
                            </div>
                        </Link>
                    ))}

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300 ${getButtonClasses()}`}
                            >
                                <FaUser />
                                <span className="font-PoppinsMedium">{user.name}</span>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    <Link
                                        to="/bookings"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <FaBookmark />
                                        <span className="font-PoppinsMedium">My Bookings</span>
                                    </Link>
                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <FaUser />
                                            <span className="font-PoppinsMedium">Admin Panel</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                    >
                                        <FaSignOutAlt />
                                        <span className="font-PoppinsMedium">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <span className={`font-PoppinsMedium transition-colors duration-300 ${getTextColor()}`}>
                                    Login
                                </span>
                            </Link>
                            <Link to="/register">
                                <div className={`flex px-6 py-3 rounded-xl cursor-pointer border-2 transition-colors duration-300 ${getRegisterButtonClasses()}`}>
                                    <span className="font-PoppinsMedium">Register</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className={`p-2 rounded-lg transition-colors duration-300 ${getButtonClasses()}`}
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-30 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-xl font-PoppinsBold text-primaryGreen">Menu</h2>
                        <button
                            onClick={closeMobileMenu}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Links */}
                    <nav className="flex-1 p-6">
                        <div className="flex flex-col space-y-4">
                            {navlinks.map((link) => (
                                <Link
                                    to={link.route}
                                    key={link.route}
                                    onClick={closeMobileMenu}
                                    className="text-gray-700 hover:text-primaryGreen font-PoppinsMedium text-lg transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className="p-6 border-t space-y-4">
                        {user ? (
                            <>
                                <div className="text-center py-2">
                                    <p className="text-sm text-gray-600">Welcome,</p>
                                    <p className="font-PoppinsBold text-primaryGreen">{user.name}</p>
                                </div>
                                <Link
                                    to="/bookings"
                                    onClick={closeMobileMenu}
                                    className="block w-full bg-primaryGreen text-white py-3 rounded-lg font-PoppinsBold hover:bg-green-700 transition-colors duration-200 text-center"
                                >
                                    My Bookings
                                </Link>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        onClick={closeMobileMenu}
                                        className="block w-full bg-blue-600 text-white py-3 rounded-lg font-PoppinsBold hover:bg-blue-700 transition-colors duration-200 text-center"
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMobileMenu();
                                    }}
                                    className="w-full bg-red-600 text-white py-3 rounded-lg font-PoppinsBold hover:bg-red-700 transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMobileMenu}
                                    className="block w-full bg-primaryGreen text-white py-3 rounded-lg font-PoppinsBold hover:bg-green-700 transition-colors duration-200 text-center"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMobileMenu}
                                    className="block w-full border-2 border-primaryGreen text-primaryGreen py-3 rounded-lg font-PoppinsBold hover:bg-primaryGreen hover:text-white transition-colors duration-200 text-center"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
