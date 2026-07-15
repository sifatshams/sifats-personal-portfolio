import express from 'express';

import {
  deleteMessageController,
  getAllMessagesController,
  getMessageByIdController,
  markMessageAsReadController,
} from '../../controllers/admin/message.controller.js';

import { adminOnly, protect } from '../../middlewares/auth.middleware.js';

const messageRoute = express.Router();

// admin only
messageRoute.use(protect);
messageRoute.use(adminOnly);

// routes
messageRoute.get('/', getAllMessagesController);

messageRoute.get('/:id', getMessageByIdController);

messageRoute.patch('/:id/read', markMessageAsReadController);

messageRoute.delete('/:id', deleteMessageController);

export default messageRoute;
