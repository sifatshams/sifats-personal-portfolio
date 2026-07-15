import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateAdminProfileAPI } from '../../api/admin_api/updateProfileApi';
import useAuthStore from '../../store/authStore';

export const useUpdateAdminProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: updateAdminProfileAPI,

    onSuccess: (res) => {
      if (res?.data) {
        setUser(res.data);
      }
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      
      const successMessage = res?.message || 'Profile updated successfully!';
      toast.success(successMessage);
    },

    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update profile!';
      toast.error(message);
    },
  });
};