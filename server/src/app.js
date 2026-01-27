import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.route.js";
import blogRouter from "./routes/blog.route.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Welcome to QuickBlog API"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

export { app };
