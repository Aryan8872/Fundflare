const API_URL = '/api/admin/users';

export const getUsers = async (token) => {
    const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
};

export const updateUserRole = async (userId, role, token) => {
    const res = await fetch(`${API_URL}/${userId}/role`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
    });
    if (!res.ok) throw new Error('Failed to update user role');
    return res.json();
};

export const deactivateUser = async (userId, token) => {
    const res = await fetch(`${API_URL}/${userId}/deactivate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to deactivate user');
    return res.json();
}; 