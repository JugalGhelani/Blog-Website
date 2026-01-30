import fs from "fs";
import imagekit from "../utils/imageKit.js";
import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";
import main from "../utils/gemini.js";


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


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.json({success: true, blogs})
    } catch (error) {
        res.json({success: false, message: error.message})        
    }
}

export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        // console.log("req.params ==", req.params);
        // console.log("req.body ==", req.body);
        
        const blog = await Blog.findById(blogId)

        if (!blog) {
            res.json({success: false, message: "Blog not found"})
        }

        res.json({success: true, blog})

    } catch (error) {
        res.json({success: false, message: error.message})  
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);

        // Delete all comments associated with the blog
        await Comment.deleteMany({blog: id});

        res.json({success: true, message: "Blog deleted successfully"})

    } catch (error) {
        res.json({success: false, message: error.message})  
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        
        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.json({success: true, message: "Blog updated successfully"})

    } catch (error) {
        res.json({success: false, message: error.message})  
    }
}

export const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content})
        res.json({success: true, message: "Comment added for review"}) 

    } catch (error) {
        res.json({success: false, message: error.message})   
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments}) 

    } catch (error) {
        res.json({success: false, message: error.message}) 
    }
}

export const generateContent = async (req, res) => {
  try {
    const {prompt} = req.body;
    const content = await main(prompt + ' Generate a blog content for this topic in simple text format')
    res.json({success: true, content})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}