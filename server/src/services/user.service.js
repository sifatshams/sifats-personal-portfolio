import User from '../models/User.model.js';
import mediaService from './media.service.js';

export const updateProfileService = async (userId, file, bodyData) => {
  // fetch current user data to retrieve the old image's public id
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  // Retain existing image data by default
  let imageData = user.profileImage;

  // Process image update if a new file is uploaded
  if (file) {
    const oldPublicId = user.profileImage?.publicId;

    // Core service call to remove the old asset and store the new one in 'user_profiles folder
    imageData = await mediaService.updateImage(
      file,
      oldPublicId,
      'user_profiles',
    );
  }

  // update document in database
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      ...bodyData,
      profileImage: imageData,
    },
    { new: true },
  );

  return updatedUser;
};

export const deleteUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Remove profile image from cloud storage before deleting the user document
  if (user.profileImage?.publicId) {
    await mediaService.deleteImage(user.profileImage.publicId);
  }

  // Remove user from database
  return await User.findByIdAndDelete(userId);
};
