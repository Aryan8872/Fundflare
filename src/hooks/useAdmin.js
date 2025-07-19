import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '../api/adminApi';
import { useAuthContext } from '../contexts/AuthContext';

export const useAdminStats = () => {
    const { token } = useAuthContext();
    return useQuery({
        queryKey: ['adminStats'],
        queryFn: () => getAdminStats(token),
        enabled: !!token,
    });
}; 