// @ts-ignore
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  let message = err.message || 'Internal server error!';
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default errorHandler;
