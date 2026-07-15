import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// @ts-ignore
// create an protect middleware for extra security
export const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // if token not found
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorized, token not found!' });
  }

  try {
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    // if the token is correct but that user is deleted from database
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: 'User no longer exists!' });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Token is invalid or expired!' });
  }
};

// @ts-ignore
export const adminOnly = async (req, res, next) => {
  try {
    // check user here or not
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized!' });
    }

    // check if admin not here
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only!' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
