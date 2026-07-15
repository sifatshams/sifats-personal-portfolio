import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { contactApi } from '../../api/contactApi';

export const useContactMutation = () => {
  return useMutation({
    mutationFn: contactApi,

    onSuccess: (data) => {
      toast.success(data.message || 'Message sent successfully!');
    },

    onError: (error) => {
      // @ts-ignore
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    },
  });
};
