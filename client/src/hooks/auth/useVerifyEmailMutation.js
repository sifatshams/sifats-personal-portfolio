import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { verifyEmailApi } from '../../api/authApi';

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: verifyEmailApi,

    onSuccess: (data) => {
      toast.success(data?.message || 'Email verified successfully!');
    },

    onError: (error) => {
      // @ts-ignore
      toast.error(error?.response?.data?.message || 'Verification failed!');
    },
  });
};
