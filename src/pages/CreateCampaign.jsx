import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/AuthContext';
import { useCreateCampaign } from '../hooks/useCampaigns';

const categories = ['Health', 'Education', 'Medical', 'Startups'];

const CreateCampaign = () => {
    const { user } = useAuthContext();
    const { mutate, isLoading } = useCreateCampaign();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: categories[0],
        goalAmount: '',
        duration: '',
        coverImage: '',
        media: [''],
    });

    if (!user || user.role !== 'CREATOR') {
        return <div className="max-w-xl mx-auto py-16 text-center">You must be a campaign creator to start a campaign.</div>;
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleMediaChange = (i, value) => {
        setForm(f => ({ ...f, media: f.media.map((m, idx) => idx === i ? value : m) }));
    };

    const addMediaField = () => setForm(f => ({ ...f, media: [...f.media, ''] }));

    const handleSubmit = e => {
        e.preventDefault();
        mutate(
            {
                ...form,
                goalAmount: Number(form.goalAmount),
                duration: Number(form.duration),
                media: form.media.filter(Boolean),
            },
            {
                onSuccess: () => {
                    toast.success('Campaign submitted for approval!');
                    navigate('/dashboard');
                },
                onError: err => toast.error(err.message || 'Failed to create campaign'),
            }
        );
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Start a New Campaign</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold">Title</label>
                    <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={4} required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Category</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-semibold">Goal Amount ($)</label>
                        <input name="goalAmount" type="number" min="1" value={form.goalAmount} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-semibold">Duration (days)</label>
                        <input name="duration" type="number" min="1" value={form.duration} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Cover Image URL</label>
                    <input name="coverImage" value={form.coverImage} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Media URLs (images/videos)</label>
                    {form.media.map((m, i) => (
                        <input key={i} value={m} onChange={e => handleMediaChange(i, e.target.value)} className="w-full border rounded px-3 py-2 mb-2" placeholder={`Media URL #${i + 1}`} />
                    ))}
                    <button type="button" onClick={addMediaField} className="text-blue-600 underline text-sm">+ Add another</button>
                </div>
                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold">
                    {isLoading ? 'Submitting...' : 'Submit for Approval'}
                </button>
            </form>
        </div>
    );
};

export default CreateCampaign; 