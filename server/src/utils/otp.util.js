import crypto from 'crypto';

const generateSecureToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const getTokenExpiry = (hours = 24) => {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
};

// generate otp
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getOtpExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};

export { generateOTP, generateSecureToken, getOtpExpiry, getTokenExpiry };
