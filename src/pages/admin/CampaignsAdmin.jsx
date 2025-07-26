import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts/AuthContext';

const statusOptions = ['All', 'pending', 'approved', 'rejected'];
const categories = ['Health', 'Education', 'Medical', 'Startups'];

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
        fetch('/api/admin/campaigns')
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
                const res = await fetch(`/api/campaigns/${id}`, {
                    method: 'DELETE',
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
            const res = await fetch(`/api/campaigns/${id}/approve`, { method: 'POST' });
            if (!res.ok) throw new Error('Failed to approve campaign');
            toast.success('Campaign approved');
            setCampaigns(campaigns => campaigns.map(c => c.id === id ? { ...c, status: 'approved' } : c));
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleReject = async (id) => {
        try {
            const res = await fetch(`/api/campaigns/${id}/reject`, { method: 'POST' });
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
            const res = await fetch(`/api/campaigns/${editCampaign.id}/admin`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Campaign Management</h1>
            <div className="mb-4 flex gap-4 items-center">
                <label>Status:</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="border rounded px-2 py-1">
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : filtered.length === 0 ? (
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
                        {filtered.map((c) => (
                            <tr key={c.id} className="border-t">
                                <td className="py-2 px-2 cursor-pointer text-blue-700 underline" onClick={() => setViewCampaign(c)}>{c.title}</td>
                                <td className="py-2 px-2">{c.category}</td>
                                <td className="py-2 px-2">${c.goalAmount}</td>
                                <td className="py-2 px-2">${c.currentAmount}</td>
                                <td className="py-2 px-2">{c.status}</td>
                                <td className="py-2 px-2 flex gap-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEdit(c)}>Edit</button>
                                    {c.status === 'pending' && <>
                                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => handleApprove(c.id)}>Approve</button>
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => handleReject(c.id)}>Reject</button>
                                    </>}
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(c.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {viewCampaign && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-2 relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setViewCampaign(null)}>✕</button>
                        <h2 className="text-2xl font-bold mb-2">{viewCampaign.title}</h2>
                        <div className="mb-2 text-gray-600">{viewCampaign.description}</div>
                        <div className="mb-2">Category: <span className="font-semibold">{viewCampaign.category}</span></div>
                        <div className="mb-2">Goal: <span className="font-semibold">${viewCampaign.goalAmount}</span></div>
                        <div className="mb-2">Raised: <span className="font-semibold">${viewCampaign.currentAmount}</span></div>
                        <div className="mb-2">Status: <span className="font-semibold">{viewCampaign.status}</span></div>
                        {viewCampaign.coverImage && <img src={viewCampaign.coverImage} alt={viewCampaign.title} className="w-full h-40 object-cover rounded mb-3" />}
                        {viewCampaign.media && viewCampaign.media.length > 0 && (
                            <div className="mb-2">
                                <div className="font-semibold mb-1">Media:</div>
                                <div className="flex gap-2 flex-wrap">
                                    {viewCampaign.media.map((m, i) => <img key={i} src={m} alt="media" className="w-20 h-20 object-cover rounded" />)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {editCampaign && editForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-2 relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => { setEditCampaign(null); setEditForm(null); }}>✕</button>
                        <h2 className="text-2xl font-bold mb-4">Edit Campaign</h2>
                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                            <input name="title" value={editForm.title} onChange={handleEditFormChange} className="border rounded px-3 py-2" placeholder="Title" required />
                            <textarea name="description" value={editForm.description} onChange={handleEditFormChange} className="border rounded px-3 py-2" rows={3} placeholder="Description" required />
                            <select name="category" value={editForm.category} onChange={handleEditFormChange} className="border rounded px-3 py-2">
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <input name="goalAmount" type="number" min="1" value={editForm.goalAmount} onChange={handleEditFormChange} className="border rounded px-3 py-2" placeholder="Goal Amount" required />
                            <input name="duration" type="number" min="1" value={editForm.duration} onChange={handleEditFormChange} className="border rounded px-3 py-2" placeholder="Duration (days)" required />
                            <input name="coverImage" value={editForm.coverImage} onChange={handleEditFormChange} className="border rounded px-3 py-2" placeholder="Cover Image URL" />
                            <div>
                                <div className="font-semibold mb-1">Media URLs</div>
                                {editForm.media.map((m, i) => (
                                    <input key={i} value={m} onChange={e => handleEditMediaChange(i, e.target.value)} className="border rounded px-3 py-2 mb-2 w-full" placeholder={`Media URL #${i + 1}`} />
                                ))}
                                <button type="button" onClick={addEditMediaField} className="text-blue-600 underline text-sm">+ Add another</button>
                            </div>
                            <select name="status" value={editForm.status} onChange={handleEditFormChange} className="border rounded px-3 py-2">
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="active">Active</option>
                            </select>
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold">Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignsAdmin; 