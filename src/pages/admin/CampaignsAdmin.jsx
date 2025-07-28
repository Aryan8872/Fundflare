import { CheckCircle, DollarSign, Edit, Eye, Filter, Target, Trash2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Sidebar from '../../components/admin/Sidebar';
import { useAuthContext } from '../../contexts/AuthContext';

const statusOptions = ['All', 'pending', 'approved', 'rejected'];
const categories = ['Health', 'Education', 'Medical', 'Startups'];
const BACKEND_URL = 'http://localhost:5000';

// Utility to fetch CSRF token
async function getCsrfToken() {
    const res = await fetch(`${BACKEND_URL}/api/auth/csrf-token`, { credentials: 'include' });
    const data = await res.json();
    return data.csrfToken;
}

const CampaignsAdmin = () => {
    const { user } = useAuthContext();
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('All');
    const [viewCampaign, setViewCampaign] = useState(null);
    const [editCampaign, setEditCampaign] = useState(null);
    const [editForm, setEditForm] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BACKEND_URL}/api/admin/campaigns`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setCampaigns(data.campaigns || []);
                setIsLoading(false);
            })
            .catch(err => {
                setError('Failed to load campaigns.');
                setIsLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                const csrfToken = await getCsrfToken();
                const res = await fetch(`${BACKEND_URL}/api/campaigns/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-Token': csrfToken
                    },
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Failed to delete campaign');
                toast.success('Campaign deleted');
                setCampaigns(campaigns => campaigns.filter(c => c.id !== id));
            } catch (err) {
                toast.error(err.message || 'Failed to delete campaign');
            }
        }
    };

    const handleApprove = async (id) => {
        try {
            const csrfToken = await getCsrfToken();
            const res = await fetch(`${BACKEND_URL}/api/campaigns/${id}/approve`, {
                method: 'POST',
                headers: {
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to approve campaign');
            toast.success('Campaign approved');
            setCampaigns(campaigns => campaigns.map(c => c.id === id ? { ...c, status: 'approved' } : c));
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleReject = async (id) => {
        try {
            const csrfToken = await getCsrfToken();
            const res = await fetch(`${BACKEND_URL}/api/campaigns/${id}/reject`, {
                method: 'POST',
                headers: {
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to reject campaign');
            toast.success('Campaign rejected');
            setCampaigns(campaigns => campaigns.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleEdit = (c) => {
        setEditCampaign(c);
        setEditForm({
            title: c.title,
            description: c.description,
            category: c.category,
            goalAmount: c.goalAmount,
            duration: c.duration,
            coverImage: c.coverImage || '',
            media: c.media || [''],
            status: c.status || 'pending',
        });
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm(f => ({ ...f, [name]: value }));
    };

    const handleEditMediaChange = (i, value) => {
        setEditForm(f => ({ ...f, media: f.media.map((m, idx) => idx === i ? value : m) }));
    };

    const addEditMediaField = () => setEditForm(f => ({ ...f, media: [...f.media, ''] }));

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = await getCsrfToken();
            const res = await fetch(`${BACKEND_URL}/api/campaigns/${editCampaign.id}/admin`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...editForm,
                    goalAmount: Number(editForm.goalAmount),
                    duration: Number(editForm.duration),
                    media: editForm.media.filter(Boolean),
                    status: editForm.status,
                }),
            });
            if (!res.ok) throw new Error('Failed to update campaign');
            const { campaign } = await res.json();
            setCampaigns(campaigns => campaigns.map(c => c.id === campaign.id ? campaign : c));
            toast.success('Campaign updated');
            setEditCampaign(null);
            setEditForm(null);
        } catch (err) {
            toast.error(err.message || 'Failed to update campaign');
        }
    };

    const filtered = status === 'All' ? campaigns : campaigns.filter(c => c.status === status);

    if (user === undefined) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex justify-center items-center h-64">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-2xl mx-auto py-16 text-center">
                    <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            <div className="ml-0 lg:ml-64 flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Campaign Management</h1>
                    <p className="text-gray-600">Manage and monitor all fundraising campaigns</p>
                </div>

                {/* Filter Controls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex items-center gap-4">
                        <Filter className="text-gray-400" size={20} />
                        <label className="text-sm font-semibold text-gray-700">Filter by Status:</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>

                {/* Campaigns Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-3 text-gray-600">Loading campaigns...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16 text-red-600">{error}</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <Target className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-gray-600">No campaigns found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Campaign</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Goal</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Raised</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((c) => (
                                        <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium" onClick={() => setViewCampaign(c)}>
                                                    {c.title}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                    {c.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign size={16} className="text-gray-400" />
                                                    <span className="font-medium">${c.goalAmount?.toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign size={16} className="text-green-500" />
                                                    <span className="font-medium text-green-600">${c.currentAmount?.toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    c.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        c.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        onClick={() => setViewCampaign(c)}
                                                        title="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                        onClick={() => handleEdit(c)}
                                                        title="Edit Campaign"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    {c.status === 'pending' && (
                                                        <>
                                                            <button
                                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                onClick={() => handleApprove(c.id)}
                                                                title="Approve Campaign"
                                                            >
                                                                <CheckCircle size={16} />
                                                            </button>
                                                            <button
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                onClick={() => handleReject(c.id)}
                                                                title="Reject Campaign"
                                                            >
                                                                <XCircle size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        onClick={() => handleDelete(c.id)}
                                                        title="Delete Campaign"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* View Campaign Modal */}
            {viewCampaign && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 relative">
                        <button
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setViewCampaign(null)}
                        >
                            <XCircle size={20} />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{viewCampaign.title}</h2>
                            <p className="text-gray-600 leading-relaxed">{viewCampaign.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Category</div>
                                <div className="font-semibold text-gray-900">{viewCampaign.category}</div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Goal Amount</div>
                                <div className="font-semibold text-gray-900">${viewCampaign.goalAmount?.toLocaleString()}</div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Raised Amount</div>
                                <div className="font-semibold text-green-600">${viewCampaign.currentAmount?.toLocaleString()}</div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Status</div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${viewCampaign.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    viewCampaign.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                        viewCampaign.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {viewCampaign.status}
                                </span>
                            </div>
                        </div>

                        {viewCampaign.coverImage && (
                            <div className="mb-6">
                                <div className="text-sm font-semibold text-gray-700 mb-2">Cover Image</div>
                                <img src={viewCampaign.coverImage} alt={viewCampaign.title} className="w-full h-48 object-cover rounded-xl" />
                            </div>
                        )}

                        {viewCampaign.media && viewCampaign.media.length > 0 && (
                            <div>
                                <div className="text-sm font-semibold text-gray-700 mb-2">Media</div>
                                <div className="grid grid-cols-4 gap-2">
                                    {viewCampaign.media.map((m, i) => (
                                        <img key={i} src={m} alt="media" className="w-full h-20 object-cover rounded-lg" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Edit Campaign Modal */}
            {editCampaign && editForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 relative max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => { setEditCampaign(null); setEditForm(null); }}
                        >
                            <XCircle size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Campaign</h2>

                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                <input
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditFormChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Campaign title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleEditFormChange}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Campaign description"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                    <select
                                        name="category"
                                        value={editForm.category}
                                        onChange={handleEditFormChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                    <select
                                        name="status"
                                        value={editForm.status}
                                        onChange={handleEditFormChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="active">Active</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Goal Amount ($)</label>
                                    <input
                                        name="goalAmount"
                                        type="number"
                                        value={editForm.goalAmount}
                                        onChange={handleEditFormChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="1000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (days)</label>
                                    <input
                                        name="duration"
                                        type="number"
                                        value={editForm.duration}
                                        onChange={handleEditFormChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="30"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image URL</label>
                                <input
                                    name="coverImage"
                                    value={editForm.coverImage}
                                    onChange={handleEditFormChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Media URLs</label>
                                {editForm.media.map((url, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input
                                            value={url}
                                            onChange={(e) => handleEditMediaChange(i, e.target.value)}
                                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="https://example.com/media.jpg"
                                        />
                                        {editForm.media.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setEditForm(f => ({ ...f, media: f.media.filter((_, idx) => idx !== i) }))}
                                                className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addEditMediaField}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    + Add Media URL
                                </button>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Update Campaign
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setEditCampaign(null); setEditForm(null); }}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignsAdmin; 