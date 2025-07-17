import React, { useState } from 'react';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { useGetAllCampingSitesAdminQuery } from '../../api/api';

const BookingsByDayAdmin = () => {
    const [selectedSite, setSelectedSite] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [groupedBookings, setGroupedBookings] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { data: sitesData } = useGetAllCampingSitesAdminQuery();
    const sites = sitesData?.campingSites || [];

    const fetchBookingsByDay = async () => {
        if (!selectedSite || !startDate || !endDate) {
            alert('Please select a camping site and date range');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/site/${selectedSite}/grouped/${startDate}/${endDate}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setGroupedBookings(data.groupedBookings);
            } else {
                alert('Failed to fetch bookings');
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            alert('Error fetching bookings');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getSelectedSiteName = () => {
        return sites.find(site => site.id === selectedSite)?.name || '';
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-PoppinsBold mb-6 text-gray-900">Bookings by Day</h1>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Camping Site</label>
                        <select
                            value={selectedSite}
                            onChange={(e) => setSelectedSite(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryGreen focus:border-transparent"
                        >
                            <option value="">Select a camping site</option>
                            {sites.map((site) => (
                                <option key={site.id} value={site.id}>
                                    {site.name} - {site.location}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryGreen focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryGreen focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={fetchBookingsByDay}
                            disabled={!selectedSite || !startDate || !endDate || isLoading}
                            className="w-full bg-primaryGreen text-white py-3 px-6 rounded-xl font-PoppinsBold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'Loading...' : 'View Bookings'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results */}
            {Object.keys(groupedBookings).length > 0 && (
                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h2 className="text-lg font-PoppinsBold text-blue-900 mb-2">
                            Bookings for {getSelectedSiteName()}
                        </h2>
                        <p className="text-blue-700 text-sm">
                            Showing bookings from {formatDate(startDate)} to {formatDate(endDate)}
                        </p>
                    </div>

                    {Object.entries(groupedBookings).map(([date, bookings]) => (
                        <div key={date} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-primaryGreen" />
                                    <h3 className="font-PoppinsBold text-gray-900">{formatDate(date)}</h3>
                                    <span className="bg-primaryGreen text-white px-2 py-1 rounded-full text-xs font-PoppinsMedium">
                                        {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                {bookings.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No bookings for this date</p>
                                ) : (
                                    <div className="grid gap-4">
                                        {bookings.map((booking) => (
                                            <div key={booking.id} className="bg-gray-50 rounded-xl p-4">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <FaUsers className="text-gray-500" />
                                                            <span className="font-PoppinsMedium text-gray-900">
                                                                {booking.user.name}
                                                            </span>
                                                            <span className="text-gray-500">({booking.user.email})</span>
                                                        </div>

                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-gray-600">Check-in:</span>
                                                                <p className="font-PoppinsMedium">{new Date(booking.checkin).toLocaleDateString()}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-600">Check-out:</span>
                                                                <p className="font-PoppinsMedium">{new Date(booking.checkout).toLocaleDateString()}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-600">Guests:</span>
                                                                <p className="font-PoppinsMedium">{booking.guests}</p>
                                                            </div>
                                                            <div>
                                                                <span className="text-gray-600">Total:</span>
                                                                <p className="font-PoppinsMedium text-primaryGreen">${booking.total.toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${booking.status === 'active' ? 'bg-green-100 text-green-700' :
                                                                booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                                    'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingsByDayAdmin; 