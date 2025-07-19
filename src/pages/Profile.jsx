import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';

const Profile = () => {
    const { user } = useAuthContext();
    const [name, setName] = useState(user?.name || '');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement update user API call
        alert('Profile update not implemented yet.');
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Leave blank to keep current password"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile; 