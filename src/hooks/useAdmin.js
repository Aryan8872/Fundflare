import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '../api/adminApi';

export const useAdminStats = () => {
    return useQuery({
        queryKey: ['adminStats'],
        queryFn: () => getAdminStats(),
        enabled: true,
    });
}; 