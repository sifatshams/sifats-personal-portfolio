import {
  deleteUserService,
  updateProfileService,
} from '../services/user.service.js';


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


export const deleteAccount = async (req, res, next) => {
  try {
    // extracted from auth middleware
    const userId = req.user.id;

    // delegate account removal and image deletion logic to the service layer
    await deleteUserService(userId);

    // Send successful res
    res.status(200).json({
      success: true,
      message: 'Account & assets deleted successfully!',
    });
  } catch (error) {
    next(error);
  }
};
