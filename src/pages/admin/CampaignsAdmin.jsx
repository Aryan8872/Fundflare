import React from 'react';
import { toast } from 'react-toastify';
import { useDeleteCampaignMutation, useGetAllCampaignsAdminQuery } from '../../api/api';

const CampaignsAdmin = () => {
    const { data: campaigns = [], isLoading, isError, error } = useGetAllCampaignsAdminQuery();
    const [deleteCampaign] = useDeleteCampaignMutation();

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                await deleteCampaign(id).unwrap();
                toast.success('Campaign deleted');
            } catch (err) {
                toast.error(err.message || 'Failed to delete campaign');
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Campaign Management</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div className="text-red-500">{error?.message || 'Failed to load campaigns.'}</div>
            ) : campaigns.length === 0 ? (
                <div>No campaigns found.</div>
            ) : (
                <table className="w-full text-left bg-white rounded shadow">
                    <thead>
                        <tr>
                            <th className="py-2 px-2">Title</th>
                            <th className="py-2 px-2">Category</th>
                            <th className="py-2 px-2">Goal</th>
                            <th className="py-2 px-2">Raised</th>
                            <th className="py-2 px-2">Status</th>
                            <th className="py-2 px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((c) => (
                            <tr key={c.id} className="border-t">
                                <td className="py-2 px-2">{c.title}</td>
                                <td className="py-2 px-2">{c.category}</td>
                                <td className="py-2 px-2">${c.goalAmount}</td>
                                <td className="py-2 px-2">${c.currentAmount}</td>
                                <td className="py-2 px-2">{c.status}</td>
                                <td className="py-2 px-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                                        onClick={() => handleDelete(c.id)}
                                    >
                                        Delete
                                    </button>
                                    {/* Add approve/reject buttons if needed */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CampaignsAdmin; 