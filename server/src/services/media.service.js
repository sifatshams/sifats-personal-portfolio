import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from '../utils/cloudinaryUpload.util.js';

class MediaService {
  // single img upload
  async uploadSingleImage(file, folderName) {
    if (!file) return null;
    return await uploadToCloudinary(file.buffer, folderName);
  }

  // multiple img upload
  async uploadMultipleImages(files, folderName) {
    if (!files || files.length === 0) return [];

    // all img upload paralally
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, folderName),
    );
    return await Promise.all(uploadPromises);
  }

  // img update
  async updateImage(newFile, oldPublicId, folderName) {
    if (!newFile) return null;

    // old img delete from cloudinary
    if (oldPublicId) {
      await deleteFromCloudinary(oldPublicId);
    }

    // upload new img
    return await uploadToCloudinary(newFile.buffer, folderName);
  }

  // delete images
  async deleteImage(publicId) {
    return await deleteFromCloudinary(publicId);
  }
}

export default new MediaService();
