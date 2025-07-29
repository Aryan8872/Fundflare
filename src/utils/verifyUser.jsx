async function getCsrfToken() {
    const response = await fetch('https://localhost:3000/api/auth/csrf-token', {
        credentials: 'include' // Ensure cookies are sent with the request
    });
    const data = await response.json();
    return data.csrfToken;
}

async function registerUser(userData) {
    const csrfToken = await getCsrfToken();
    const response = await fetch('https://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken // Include the CSRF token
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Ensure cookies are sent with the request
    });
    return response.json();
}

// Example usage for other forms
async function submitForm(url, formData) {
    const csrfToken = await getCsrfToken();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(formData),
        credentials: 'include'
    });
    return response.json();
} 