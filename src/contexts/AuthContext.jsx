import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getCurrentUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const inactivityTimeout = useRef();
    const INACTIVITY_LIMIT = 15 * 60 * 1000;

    // Inactivity logout
    useEffect(() => {
        const resetTimer = () => {
            clearTimeout(inactivityTimeout.current);
            inactivityTimeout.current = setTimeout(() => {
                logout();
                alert('You have been logged out due to inactivity.');
            }, INACTIVITY_LIMIT);
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('mousedown', resetTimer);
        window.addEventListener('touchstart', resetTimer);
        resetTimer();

        return () => {
            clearTimeout(inactivityTimeout.current);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('mousedown', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
        };
    }, []);

    useEffect(() => {
        getCurrentUser().then(u => {
            console.log('[AuthContext] getCurrentUser result:', u);
            setUser(u || null);
        });
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext');
    return ctx;
};
