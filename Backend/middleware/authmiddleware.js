const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found. Invalid token." });
    }

    req.user = user; 
    console.log("User authenticated:", req.user);
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = { authMiddleware };
