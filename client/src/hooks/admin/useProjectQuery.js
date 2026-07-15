import { useQuery } from '@tanstack/react-query';
import { getProject } from '../../api/admin_api/projectApi';

// get single project
export const useProjectQuery = (id) => {
  return useQuery({
    queryKey: ['project', id],

    queryFn: () => getProject(id),

    enabled: !!id,
  });
};
