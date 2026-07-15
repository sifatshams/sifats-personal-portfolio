import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateProject } from '../../api/admin_api/projectApi';

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update project.');
    },
  });
};
