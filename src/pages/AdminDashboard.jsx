import React, { useEffect, useState } from 'react';
import { FaBars, FaUsers } from 'react-icons/fa';
import {
    useGetAdminStatsQuery,
    useGetAllUsersQuery,
} from '../api/api';
import Sidebar from '../components/admin/Sidebar';
import UsersAdmin from './admin/UsersAdmin';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Read URL parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');
        console.log('URL params:', { tab, search: window.location.search });
        if (tab) {
            setActiveTab(tab);
        }
    }, []);

    // API hooks
    const { data: stats, isLoading: statsLoading } = useGetAdminStatsQuery();
    const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();

    console.log('AdminDashboard state:', { activeTab, statsLoading, usersLoading });

    // Responsive sidebar toggle
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
            if (window.innerWidth >= 1024 && sidebarOpen) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [sidebarOpen]);

    // Handler for main content click
    const handleMainClick = () => {
        if (sidebarOpen && !isLargeScreen) {
            setSidebarOpen(false);
        }
    };

    if (statsLoading || usersLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // Remove or replace any stat cards or analytics for bookings, camping sites, or gallery.

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            {/* Sidebar (overlay on mobile, fixed on desktop) */}
            <div className="lg:relative z-40">
                {/* Mobile sidebar toggle button */}
                <button
                    className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md border border-gray-200"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <FaBars size={22} />
                </button>
                {/* Sidebar overlay for mobile */}
                {sidebarOpen && !isLargeScreen && (
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-40" onClick={() => setSidebarOpen(false)}></div>
                )}
                <Sidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onClose={() => setSidebarOpen(false)}
                    isOpen={sidebarOpen || isLargeScreen}
                />
            </div>

            {/* Main content */}
            <main
                className="flex-1 min-w-0 flex flex-col p-2 sm:p-4 md:p-6 lg:p-8 transition-all duration-300"
                style={{ marginLeft: isLargeScreen ? 0 : 0 }}
                onClick={handleMainClick}
            >
                {/* Responsive stat cards and content */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-4 md:space-y-6">
                        {/* Page Header */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-PoppinsBold text-gray-900 mb-2">Dashboard Overview</h1>
                                    <p className="text-gray-600 font-PoppinsRegular text-sm md:text-base">Welcome back! Here's what's happening with your platform.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-xs md:text-sm text-gray-500 bg-gray-50 px-3 md:px-4 py-2 rounded-lg">
                                        Last updated: {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-500 rounded-xl">
                                        <FaUsers className="text-white text-xl" />
                                    </div>
                                    <span className="text-purple-600 text-sm font-PoppinsMedium">Total Users</span>
                                </div>
                                <div className="text-3xl font-PoppinsBold text-gray-900 mb-1">{stats?.stats?.totalUsers || 0}</div>
                                <p className="text-purple-600 text-sm font-PoppinsRegular">Registered users</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'users' && (
                    <UsersAdmin
                        users={users?.users || []}
                    />
                )}
                {activeTab === 'settings' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-PoppinsBold text-gray-900 mb-4">Settings</h2>
                        <p className="text-gray-600">Settings page coming soon...</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard; 