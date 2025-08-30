import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Function to upload image to Cloudinary
export const uploadImage = async (imageData, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(imageData, {
      folder: "wtsion_screenshots",
      transformation: [{ width: 1200, height: 800, crop: "limit", quality: "auto" }],
      public_id: `screenshot_${Date.now()}`,
      ...options,
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Function to delete image from Cloudinary
export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return { success: false, error: error.message };
  }
};

// Export Cloudinary instance if needed
export { cloudinary };
