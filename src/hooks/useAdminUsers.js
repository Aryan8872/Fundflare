import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deactivateUser, getUsers, updateUserRole } from '../api/userApi';
import { useAuthContext } from '../contexts/AuthContext';

export const useAdminUsers = () => {
    return useQuery({
        queryKey: ['adminUsers'],
        queryFn: () => getUsers(),
        enabled: true,
    });
};

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, role }) => updateUserRole(userId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
};

export const useDeactivateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => deactivateUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
}; 