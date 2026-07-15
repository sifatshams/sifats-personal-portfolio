import axios_instance from '../../lib/axios';

// get dashboard data
export const getDashboard = async () => {
  const { data } = await axios_instance.get('/admin/dashboard');

  return data.data;
};
