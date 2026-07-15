import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginApi } from '../../api/authApi';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      const role = data?.user?.role;

      if (role === 'admin') {
        toast.success('Admin logged in successfully!');
      } else {
        toast.success('User logged in successfully!');
      }
    },

    onError: (error) => {
      const response = error?.response?.data;

      if (response?.errors?.length > 0) {
        response.errors.forEach((err) => {
          toast.error(err.message);
        });
        return;
      }

      toast.error(response?.message || error?.message || 'Login failed!');
    },
  });
};
