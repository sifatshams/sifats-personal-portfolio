import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createProject } from '../../api/admin_api/projectApi';

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

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
      toast.error(error.response?.data?.message || 'Failed to create project.');
    },
  });
};
