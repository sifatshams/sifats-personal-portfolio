import axios_instance from '../../lib/axios';

// get all projects
export const getProjects = async (params) => {
  const { data } = await axios_instance.get('/admin/projects', {
    params,
  });
  return data;
};

// set single project
export const getProject = async (id) => {
  const { data } = await axios_instance.get(`/admin/projects/${id}`);
  return data;
};

// create project
export const createProject = async (projectData) => {
  const { data } = await axios_instance.post('/admin/projects', projectData);
  return data;
};

// update project
export const updateProject = async ({ id, data }) => {
  const { data: responseData } = await axios_instance.put(
    `/admin/projects/${id}`,
    data,
  );

  return responseData;
};
// delete project
export const deleteProject = async (id) => {
  const { data } = await axios_instance.delete(`/admin/projects/${id}`);
  return data;
};
