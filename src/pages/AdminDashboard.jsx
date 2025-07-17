import React, { useEffect, useState } from 'react';
import { FaBars, FaCampground, FaClipboardList, FaImages, FaUserPlus, FaUsers } from 'react-icons/fa';
import {
    useCreateCampingSiteAdminMutation,
    useDeleteCampingSiteAdminMutation,
    useGetAdminStatsQuery,
    useGetAllBookingsQuery,
    useGetAllCampingSitesAdminQuery,
    useGetAllUsersQuery,
    useToggleCampingSiteStatusMutation,
    useUpdateCampingSiteAdminMutation,
    useUpdateUserRoleMutation,
} from '../api/api';
import Sidebar from '../components/admin/Sidebar';
import CampingSitesAdmin from './admin/CampingSitesAdmin';
import GalleryAdmin from './admin/GalleryAdmin';
import UsersAdmin from './admin/UsersAdmin';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingSite, setEditingSite] = useState(null);
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
    const { data: campingSites, isLoading: sitesLoading } = useGetAllCampingSitesAdminQuery();
    const { data: bookings, isLoading: bookingsLoading } = useGetAllBookingsQuery();
    const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();

    console.log('AdminDashboard state:', { activeTab, statsLoading, sitesLoading, bookingsLoading, usersLoading });

    const [createCampingSite] = useCreateCampingSiteAdminMutation();
    const [updateCampingSite] = useUpdateCampingSiteAdminMutation();
    const [deleteCampingSite] = useDeleteCampingSiteAdminMutation();
    const [toggleStatus] = useToggleCampingSiteStatusMutation();
    const [updateUserRole] = useUpdateUserRoleMutation();

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

    const handleCreateSite = async (formData) => {
        try {
            await createCampingSite(formData).unwrap();
            setShowAddForm(false);
        } catch (error) {
            console.error('Failed to create camping site:', error);
        }
    };

    const handleUpdateSite = async (id, formData) => {
        try {
            await updateCampingSite({ id, data: formData }).unwrap();
            setEditingSite(null);
        } catch (error) {
            console.error('Failed to update camping site:', error);
        }
    };

    const handleDeleteSite = async (id) => {
        if (window.confirm('Are you sure you want to delete this camping site?')) {
            try {
                await deleteCampingSite(id).unwrap();
            } catch (error) {
                console.error('Failed to delete camping site:', error);
            }
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await toggleStatus(id).unwrap();
        } catch (error) {
            console.error('Failed to toggle status:', error);
        }
    };

    const handleUpdateUserRole = async (userId, role) => {
        try {
            await updateUserRole({ id: userId, role }).unwrap();
        } catch (error) {
            console.error('Failed to update user role:', error);
        }
    };

    if (statsLoading || sitesLoading || bookingsLoading || usersLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // Example analytics data (replace with real analytics if available)
    const analytics = [
        { label: 'Online Bookings', value: stats?.stats?.totalBookings || 0, icon: <FaClipboardList />, color: 'bg-blue-100 text-blue-700' },
        { label: 'Active Sites', value: stats?.stats?.availableCampingSites || 0, icon: <FaCampground />, color: 'bg-green-100 text-green-700' },
        { label: 'New Users', value: stats?.stats?.totalUsers || 0, icon: <FaUserPlus />, color: 'bg-purple-100 text-purple-700' },
    ];

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
                                    <p className="text-gray-600 font-PoppinsRegular text-sm md:text-base">Welcome back! Here's what's happening with your camping business.</p>
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
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-500 rounded-xl">
                                        <FaCampground className="text-white text-xl" />
                                    </div>
                                    <span className="text-green-600 text-sm font-PoppinsMedium">Total Sites</span>
                                </div>
                                <div className="text-3xl font-PoppinsBold text-gray-900 mb-1">{stats?.stats?.totalCampingSites || 0}</div>
                                <p className="text-green-600 text-sm font-PoppinsRegular">Active camping locations</p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-500 rounded-xl">
                                        <FaClipboardList className="text-white text-xl" />
                                    </div>
                                    <span className="text-blue-600 text-sm font-PoppinsMedium">Total Bookings</span>
                                </div>
                                <div className="text-3xl font-PoppinsBold text-gray-900 mb-1">{stats?.stats?.totalBookings || 0}</div>
                                <p className="text-blue-600 text-sm font-PoppinsRegular">Reservations this month</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-500 rounded-xl">
                                        <FaUsers className="text-white text-xl" />
                                    </div>
                                    <span className="text-purple-600 text-sm font-PoppinsMedium">Total Users</span>
                                </div>
                                <div className="text-3xl font-PoppinsBold text-gray-900 mb-1">{stats?.stats?.totalUsers || 0}</div>
                                <p className="text-purple-600 text-sm font-PoppinsRegular">Registered customers</p>
                            </div>
                        </div>
                        {/* Main Content Area */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                            {/* Recent Bookings */}
                            <div className="xl:col-span-2">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                        <h2 className="text-lg font-PoppinsBold text-gray-900">Recent Bookings</h2>
                                        <p className="text-sm text-gray-600 mt-1">Latest customer reservations</p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-white">
                                                <tr>
                                                    <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Customer</th>
                                                    <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Site</th>
                                                    <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Dates</th>
                                                    <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {bookings?.bookings?.slice(0, 5).map((booking) => (
                                                    <tr key={booking.id} className="hover:bg-gray-50">
                                                        <td className="py-4 px-6">
                                                            <div>
                                                                <div className="font-PoppinsMedium text-gray-900">{booking.user?.name}</div>
                                                                <div className="text-sm text-gray-500">{booking.user?.email}</div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="font-PoppinsMedium text-gray-900">{booking.campingSite?.name}</div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="text-sm text-gray-900">
                                                                {new Date(booking.checkin).toLocaleDateString()} - {new Date(booking.checkout).toLocaleDateString()}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-PoppinsMedium rounded-full ${booking.status === 'active'
                                                                ? 'bg-green-100 text-green-800'
                                                                : booking.status === 'cancelled'
                                                                    ? 'bg-red-100 text-red-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-PoppinsBold text-gray-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setActiveTab('camping-sites')}
                                            className="w-full text-left p-3 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FaCampground className="text-lg" />
                                                <span className="font-PoppinsMedium">Manage Sites</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('bookings')}
                                            className="w-full text-left p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FaClipboardList className="text-lg" />
                                                <span className="font-PoppinsMedium">View Bookings</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('users')}
                                            className="w-full text-left p-3 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FaUsers className="text-lg" />
                                                <span className="font-PoppinsMedium">Manage Users</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('gallery')}
                                            className="w-full text-left p-3 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FaImages className="text-lg" />
                                                <span className="font-PoppinsMedium">Gallery</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'camping-sites' && (
                    <CampingSitesAdmin
                        campingSites={campingSites?.campingSites || []}
                        onCreateSite={handleCreateSite}
                        onUpdateSite={handleUpdateSite}
                        onDeleteSite={handleDeleteSite}
                        onToggleStatus={handleToggleStatus}
                        showAddForm={showAddForm}
                        setShowAddForm={setShowAddForm}
                        editingSite={editingSite}
                        setEditingSite={setEditingSite}
                    />
                )}
                {activeTab === 'users' && (
                    <UsersAdmin
                        users={users?.users || []}
                        onUpdateUserRole={handleUpdateUserRole}
                    />
                )}
                {activeTab === 'gallery' && (
                    <GalleryAdmin />
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