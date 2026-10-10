import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { updateUserProfileAPI } from '../../api/user_api/updateProfileApi';
import useAuthStore from '../../store/authStore';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: updateUserProfileAPI,

    onSuccess: (res) => {
      if (res?.data) {
        setUser(res.data);
      }

      queryClient.invalidateQueries({
        queryKey: ['authUser'],
      });

      toast.success(res?.message || 'Profile updated successfully!');
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to update profile!';

      toast.error(message);
    },
  });
};
