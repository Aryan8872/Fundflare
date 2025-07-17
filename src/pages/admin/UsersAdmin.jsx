import React from 'react';
import { FaEdit, FaUserShield } from 'react-icons/fa';
import { useGetAllUsersQuery } from '../../api/api';

const UsersAdmin = () => {
    const { data: users, isLoading } = useGetAllUsersQuery();

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-PoppinsBold text-gray-900 mb-2">Users Management</h1>
                        <p className="text-gray-600 font-PoppinsRegular">Manage user accounts and permissions</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 px-4 py-3 rounded-xl">
                        <div className="text-sm text-purple-600 font-PoppinsMedium">
                            Total Users: <span className="font-PoppinsBold text-purple-700">{users?.users?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-PoppinsBold text-gray-900">All Users</h2>
                    <p className="text-sm text-gray-600 mt-1">User accounts and their access levels</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">User</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Email</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Role</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Joined</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users?.users?.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-PoppinsMedium text-gray-900 text-base">{user.name}</div>
                                        <div className="text-sm text-gray-500 mt-1">ID: {user.id}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-base text-gray-900">{user.email}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-PoppinsMedium">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 hover:border-blue-300"
                                                title="Edit user"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                                                title="Delete user"
                                            >
                                                <FaUserShield size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!users?.users || users.users.length === 0) && (
                    <div className="text-center py-16 text-gray-500">
                        <div className="text-6xl mb-6">👥</div>
                        <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">No users yet</h3>
                        <p className="text-gray-600">Users will appear here when they register</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersAdmin; 