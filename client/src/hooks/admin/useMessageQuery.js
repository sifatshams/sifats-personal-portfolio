import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  deleteMessageApi,
  getAllMessagesApi,
  getMessageById,
  markMessageAsRead,
} from '../../api/admin_api/messageApi';

// all msg query
export const useAllMessagesQuery = () => {
  return useQuery({
    queryKey: ['admin-all-messages'],
    queryFn: getAllMessagesApi,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// single msg query
export const useGetMessageByIdQuery = (id) => {
  return useQuery({
    queryKey: ['admin-message', id],
    queryFn: () => getMessageById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// msg read
export const useMarkMessageAsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMessageAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
    },

    onError: (error) => {
      const response = error?.response?.data;

      if (response?.errors && response.errors.length > 0) {
        response.errors.forEach((err) => {
          toast.error(err.message, { toastId: err.message });
        });
        return;
      }

      const errMsg = response?.message || 'Failed to update message status!';
      toast.error(errMsg, { toastId: errMsg });
    },
  });
};

// delete msg
export const useDeleteMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessageApi,

    onSuccess: (data) => {
      const successMsg = data?.message || 'Message deleted successfully!';
      toast.success(successMsg, { toastId: successMsg });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['admin-all-messages'] });
    },

    onError: (error) => {
      const response = error?.response?.data;

      if (response?.errors && response.errors.length > 0) {
        response.errors.forEach((err) => {
          toast.error(err.message, { toastId: err.message });
        });
        return;
      }

      const errMsg = response?.message || 'Failed to delete message!';
      toast.error(errMsg, { toastId: errMsg });
    },
  });
};
