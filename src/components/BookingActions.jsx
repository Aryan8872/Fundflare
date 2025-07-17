import React, { useState } from 'react';
import { useCancelBookingMutation, useRescheduleBookingMutation } from '../api/api';

const BookingActions = ({ booking, type, onClose, onAction }) => {
    const [cancelBooking, { isLoading: cancelling }] = useCancelBookingMutation();
    const [rescheduleBooking, { isLoading: rescheduling }] = useRescheduleBookingMutation();
    const [dates, setDates] = useState({
        checkin: booking.checkin.slice(0, 10),
        checkout: booking.checkout.slice(0, 10),
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCancel = async () => {
        try {
            await cancelBooking(booking.id).unwrap();
            setSuccess('Booking cancelled successfully.');
            onAction && onAction();
            setTimeout(onClose, 1200);
        } catch (e) {
            setError(e.data?.message || 'Failed to cancel booking.');
        }
    };

    const handleReschedule = async () => {
        if (!dates.checkin || !dates.checkout) {
            setError('Please select both check-in and check-out dates.');
            return;
        }
        try {
            await rescheduleBooking({ id: booking.id, data: dates }).unwrap();
            setSuccess('Booking rescheduled successfully.');
            onAction && onAction();
            setTimeout(onClose, 1200);
        } catch (e) {
            setError(e.data?.message || 'Failed to reschedule booking.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
                {type === 'cancel' && (
                    <>
                        <h2 className="text-xl font-PoppinsBold mb-4 text-red-600">Cancel Booking</h2>
                        <p className="mb-6 text-gray-700">Are you sure you want to cancel your booking for <b>{booking.campingSite?.name}</b>?</p>
                        {error && <div className="text-red-500 mb-2">{error}</div>}
                        {success && <div className="text-green-600 mb-2">{success}</div>}
                        <button
                            className="bg-red-500 text-white px-6 py-2 rounded-lg font-PoppinsBold hover:bg-red-700 transition-colors w-full"
                            onClick={handleCancel}
                            disabled={cancelling}
                        >
                            {cancelling ? 'Cancelling...' : 'Yes, Cancel Booking'}
                        </button>
                    </>
                )}
                {type === 'reschedule' && (
                    <>
                        <h2 className="text-xl font-PoppinsBold mb-4 text-primaryGreen">Reschedule Booking</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Check-in</label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2 mb-2"
                                value={dates.checkin}
                                onChange={e => setDates(d => ({ ...d, checkin: e.target.value }))}
                            />
                            <label className="block text-gray-700 mb-1">Check-out</label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2"
                                value={dates.checkout}
                                onChange={e => setDates(d => ({ ...d, checkout: e.target.value }))}
                            />
                        </div>
                        {error && <div className="text-red-500 mb-2">{error}</div>}
                        {success && <div className="text-green-600 mb-2">{success}</div>}
                        <button
                            className="bg-primaryGreen text-white px-6 py-2 rounded-lg font-PoppinsBold hover:bg-green-700 transition-colors w-full"
                            onClick={handleReschedule}
                            disabled={rescheduling}
                        >
                            {rescheduling ? 'Rescheduling...' : 'Reschedule Booking'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingActions; 