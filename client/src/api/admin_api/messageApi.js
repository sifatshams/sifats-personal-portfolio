import axios_instance from '../../lib/axios';

// get all messages from backend
export const getAllMessagesApi = async () => {
  const { data } = await axios_instance.get('/admin/messages');
  return data?.data;
};

// get single message
export const getMessageById = async (id) => {
  const { data } = await axios_instance.get(`/admin/messages/${id}`);
  return data.data;
};

// mark message as read
export const markMessageAsRead = async (id) => {
  const { data } = await axios_instance.patch(`/admin/messages/${id}/read`);
  return data.data;
};

// delete message by id
export const deleteMessageApi = async (id) => {
  const { data } = await axios_instance.delete(`/admin/messages/${id}`);
  return data.data;
};
