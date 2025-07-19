import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDonation, getUserDonations } from '../api/donationApi';
import { useAuthContext } from '../contexts/AuthContext';

export const useCreateDonation = () => {
    const { token } = useAuthContext();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createDonation(data, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userDonations'] });
        },
    });
};

export const useUserDonations = () => {
    const { token } = useAuthContext();
    return useQuery({
        queryKey: ['userDonations'],
        queryFn: () => getUserDonations(token),
        enabled: !!token,
    });
}; 