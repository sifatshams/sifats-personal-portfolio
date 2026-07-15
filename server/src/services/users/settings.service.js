import User from '../../models/User.model.js';

export const getSettingsService = async (userId) => {
  const user = await User.findById(userId).select(
    'name email phone role profileImage notificationSettings',
  );

  // validation
  if (!user) {
    const error = new Error('User not found!');
    error.statusCode = 404;
    throw error;
  }

  // return
  return {
    profile: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
    },
    notifications: user.notificationSettings,
  };
};
