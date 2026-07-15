import { useQuery } from '@tanstack/react-query';

import { getDashboard } from '../../api/admin_api/dashboardApi';

// dashboard query
export const useDashboardQuery = () => {
  return useQuery({
    queryKey: ['admin-dashboard'],

    queryFn: getDashboard,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    refetchOnWindowFocus: false,

    retry: 1,
  });
};
