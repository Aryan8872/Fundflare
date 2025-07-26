const API_URL = '/api/admin/users';

export const getUsers = async () => {
    const res = await fetch('/api/admin/users', {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
};

export const updateUserRole = async (userId, role) => {
    const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update user role');
    return res.json();
};

export const deactivateUser = async (userId) => {
    const res = await fetch(`/api/admin/users/${userId}/deactivate`, {
        method: 'POST',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to deactivate user');
    return res.json();
}; 