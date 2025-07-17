import { useDispatch, useSelector } from 'react-redux';
import { logout, setToken, setUser } from '../slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, token, isAuthenticated } = useSelector((state) => state?.auth || {});

    const login = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        dispatch(setUser(userData));
        dispatch(setToken(token));
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(logout());
    };

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout: logoutUser
    };
}; 