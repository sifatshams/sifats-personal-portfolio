import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { urlencoded } from 'express';
import errorHandler from './middlewares/error.middleware.js';
import { trackVisitor } from './middlewares/visitor.middleware.js';
import activityRoute from './routes/admin/activity.route.js';
import dashboardRoute from './routes/admin/dashboard.route.js';
import messageRoute from './routes/admin/message.route.js';
import projectRoute from './routes/admin/project.route.js';
import visitorRoute from './routes/admin/visitor.route.js';
import authRoute from './routes/auth.route.js';
import contactRoute from './routes/contact.route.js';
import productRoute from './routes/product.routes.js';
import userRoute from './routes/user.route.js';

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  }),
);
app.use(urlencoded({ extended: true }));
// track visitor for admin
app.use(trackVisitor);

// api endpoints
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/admin/projects', projectRoute);
app.use('/api/admin/activities', activityRoute);
app.use('/api/admin/visitors', visitorRoute);
app.use('/api/admin/messages', messageRoute);
app.use('/api/admin/dashboard', dashboardRoute);

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

// err handler
app.use(errorHandler);

export default app;
