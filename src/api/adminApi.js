const API_URL = '/api/admin';

export const getAdminStats = async (token) => {
    const res = await fetch(`${API_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return res.json();
};

// Add more admin API functions as needed 