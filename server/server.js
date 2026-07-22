import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development',
});

// .env
const port = process.env.PORT || 3000;

// if database connection success then start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
});
