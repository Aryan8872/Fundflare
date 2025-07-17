import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useGetAdminNotificationsQuery, useMarkNotificationAsReadMutation } from '../../api/api';

const AdminNotificationBell = () => {
    const { data, refetch } = useGetAdminNotificationsQuery({ page: 1, limit: 5 });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [markAsRead] = useMarkNotificationAsReadMutation();
    const unreadCount = data?.unreadCount || 0;
    const notifications = data?.notifications || [];

    const handleMarkAsRead = async (id) => {
        await markAsRead(id);
        refetch();
    };

    return (
        <div className="relative">
            <button
                className="relative focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-label="Notifications"
            >
                <FaBell className="text-2xl text-gray-700 hover:text-primaryGreen transition-colors" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                        {unreadCount}
                    </span>
                )}
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-50 border border-gray-100">
                    <div className="p-4 border-b font-PoppinsBold text-gray-900">Notifications</div>
                    <ul className="max-h-80 overflow-y-auto divide-y">
                        {notifications.length === 0 ? (
                            <li className="p-4 text-gray-400 text-center">No notifications</li>
                        ) : (
                            notifications.map((n) => (
                                <li key={n.id} className={`p-4 flex flex-col gap-1 ${!n.isRead ? 'bg-gray-50' : ''}`}>
                                    <div className="flex items-center justify-between">
                                        <span className="font-PoppinsMedium text-gray-800">{n.title}</span>
                                        {!n.isRead && (
                                            <button
                                                className="text-xs text-primaryGreen hover:underline ml-2"
                                                onClick={() => handleMarkAsRead(n.id)}
                                            >Mark as read</button>
                                        )}
                                    </div>
                                    <span className="text-gray-600 text-sm">{n.message}</span>
                                    <span className="text-gray-400 text-xs mt-1">{new Date(n.createdAt).toLocaleString()}</span>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="p-2 text-center">
                        <a href="/admin/notifications" className="text-primaryGreen hover:underline text-sm font-PoppinsMedium">View all</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminNotificationBell; 