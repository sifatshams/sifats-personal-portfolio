import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { sendOtpApi } from '../../api/authApi';

export const useSendOtpMutation = () => {
  return useMutation({
    mutationFn: sendOtpApi,

    onSuccess: (data) => {
      toast.success(data.message || 'Verification code sent successfully!');
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Failed to send verification code!',
      );
    },
  });
};
