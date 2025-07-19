import React from 'react';
import { useUserDonations } from '../hooks/useDonations';

const UserDashboard = () => {
    const { data, isLoading, isError, error } = useUserDonations();
    const donations = data?.donations || [];

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Donations</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div className="text-red-500">{error.message || 'Failed to load donations.'}</div>
            ) : donations.length === 0 ? (
                <div>No donations yet.</div>
            ) : (
                <table className="w-full text-left bg-white rounded shadow">
                    <thead>
                        <tr>
                            <th className="py-2 px-2">Campaign</th>
                            <th className="py-2 px-2">Amount</th>
                            <th className="py-2 px-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((d, i) => (
                            <tr key={i} className="border-t">
                                <td className="py-2 px-2">{d.campaign?.title || 'N/A'}</td>
                                <td className="py-2 px-2">${d.amount}</td>
                                <td className="py-2 px-2">{new Date(d.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserDashboard; 