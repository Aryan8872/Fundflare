import React, { useState } from 'react';
import { FaEdit, FaUserShield, FaUser } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useGetAllUsersQuery, useUpdateUserRoleMutation } from '../../api/api';

const UsersAdmin = () => {
    const { data: users, isLoading, refetch } = useGetAllUsersQuery();
    const [updateUserRole] = useUpdateUserRoleMutation();

    const roleOptions = [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
    ];

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole({ id: userId, role: newRole }).unwrap();
            toast.success('User role updated successfully!');
            refetch();
        } catch (error) {
            toast.error('Failed to update user role');
            console.error('Failed to update user role:', error);
        }
    };

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
                        <p className="text-gray-600 font-PoppinsRegular">Manage user accounts, roles, and permissions</p>
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
                    <p className="text-sm text-gray-600 mt-1">Manage user accounts and their access levels</p>
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
                                        <Select
                                            value={roleOptions.find(option => option.value === user.role)}
                                            onChange={(option) => handleRoleChange(user.id, option.value)}
                                            options={roleOptions}
                                            className="w-32"
                                            styles={{
                                                control: (provided) => ({
                                                    ...provided,
                                                    minHeight: '36px',
                                                    fontSize: '14px',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        border: '1px solid #d1d5db',
                                                    },
                                                }),
                                                option: (provided, state) => ({
                                                    ...provided,
                                                    fontSize: '14px',
                                                    backgroundColor: state.isSelected ? '#8b5cf6' : state.isFocused ? '#f3f4f6' : 'white',
                                                    color: state.isSelected ? 'white' : '#374151',
                                                }),
                                            }}
                                        />
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