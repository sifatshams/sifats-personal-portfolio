import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { resetPasswordApi } from '../../api/authApi';

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (data) => {
      toast.success(data.message || 'Password reset successfully!');
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Failed to reset password!',
      );
    },
  });
};
