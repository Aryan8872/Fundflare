import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        // On mount, check if user is authenticated
        getCurrentUser().then(u => {
            console.log('[AuthContext] getCurrentUser result:', u);
            if (u) setUser(u);
            else setUser(null);
        });
    }, []);

    useEffect(() => {
        console.log('[AuthContext] user state changed:', user);
    }, [user]);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext); 