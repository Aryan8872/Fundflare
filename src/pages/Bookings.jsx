import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUserBookingsQuery } from '../api/api';
import BookingCard from '../components/BookingCard';

const Bookings = () => {
    const user = useSelector((state) => state.auth.user);
    const { data, isLoading, refetch } = useGetUserBookingsQuery(user?.id, { skip: !user });
    const bookings = data?.bookings || [];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-PoppinsBold mb-6 text-gray-900">My Bookings</h1>
            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading bookings...</div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-400">You have no bookings yet.</div>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} onAction={refetch} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings; 