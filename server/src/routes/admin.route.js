import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllComment, getDashboard } from "../controllers/admin.controler.js";
import auth from "../middlewares/auth.middleware.js";
import { getAllBlogs } from "../controllers/blog.controller.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComment);
adminRouter.get("/blogs", auth, getAllBlogs);
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;
