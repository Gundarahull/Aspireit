const cloudinary = require("cloudinary").v2;

const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  console.log("localfilepayth", localFilePath);
  try {
    if (!localFilePath) return null;
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath); //aftrer uploading also deleting from the local
    console.log("File uploaded successfully", uploadResponse);
    return uploadResponse;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Error uploading file to Cloudinary:", error);
    throw error; // Re-throw the error to indicate failure
  }
};

module.exports=uploadToCloudinary;
