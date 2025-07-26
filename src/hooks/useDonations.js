import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDonation, getUserDonations } from '../api/donationApi';
import { useAuthContext } from '../contexts/AuthContext';

export const useCreateDonation = () => {
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createDonation(data, user.token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDonations'] });
        },
    });
};

export const useUserDonations = () => {
    const { user } = useAuthContext();
    return useQuery({
        queryKey: ['userDonations'],
        queryFn: () => getUserDonations(user.token),
        enabled: !!user.token,
    });
}; 