import axios_instance from '../../lib/axios';

// get dashboard summary data
export const getDashboardSummaryApi = async () => {
  const response = await axios_instance.get('/tasks/dashboard-summary');
  return response.data.data;
};

// all task filter and get
export const getMyTasksApi = async (params = {}) => {
  const response = await axios_instance.get('/tasks', { params });
  return response.data.data;
};

// create new task
export const createTaskApi = async (taskData) => {
  const response = await axios_instance.post('/tasks', taskData);
  return response.data.data;
};

// update tasks
export const updateTaskApi = async ({ id, ...updateData }) => {
  const response = await axios_instance.patch(`/tasks/${id}`, updateData);
  return response.data.data;
};
