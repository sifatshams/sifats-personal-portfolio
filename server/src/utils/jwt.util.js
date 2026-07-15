import jwt from 'jsonwebtoken';

// generate jwt token with dynamic expiry from env
const generateToken = (payload, rememberMe) => {
  // use 14d from env if rememberMe is true, otherwise default 7d
  const tokenExpiry = rememberMe
    ? process.env.JWT_EXPIRE_REMEMBER
    : process.env.JWT_EXPIRE_DEFAULT;

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: tokenExpiry || '7d',
  });
};

export default generateToken;
