import axios_instance from '../../lib/axios';

export const updateAdminProfileAPI = async (formData) => {
  const { data } = await axios_instance.put('/auth/update-profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};
