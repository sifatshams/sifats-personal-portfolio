import {
  deleteMessageService,
  getAllMessagesService,
  getMessageByIdService,
  markMessageAsReadService,
} from '../../services/admin/message.service.js';

// get all messages
export const getAllMessagesController = async (req, res, next) => {
  try {
    // call service
    const result = await getAllMessagesService(req.query);

    // success response
    res.status(200).json({
      success: true,
      message: 'Messages fetched successfully!',
      data: result.messages,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// get single message
export const getMessageByIdController = async (req, res, next) => {
  try {
    // get id from params
    const { id } = req.params;

    // call service
    const message = await getMessageByIdService(id);

    // success response
    res.status(200).json({
      success: true,
      message: 'Message fetched successfully!',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// mark message as read
export const markMessageAsReadController = async (req, res, next) => {
  try {
    // get id from params
    const { id } = req.params;

    // call service
    const message = await markMessageAsReadService(id);

    // success response
    res.status(200).json({
      success: true,
      message: 'Message marked as read successfully!',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// delete message
export const deleteMessageController = async (req, res, next) => {
  try {
    // get id from params
    const { id } = req.params;

    // call service
    await deleteMessageService(id);

    // success response
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully!',
    });
  } catch (error) {
    next(error);
  }
};
