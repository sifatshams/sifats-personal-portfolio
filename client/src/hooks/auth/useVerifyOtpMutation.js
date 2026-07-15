import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { verifyOtpApi } from '../../api/authApi';

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: verifyOtpApi,

    onSuccess: (data) => {
      toast.success(data.message || 'OTP verified successfully!');
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to verify OTP!');
    },
  });
};
