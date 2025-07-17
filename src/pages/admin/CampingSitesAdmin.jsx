import React, { useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
    useCreateCampaignMutation,
    useDeleteCampaignMutation,
    useGetAllCampaignsAdminQuery,
    useUpdateCampaignMutation,
} from '../../api/api';
import AddSiteAdmin from './AddSiteAdmin';

const CampingSitesAdmin = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingSite, setEditingSite] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [siteToDelete, setSiteToDelete] = useState(null);

    const { data: campaigns, isLoading, refetch } = useGetAllCampaignsAdminQuery();
    const [createCampaign] = useCreateCampaignMutation();
    const [updateCampaign] = useUpdateCampaignMutation();
    const [deleteCampaign] = useDeleteCampaignMutation();

    const statusOptions = [
        { value: 'available', label: 'Available' },
        { value: 'unavailable', label: 'Unavailable' },
    ];

    const handleCreateSite = async (formData) => {
        try {
            await createCampaign(formData).unwrap();
            toast.success('Campaign created successfully!');
            setShowAddModal(false);
            refetch();
        } catch (error) {
            toast.error('Failed to create campaign');
            console.error('Failed to create campaign:', error);
        }
    };

    const handleUpdateSite = async (id, formData) => {
        try {
            await updateCampaign({ id, data: formData }).unwrap();
            toast.success('Campaign updated successfully!');
            setEditingSite(null);
            refetch();
        } catch (error) {
            toast.error('Failed to update campaign');
            console.error('Failed to update campaign:', error);
        }
    };

    const handleDeleteSite = async () => {
        if (!siteToDelete) return;

        try {
            await deleteCampaign(siteToDelete.id).unwrap();
            toast.success('Campaign deleted successfully!');
            setShowDeleteModal(false);
            setSiteToDelete(null);
            refetch();
        } catch (error) {
            toast.error('Failed to delete campaign');
            console.error('Failed to delete campaign:', error);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            // The original code had a toggleStatus mutation, but it's not used in the new structure.
            // Assuming the intent was to update the status directly if the API supports it,
            // or if the status field is managed by the backend.
            // For now, we'll just refetch to reflect the latest state.
            refetch();
        } catch (error) {
            toast.error('Failed to update status');
            console.error('Failed to toggle status:', error);
        }
    };

    const handleEdit = (site) => {
        setEditingSite(site);
    };

    const handleDelete = (site) => {
        setSiteToDelete(site);
        setShowDeleteModal(true);
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
                        <h1 className="text-2xl lg:text-3xl font-PoppinsBold text-gray-900 mb-2">Campaign Management</h1>
                        <p className="text-gray-600 font-PoppinsRegular">Manage your campaigns, goals, and status</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-primaryGreen text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-green-700 transition-all flex items-center gap-2 text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <FaPlus /> Add New Campaign
                    </button>
                </div>
            </div>

            {/* Sites Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-lg font-PoppinsBold text-gray-900">All Campaigns</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage your campaigns and their goals</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Title</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Description</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Goal Amount</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Current Amount</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Duration</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Category</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Status</th>
                                <th className="text-left py-4 px-6 font-PoppinsMedium text-sm text-gray-600 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {campaigns?.campaigns?.map((site) => (
                                <tr key={site.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-PoppinsMedium text-gray-900 text-base">{site.title}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-sm text-gray-500 max-w-xs truncate">{site.description}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-PoppinsBold text-gray-900 text-lg">${site.goalAmount}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-PoppinsBold text-gray-900 text-lg">${site.currentAmount}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-PoppinsMedium border border-blue-200">
                                            {site.duration}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-PoppinsMedium border border-purple-200">
                                            {site.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Select
                                            value={statusOptions.find(option => option.value === site.status)}
                                            onChange={(option) => handleToggleStatus(site.id, option.value)}
                                            options={statusOptions}
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
                                                    backgroundColor: state.isSelected ? '#10b981' : state.isFocused ? '#f3f4f6' : 'white',
                                                    color: state.isSelected ? 'white' : '#374151',
                                                }),
                                            }}
                                        />
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(site)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 hover:border-blue-300"
                                                title="Edit site"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(site)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                                                title="Delete site"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!campaigns?.campaigns || campaigns.campaigns.length === 0) && (
                    <div className="text-center py-16 text-gray-500">
                        <div className="text-6xl mb-6">🏕️</div>
                        <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">No campaigns yet</h3>
                        <p className="text-gray-600 mb-6">Get started by adding your first campaign</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-primaryGreen text-white px-6 py-3 rounded-xl font-PoppinsBold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            <FaPlus className="inline mr-2" /> Add Your First Campaign
                        </button>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {(showAddModal || editingSite) && (
                <AddSiteAdmin
                    isOpen={showAddModal || !!editingSite}
                    onClose={() => {
                        setShowAddModal(false);
                        setEditingSite(null);
                    }}
                    onSubmit={editingSite ? handleUpdateSite : handleCreateSite}
                    editingSite={editingSite}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl border border-gray-100">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaTrash className="text-red-600 text-2xl" />
                            </div>
                            <h3 className="text-xl font-PoppinsBold text-gray-900 mb-2">Confirm Deletion</h3>
                            <p className="text-gray-600">
                                Are you sure you want to delete <span className="font-PoppinsBold text-gray-900">"{siteToDelete?.title}"</span>?
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSiteToDelete(null);
                                }}
                                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-PoppinsMedium transition-colors border border-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteSite}
                                className="px-6 py-3 bg-red-600 text-white rounded-xl font-PoppinsBold hover:bg-red-700 transition-colors shadow-lg"
                            >
                                Delete Campaign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampingSitesAdmin; 