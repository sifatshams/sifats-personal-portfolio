import { validationResult } from 'express-validator';

// @ts-ignore
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error!',
      errors: errors.array().map((err) => ({
        // @ts-ignore
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};

export default validate;
