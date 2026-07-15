import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { registerApi } from '../../api/authApi';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerApi,

    onSuccess: (data) => {
      toast.success(
        data.message || 'User registered successfully. Please login!',
      );
    },

    onError: (error) => {
      const response =
        // @ts-ignore
        error?.response?.data;

      // validation errors array
      if (response?.errors && response.errors.length > 0) {
        // @ts-ignore
        response.errors.forEach((err) => {
          toast.error(err.message);
        });

        return;
      }

      // normal error
      toast.error(response?.message || 'Something went wrong!');
    },
  });
};
