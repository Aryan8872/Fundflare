import React, { useState } from 'react';
import { FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaMoneyBill, FaTimes, FaUserFriends } from 'react-icons/fa';
import BookingActions from './BookingActions';

const statusColors = {
    active: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-gray-100 text-gray-700',
    rescheduled: 'bg-yellow-100 text-yellow-700',
};

const BookingCard = ({ booking, onAction }) => {
    const [showActions, setShowActions] = useState(false);
    const [actionType, setActionType] = useState(null);

    // Handle case where booking is undefined or null
    if (!booking) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="text-center text-gray-500">Loading booking...</div>
            </div>
        );
    }

    const handleAction = (type) => {
        setActionType(type);
        setShowActions(true);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center gap-6 relative">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColors[booking.status] || 'bg-gray-100 text-gray-700'}`}>{booking.status}</span>
                </div>
                <h2 className="text-lg font-PoppinsBold text-gray-900 mb-1">{booking.campingSite?.name}</h2>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <FaMapMarkerAlt />
                    <span>{booking.campingSite?.location}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-2">
                    <div className="flex items-center gap-1"><FaCalendarAlt /> {new Date(booking.checkin).toLocaleDateString()} - {new Date(booking.checkout).toLocaleDateString()}</div>
                    <div className="flex items-center gap-1"><FaUserFriends /> {booking.guests} guests</div>
                    <div className="flex items-center gap-1"><FaMoneyBill /> ${booking.total?.toFixed(2) || '0.00'}</div>
                </div>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
                {booking.status === 'active' && (
                    <>
                        <button
                            className="bg-primaryGreen text-white px-4 py-2 rounded-lg font-PoppinsBold hover:bg-green-700 transition-colors flex items-center gap-2"
                            onClick={() => handleAction('reschedule')}
                        >
                            <FaEdit /> Reschedule
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg font-PoppinsBold hover:bg-red-700 transition-colors flex items-center gap-2"
                            onClick={() => handleAction('cancel')}
                        >
                            <FaTimes /> Cancel
                        </button>
                    </>
                )}
            </div>
            {showActions && (
                <BookingActions
                    booking={booking}
                    type={actionType}
                    onClose={() => setShowActions(false)}
                    onAction={onAction}
                />
            )}
        </div>
    );
};

export default BookingCard; 