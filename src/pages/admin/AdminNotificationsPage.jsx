import React, { useState } from 'react';
import { useDeleteNotificationMutation, useGetAdminNotificationsQuery, useMarkNotificationAsReadMutation } from '../../api/api';

const typeLabels = {
    booking_confirmation: 'Booking Created',
    booking_cancellation: 'Booking Cancelled',
    booking_rescheduled: 'Booking Rescheduled',
    admin_notification: 'Admin',
};

const AdminNotificationsPage = () => {
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');
    const { data, refetch } = useGetAdminNotificationsQuery({ page, limit: 20, type });
    const [markAsRead] = useMarkNotificationAsReadMutation();
    const [deleteNotification] = useDeleteNotificationMutation();
    const notifications = data?.notifications || [];
    const pages = data?.pagination?.pages || 1;

    const handleMarkAsRead = async (id) => {
        await markAsRead(id);
        refetch();
    };
    const handleDelete = async (id) => {
        await deleteNotification(id);
        refetch();
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-PoppinsBold mb-6 text-gray-900">Admin Notifications</h1>
            <div className="mb-4 flex flex-wrap gap-2 items-center">
                <label className="text-gray-700 font-PoppinsMedium">Filter by type:</label>
                <select
                    className="border rounded-lg px-3 py-2"
                    value={type}
                    onChange={e => { setType(e.target.value); setPage(1); }}
                >
                    <option value="">All</option>
                    <option value="booking_confirmation">Booking Created</option>
                    <option value="booking_cancellation">Booking Cancelled</option>
                    <option value="booking_rescheduled">Booking Rescheduled</option>
                </select>
            </div>
            <div className="bg-white rounded-2xl shadow divide-y">
                {notifications.length === 0 ? (
                    <div className="p-8 text-gray-400 text-center">No notifications found.</div>
                ) : (
                    notifications.map((n) => (
                        <div key={n.id} className={`p-6 flex flex-col md:flex-row md:items-center gap-2 ${!n.isRead ? 'bg-gray-50' : ''}`}>
                            <div className="flex-1">
                                <div className="font-PoppinsBold text-gray-900 mb-1">{n.title} <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">{typeLabels[n.type] || n.type}</span></div>
                                <div className="text-gray-700 text-sm mb-1">{n.message}</div>
                                <div className="text-gray-400 text-xs">{new Date(n.createdAt).toLocaleString()}</div>
                            </div>
                            <div className="flex gap-2 md:flex-col md:items-end">
                                {!n.isRead && (
                                    <button className="text-primaryGreen hover:underline text-xs font-PoppinsMedium" onClick={() => handleMarkAsRead(n.id)}>Mark as read</button>
                                )}
                                <button className="text-red-500 hover:underline text-xs font-PoppinsMedium" onClick={() => handleDelete(n.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-between items-center mt-6">
                <button
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-PoppinsMedium"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                >Previous</button>
                <span className="text-gray-600">Page {page} of {pages}</span>
                <button
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-PoppinsMedium"
                    onClick={() => setPage(p => Math.min(pages, p + 1))}
                    disabled={page === pages}
                >Next</button>
            </div>
        </div>
    );
};

export default AdminNotificationsPage; 