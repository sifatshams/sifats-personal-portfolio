import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  createTaskApi,
  getDashboardSummaryApi,
  getMyTasksApi,
  updateTaskApi,
} from '../../api/user_api/taskApi';

// dashboard summary query
export const useDashboardSummaryQuery = () => {
  return useQuery({
    queryKey: ['user-dashboard-summary'],
    queryFn: getDashboardSummaryApi,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// my tasks query
export const useMyTasksQuery = (filters = {}) => {
  return useQuery({
    queryKey: ['user-my-tasks', filters],
    queryFn: () => getMyTasksApi(filters),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// create task mutation
export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskApi,

    onSuccess: (data) => {
      const successMsg = data?.message || 'Task created successfully!';
      toast.success(successMsg, { toastId: successMsg });
      queryClient.invalidateQueries({ queryKey: ['user-dashboard-summary'] });
      queryClient.invalidateQueries({ queryKey: ['user-my-tasks'] });
    },

    onError: (error) => {
      const response = error?.response?.data;

      if (response?.errors && response.errors.length > 0) {
        response.errors.forEach((err) => {
          toast.error(err.message, { toastId: err.message });
        });
        return;
      }

      const errMsg = response?.message || 'Failed to create task!';
      toast.error(errMsg, { toastId: errMsg });
    },
  });
};

// update task mutation
export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskApi,

    onSuccess: (data) => {
      const successMsg = data?.message || 'Task updated successfully!';
      toast.success(successMsg, { toastId: successMsg });
      queryClient.invalidateQueries({ queryKey: ['user-dashboard-summary'] });
      queryClient.invalidateQueries({ queryKey: ['user-my-tasks'] });
    },

    onError: (error) => {
      const response = error?.response?.data;

      if (response?.errors && response.errors.length > 0) {
        response.errors.forEach((err) => {
          toast.error(err.message, { toastId: err.message });
        });
        return;
      }

      const errMsg = response?.message || 'Failed to update task!';
      toast.error(errMsg, { toastId: errMsg });
    },
  });
};
