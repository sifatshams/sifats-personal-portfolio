import {
  deleteUserService,
  updateProfileService,
} from '../services/user.service.js';

/**
 * @desc    Update user profile details and handle avatar replacement
 * @route   PUT /api/v1/users/profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    // Delegate business logic to the service layer
    const updatedUser = await updateProfileService(userId, file, req.body);

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user account and remove associated media from cloud
 * @route   DELETE /api/v1/users/account
 * @access  Private
 */
export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id; // Extracted from auth middleware

    // Delegate account removal and image deletion logic to the service layer
    await deleteUserService(userId);

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Account & assets deleted successfully!',
    });
  } catch (error) {
    next(error); // Forward error to global error handler
  }
};
