import React, { useEffect, useState } from 'react';
import { FaCalendar, FaDollarSign, FaEdit, FaTimes, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCancelBookingMutation, useGetUserBookingsQuery, useUpdateBookingMutation } from '../api/api';

const BookingHistory = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [rescheduleData, setRescheduleData] = useState({
        checkin: '',
        checkout: '',
        guests: 1
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const { data: bookings, isLoading, refetch } = useGetUserBookingsQuery(user?.id);
    const [cancelBooking] = useCancelBookingMutation();
    const [updateBooking] = useUpdateBookingMutation();

    useEffect(() => {
        if (selectedBooking) {
            setRescheduleData({
                checkin: selectedBooking.checkin.split('T')[0],
                checkout: selectedBooking.checkout.split('T')[0],
                guests: selectedBooking.guests
            });
        }
    }, [selectedBooking]);

    const handleCancelBooking = async () => {
        try {
            await cancelBooking(selectedBooking.id).unwrap();
            toast.success('Booking cancelled successfully');
            setShowCancelModal(false);
            setSelectedBooking(null);
            refetch();
        } catch (error) {
            toast.error('Failed to cancel booking');
        }
    };

    const handleRescheduleBooking = async () => {
        try {
            await updateBooking({
                id: selectedBooking.id,
                data: rescheduleData
            }).unwrap();
            toast.success('Booking rescheduled successfully');
            setShowRescheduleModal(false);
            setSelectedBooking(null);
            refetch();
        } catch (error) {
            toast.error('Failed to reschedule booking');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'completed':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'cancelled':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryGreen mx-auto mb-4"></div>
                    <p className="text-gray-600 font-PoppinsMedium">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-PoppinsBold text-gray-900 mb-2">My Bookings</h1>
                            <p className="text-gray-600 font-PoppinsRegular">View and manage your camping reservations</p>
                        </div>
                        <div className="bg-primaryGreen/10 border border-primaryGreen/20 px-4 py-3 rounded-xl">
                            <div className="text-sm text-primaryGreen font-PoppinsMedium">
                                Total Bookings: <span className="font-PoppinsBold">{bookings?.bookings?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings?.bookings?.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative">
                                <img
                                    src={booking.campingSite?.images?.[0] || '/assets/images/campingtentimage.png'}
                                    alt={booking.campingSite?.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-PoppinsMedium border ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">
                                    {booking.campingSite?.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {booking.campingSite?.description?.substring(0, 100)}...
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaCalendar className="text-primaryGreen" />
                                        <span>
                                            {new Date(booking.checkin).toLocaleDateString()} - {new Date(booking.checkout).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaUsers className="text-primaryGreen" />
                                        <span>{booking.guests} guests</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaDollarSign className="text-primaryGreen" />
                                        <span className="font-PoppinsBold text-gray-900">${booking.total}</span>
                                    </div>
                                </div>

                                {booking.status === 'active' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setShowRescheduleModal(true);
                                            }}
                                            className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-PoppinsMedium hover:bg-blue-100 transition-colors border border-blue-200"
                                        >
                                            <FaEdit className="inline mr-2" />
                                            Reschedule
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setShowCancelModal(true);
                                            }}
                                            className="flex-1 bg-red-50 text-red-700 py-2 px-4 rounded-lg font-PoppinsMedium hover:bg-red-100 transition-colors border border-red-200"
                                        >
                                            <FaTimes className="inline mr-2" />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {(!bookings?.bookings || bookings.bookings.length === 0) && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-6">🏕️</div>
                        <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">No bookings yet</h3>
                        <p className="text-gray-600 mb-6">Start your camping adventure by booking a site</p>
                        <a
                            href="/search"
                            className="bg-primaryGreen text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Browse Camping Sites
                        </a>
                    </div>
                )}
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-gray-100">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaTimes className="text-red-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">Cancel Booking</h3>
                            <p className="text-gray-600">
                                Are you sure you want to cancel your booking for <span className="font-PoppinsBold text-gray-900">"{selectedBooking?.campingSite?.name}"</span>?
                            </p>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowCancelModal(false);
                                    setSelectedBooking(null);
                                }}
                                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-PoppinsMedium transition-colors border border-gray-200"
                            >
                                Keep Booking
                            </button>
                            <button
                                onClick={handleCancelBooking}
                                className="px-6 py-3 bg-red-600 text-white rounded-xl font-PoppinsBold hover:bg-red-700 transition-colors shadow-lg"
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reschedule Modal */}
            {showRescheduleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-gray-100">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaEdit className="text-blue-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">Reschedule Booking</h3>
                            <p className="text-gray-600">
                                Update your booking dates for <span className="font-PoppinsBold text-gray-900">"{selectedBooking?.campingSite?.name}"</span>
                            </p>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleRescheduleBooking(); }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Check-in Date</label>
                                <input
                                    type="date"
                                    value={rescheduleData.checkin}
                                    onChange={(e) => setRescheduleData(prev => ({ ...prev, checkin: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Check-out Date</label>
                                <input
                                    type="date"
                                    value={rescheduleData.checkout}
                                    onChange={(e) => setRescheduleData(prev => ({ ...prev, checkout: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-PoppinsMedium text-gray-700 mb-2">Number of Guests</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={rescheduleData.guests}
                                    onChange={(e) => setRescheduleData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryGreen"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowRescheduleModal(false);
                                        setSelectedBooking(null);
                                    }}
                                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-PoppinsMedium transition-colors border border-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primaryGreen text-white rounded-xl font-PoppinsBold hover:bg-green-700 transition-colors shadow-lg"
                                >
                                    Update Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingHistory; 