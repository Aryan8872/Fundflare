import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getCurrentUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const inactivityTimeout = useRef();
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

    // Auto-logout on inactivity
    useEffect(() => {
        const resetTimer = () => {
            if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current);
            inactivityTimeout.current = setTimeout(() => {
                setUser(null);
                alert('You have been logged out due to inactivity.');
            }, INACTIVITY_LIMIT);
        };
        // Listen for user activity
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('mousedown', resetTimer);
        window.addEventListener('touchstart', resetTimer);
        resetTimer();
        return () => {
            if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('mousedown', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
        };
    }, [user]);

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