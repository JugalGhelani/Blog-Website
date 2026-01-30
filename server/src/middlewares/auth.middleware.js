import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.json({ success: false, message: "invalid token" });
  }
};

export default auth;
