
const API_URL = '/api/campaigns';

export const getCampaigns = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}?${query}`);
    if (!res.ok) throw new Error('Failed to fetch campaigns');
    return res.json();
};

export const getCampaignById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch campaign');
    return res.json();
};

export const createCampaign = async (data) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create campaign');
    return res.json();
}; 