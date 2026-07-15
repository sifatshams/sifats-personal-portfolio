import axios_instance from '../lib/axios';

// @ts-ignore
export const registerApi = async (formData) => {
  const { data } = await axios_instance.post('/auth/register', formData);
  return data;
};

// verify email api
// @ts-ignore
export const verifyEmailApi = async (token) => {
  const res = await axios_instance.get(`/auth/verify-email/${token}`);
  return res.data;
};

// @ts-ignore
export const loginApi = async (userData) => {
  const { data } = await axios_instance.post('/auth/login', userData);
  return data;
};

// send otp
export const sendOtpApi = async (data) => {
  const response = await axios_instance.post('/auth/send-reset-otp', data);
  return response.data;
};

// verify otp
export const verifyOtpApi = async (data) => {
  const response = await axios_instance.post('/auth/verify-reset-otp', data);
  return response.data;
};

// reset password
export const resetPasswordApi = async (data) => {
  const response = await axios_instance.post('/auth/reset-password', data);
  return response.data;
};


