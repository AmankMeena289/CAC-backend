export const upload = multer({
    storage,
})

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detects image, video, raw file types
    });

    // File uploaded successfully
    console.log("File is uploaded on Cloudinary: ", response.url);

    // Remove the locally saved temporary file once uploaded
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // If the upload operation fails, remove the local temporary file to avoid server clutter
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };