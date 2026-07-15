import mongoose from 'mongoose';

import Contact from '../../models/Contact.model.js';

import { logActivity } from './activity.service.js';

// get all messages
export const getAllMessagesService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  // search
  if (query.search) {
    filter.$or = [
      {
        userName: {
          $regex: query.search,
          $options: 'i',
        },
      },
      {
        email: {
          $regex: query.search,
          $options: 'i',
        },
      },
      {
        subject: {
          $regex: query.search,
          $options: 'i',
        },
      },
    ];
  }

  // status filter
  if (query.status) {
    filter.status = query.status;
  }

  const total = await Contact.countDocuments(filter);

  const messages = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    messages,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// get single message
export const getMessageByIdService = async (messageId) => {
  // validate object id
  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    const error = new Error('Invalid message id.');
    error.statusCode = 400;
    throw error;
  }

  // find message
  const message = await Contact.findById(messageId);

  if (!message) {
    const error = new Error('Message not found!');
    error.statusCode = 404;
    throw error;
  }

  return message;
};

// mark message as read
export const markMessageAsReadService = async (messageId) => {
  // validate object id
  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    const error = new Error('Invalid message id.');
    error.statusCode = 400;
    throw error;
  }

  // find message
  const message = await Contact.findById(messageId);

  if (!message) {
    const error = new Error('Message not found!');
    error.statusCode = 404;
    throw error;
  }

  // already read
  if (message.status === 'read') {
    return message;
  }

  // update status
  message.status = 'read';

  await message.save();

  // log activity
  await logActivity({
    type: 'message',
    action: 'updated',
    title: 'Message Read',
    description: `Marked "${message.subject}" as read.`,
    entityId: message._id,
    entityType: 'contact',
  });

  return message;
};

// delete message
export const deleteMessageService = async (messageId) => {
  // validate object id
  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    const error = new Error('Invalid message id.');
    error.statusCode = 400;
    throw error;
  }

  // find message
  const message = await Contact.findById(messageId);

  if (!message) {
    const error = new Error('Message not found!');
    error.statusCode = 404;
    throw error;
  }

  // delete message
  await message.deleteOne();

  // log activity
  await logActivity({
    type: 'message',
    action: 'deleted',
    title: 'Message Deleted',
    description: `Deleted message from ${message.userName}.`,
    entityId: message._id,
    entityType: 'contact',
  });

  return message;
};
