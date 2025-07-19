import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deactivateUser, getUsers, updateUserRole } from '../api/userApi';
import { useAuthContext } from '../contexts/AuthContext';

export const useAdminUsers = () => {
    const { token } = useAuthContext();
    return useQuery({
        queryKey: ['adminUsers'],
        queryFn: () => getUsers(token),
        enabled: !!token,
    });
};

export const useUpdateUserRole = () => {
    const { token } = useAuthContext();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, role }) => updateUserRole(userId, role, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
};

export const useDeactivateUser = () => {
    const { token } = useAuthContext();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => deactivateUser(userId, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });
}; 