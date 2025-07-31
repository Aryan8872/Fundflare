import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
    const { user, login, logout, setUser } = useAuthContext();
    return {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        setUser
    };
};
