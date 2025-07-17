import React from 'react';
import { useGetAllBookingsQuery } from '../../api/api';

const BookingsAdmin = () => {
    const { data: bookings, isLoading } = useGetAllBookingsQuery();

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-PoppinsBold text-gray-900 mb-2">Bookings Management</h1>
                        <p className="text-gray-600 font-PoppinsRegular">View and manage all customer reservations</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-xl">
                        <div className="text-sm text-blue-600 font-PoppinsMedium">
                            Total Bookings: <span className="font-PoppinsBold text-blue-700">{bookings?.bookings?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-PoppinsBold text-gray-900">All Bookings</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage customer reservations and their status</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Customer</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Site</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Check-in</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Check-out</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Guests</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Status</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings?.bookings?.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-PoppinsMedium text-gray-900 text-base">{booking.user?.name}</div>
                                        <div className="text-sm text-gray-500 mt-1">{booking.user?.email}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-PoppinsMedium text-gray-900 text-base">{booking.campingSite?.name}</div>
                                        <div className="text-sm text-gray-500 mt-1">{booking.campingSite?.type}</div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {new Date(booking.checkin).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {new Date(booking.checkout).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-PoppinsMedium border border-blue-200">
                                            {booking.guests} guests
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-PoppinsMedium border ${booking.status === 'active'
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : booking.status === 'completed'
                                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                : 'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-PoppinsBold text-gray-900 text-lg">${booking.total}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!bookings?.bookings || bookings.bookings.length === 0) && (
                    <div className="text-center py-16 text-gray-500">
                        <div className="text-6xl mb-6">📅</div>
                        <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">No bookings yet</h3>
                        <p className="text-gray-600">Bookings will appear here when customers make reservations</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingsAdmin; 