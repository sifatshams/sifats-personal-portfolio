import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteProject } from '../../api/admin_api/projectApi';

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,

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
      toast.error(error.response?.data?.message || 'Failed to delete project.');
    },
  });
};
