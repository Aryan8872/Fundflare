import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
    const { user, token, login, logout } = useAuthContext();
    return {
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout
    };
}; 