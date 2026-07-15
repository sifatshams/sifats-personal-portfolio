import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../../api/admin_api/projectApi';

// get all projects
export const useProjectsQuery = (params) => {
  return useQuery({
    queryKey: ['projects', params],

    queryFn: () => getProjects(params),

    keepPreviousData: true,
  });
};
