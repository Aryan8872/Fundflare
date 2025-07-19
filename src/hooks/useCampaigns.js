import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCampaign, getCampaignById, getCampaigns } from '../api/campaignApi';
import { useAuthContext } from '../contexts/AuthContext';

export const useCampaigns = (params) => {
    return useQuery({
        queryKey: ['campaigns', params],
        queryFn: () => getCampaigns(params),
    });
};

export const useCampaign = (id) => {
    return useQuery({
        queryKey: ['campaign', id],
        queryFn: () => getCampaignById(id),
        enabled: !!id,
    });
};

export const useCreateCampaign = () => {
    const { token } = useAuthContext();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createCampaign(data, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
        },
    });
}; 