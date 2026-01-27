import fs from "fs";
import imagekit from "../utils/imageKit.js";
import { Blog } from "../models/blog.model.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subtitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // check if all fields are present
    if (!title || !imageFile || !description || !category) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // console.log("REQ.FILE:", req.file);
    // console.log("ORIGINAL NAME:", req.file?.originalname);

    // Upload Image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // console.log('*****',response?.url);

    if (!response?.url) {
      return res.json({
        success: false,
        message: "Image upload failed",
      });
    }

    // Delete temp file (IMPORTANT)
    try {
      fs.unlinkSync(imageFile.path);
    } catch (err) {
      console.log("Temp file delete failed:", err.message);
    }

    // Optimization through imagekit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Convert to modern format
        { width: "1280" }, // Width resizing
      ],
    });
    // console.log('response.filePath======', response.filePath);

    // console.log("FILE:", req.file);
    // console.log("BODY:", req.body);

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image,
      isPublished,
    });

    return res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
