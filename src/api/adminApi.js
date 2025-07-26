const API_URL = '/api/admin';

export const getAdminStats = async () => {
    const res = await fetch(`/api/admin/dashboard`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return res.json();
};

// Add more admin API functions as needed 